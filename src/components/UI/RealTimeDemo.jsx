import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useActivityContext } from '../../context/ActivityContext';

const RealTimeDemo = () => {
  const { createOrder, orders, getOrderStats } = useOrders();
  const { activities } = useActivityContext();
  const [isCreating, setIsCreating] = useState(false);

  const createDemoOrder = async () => {
    if (activities.length === 0) return;
    
    setIsCreating(true);
    
    // 随机选择一个活动
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    // 创建模拟报名数据
    const demoFormData = {
      name: `测试用户${Math.floor(Math.random() * 1000)}`,
      phone: '138' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
      email: 'demo@example.com',
      notes: '这是一个演示订单'
    };
    
    // 创建订单
    createOrder(randomActivity, demoFormData, 'alipay');
    
    setTimeout(() => {
      setIsCreating(false);
    }, 1000);
  };

  const stats = getOrderStats();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        实时订单系统演示
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-blue-700">总订单</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-xs text-orange-700">待支付</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-green-600">{stats.paid}</div>
          <div className="text-xs text-green-700">已支付</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-red-600">{stats.cancelled}</div>
          <div className="text-xs text-red-700">已取消</div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={createDemoOrder}
          disabled={isCreating || activities.length === 0}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isCreating ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>创建中...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>创建演示订单</span>
            </>
          )}
        </button>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">实时更新功能说明：</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 订单状态会自动更新（每10秒检查一次）</li>
            <li>• 支付超时订单自动取消</li>
            <li>• 活动结束后订单自动标记为已完成</li>
            <li>• 模拟随机状态变化（每30秒）</li>
            <li>• 实时通知提醒订单状态变化</li>
            <li>• 页面数据实时同步更新</li>
          </ul>
        </div>

        {orders.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">最新订单：</h4>
            <div className="text-sm text-yellow-700">
              {orders[0].activity.title} - {orders[0].status}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeDemo;