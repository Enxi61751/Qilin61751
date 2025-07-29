import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ActivityOrders from '@/components/Activity/ActivityOrders';
import RealTimeDemo from '@/components/UI/RealTimeDemo';
import { useOrder } from '@/context/OrderContext';

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const { orders, loading, fetchOrders } = useOrder();
  const [filter, setFilter] = useState('all');

  // Calculate order statistics
  const orderStats = {
    total: orders.length,
    pending: orders.filter(order => order.status === '待支付').length,
    paid: orders.filter(order => order.status === '已支付').length,
    completed: orders.filter(order => order.status === '已完成').length,
    cancelled: orders.filter(order => order.status === '已取消').length,
  };

  // Filter orders based on selected filter
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Fetch orders when component mounts or user changes
  useEffect(() => {
    if (currentUser) {
      fetchOrders(currentUser.id);
    }
  }, [currentUser, fetchOrders]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">需要登录</h2>
            <p className="text-gray-600 mb-8">请登录账号以查看您的活动订单</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="/login" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                登录账号
              </a>
              <a 
                href="/register" 
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                注册新账号
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">加载订单中</h2>
          <p className="text-gray-600">正在为您获取最新的订单信息...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">我的订单</h1>
              <p className="text-gray-600">
                管理您的活动订单，追踪报名状态
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{orderStats.total}</div>
                <div className="text-sm text-blue-700">总订单</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{orderStats.pending}</div>
                <div className="text-sm text-orange-700">待支付</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{orderStats.paid}</div>
                <div className="text-sm text-yellow-700">已支付</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
                <div className="text-sm text-green-700">已完成</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{orderStats.cancelled}</div>
                <div className="text-sm text-red-700">已取消</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
       {/* 主要内容区域 */}
       <div className="container mx-auto px-4 py-8">
        {/* 实时演示组件 */}
        <RealTimeDemo />
        
        {/* 过滤器 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">订单筛选</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: '全部订单', count: orderStats.total },
              { key: '待支付', label: '待支付', count: orderStats.pending },
              { key: '已支付', label: '已支付', count: orderStats.paid },
              { key: '已完成', label: '已完成', count: orderStats.completed },
              { key: '已取消', label: '已取消', count: orderStats.cancelled },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filter === item.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </div>

        {/* 订单列表 */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {filter === 'all' ? '暂无订单' : `暂无${filter}订单`}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? '您还没有任何活动订单，快去参加活动吧！' 
                : `当前没有状态为"${filter}"的订单`
              }
            </p>
            {filter === 'all' && (
              <a 
                href="/activities" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                浏览活动
              </a>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {filter === 'all' ? '全部订单' : filter} 
                <span className="text-gray-500 font-normal ml-2">({filteredOrders.length})</span>
              </h2>
              <div className="text-sm text-gray-500">
                共 {filteredOrders.length} 个订单
              </div>
            </div>
            <ActivityOrders orders={filteredOrders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;