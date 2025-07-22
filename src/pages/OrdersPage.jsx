import React, { useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import ActivityOrders from '@/components/Activity/ActivityOrders';

const OrdersPage = () => {
  const { currentUser } = AuthContext;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟获取用户订单
  useEffect(() => {
    if (!currentUser) return;
    
    // 模拟API调用
    const timer = setTimeout(() => {
      const mockOrders = [
        {
          id: 'order-1',
          activity: {
            id: '1',
            title: '周末篮球友谊赛',
            date: '2023-06-15',
          },
          status: '已支付',
          amount: 30,
          orderDate: '2023-06-10',
          participants: 1,
        },
        {
          id: 'order-2',
          activity: {
            id: '2',
            title: '瑜伽入门体验课',
            date: '2023-06-16',
          },
          status: '已取消',
          amount: 50,
          orderDate: '2023-06-08',
          participants: 1,
        },
        {
          id: 'order-3',
          activity: {
            id: '3',
            title: '足球训练营',
            date: '2023-06-17',
          },
          status: '已完成',
          amount: 40,
          orderDate: '2023-06-05',
          participants: 2,
        },
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">需要登录</h2>
          <p className="mb-6">请登录账号以查看您的订单</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              登录
            </a>
            <a 
              href="/register" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              注册
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">加载订单中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">我的订单</h1>
        <p className="text-gray-600 mt-2">
          查看和管理您的活动订单
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-6"></div>
            <h3 className="text-xl font-medium mb-2">暂无订单</h3>
            <p className="text-gray-600 mb-6">您还没有报名参加任何活动</p>
            <a 
              href="/activities" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              浏览活动
            </a>
          </div>
        ) : (
          <ActivityOrders orders={orders} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;