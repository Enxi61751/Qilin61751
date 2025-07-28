// ActivityOrders.jsx
import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';

const ActivityOrders = ({ orders }) => {
  const { cancelOrder, payOrder, updateOrderStatus } = useOrders();
  const [processingOrders, setProcessingOrders] = useState({});

  const handleCancel = async (orderId) => {
    setProcessingOrders(prev => ({ ...prev, [orderId]: 'cancelling' }));
    try {
      await cancelOrder(orderId);
    } catch (error) {
      console.error('取消订单失败:', error);
    } finally {
      setProcessingOrders(prev => {
        const newState = { ...prev };
        delete newState[orderId];
        return newState;
      });
    }
  };

  const handlePay = async (orderId) => {
    setProcessingOrders(prev => ({ ...prev, [orderId]: 'paying' }));
    try {
      await payOrder(orderId);
    } catch (error) {
      console.error('支付失败:', error);
    } finally {
      setProcessingOrders(prev => {
        const newState = { ...prev };
        delete newState[orderId];
        return newState;
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '待支付':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case '已支付':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '已取消':
        return 'bg-red-100 text-red-800 border-red-200';
      case '已完成':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case '待支付':
        return (
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case '已支付':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '已完成':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case '已取消':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无订单</h3>
        <p className="text-gray-500">您还没有任何活动订单</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-6">
            {/* 订单头部信息 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {order.activity.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    活动日期：{formatDate(order.activity.date)}
                  </div>
                  {order.activity.time && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      活动时间：{order.activity.time}
                    </div>
                  )}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    参与人数：{order.participants}人
                  </div>
                  {order.activity.location && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      活动地点：{order.activity.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {order.amount > 0 ? `¥${order.amount}` : '免费'}
                </span>
                {/* 实时状态指示器 */}
                {order.autoUpdated && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    自动更新
                  </span>
                )}
              </div>
            </div>

            {/* 订单详情 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">订单编号：</span>
                  <span className="font-medium text-gray-900">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">下单时间：</span>
                  <span className="font-medium text-gray-900">{formatDate(order.createdAt || order.orderDate)}</span>
                </div>
                {order.participant && (
                  <>
                    <div>
                      <span className="text-gray-600">报名者：</span>
                      <span className="font-medium text-gray-900">{order.participant.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">联系方式：</span>
                      <span className="font-medium text-gray-900">{order.participant.phone}</span>
                    </div>
                  </>
                )}
                {order.paidAt && (
                  <div>
                    <span className="text-gray-600">支付时间：</span>
                    <span className="font-medium text-gray-900">{formatDate(order.paidAt)}</span>
                  </div>
                )}
                {order.completedAt && (
                  <div>
                    <span className="text-gray-600">完成时间：</span>
                    <span className="font-medium text-gray-900">{formatDate(order.completedAt)}</span>
                  </div>
                )}
                {order.cancelledAt && (
                  <div className="md:col-span-2">
                    <span className="text-gray-600">取消时间：</span>
                    <span className="font-medium text-gray-900">{formatDate(order.cancelledAt)}</span>
                    {order.cancelReason && (
                      <span className="text-red-600 ml-2">({order.cancelReason})</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap justify-end gap-3">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                查看详情
              </button>
              
              {/* 待支付状态的按钮 */}
              {order.status === '待支付' && (
                <>
                  <button
                    onClick={() => handlePay(order.id)}
                    disabled={processingOrders[order.id] === 'paying'}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    {processingOrders[order.id] === 'paying' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>支付中...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>立即支付</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleCancel(order.id)}
                    disabled={processingOrders[order.id] === 'cancelling'}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    {processingOrders[order.id] === 'cancelling' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>取消中...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>取消订单</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* 已支付状态的按钮 */}
              {order.status === '已支付' && (
                <button
                  onClick={() => handleCancel(order.id)}
                  disabled={processingOrders[order.id] === 'cancelling'}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  {processingOrders[order.id] === 'cancelling' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>取消中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>取消订单</span>
                    </>
                  )}
                </button>
              )}

              {/* 已完成状态的按钮 */}
              {order.status === '已完成' && (
                <button 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>评价活动</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>


  );
};
export default ActivityOrders;