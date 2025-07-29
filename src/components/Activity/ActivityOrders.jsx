// ActivityOrders.jsx
import React, { useState } from 'react';
import { useOrder } from '@/context/OrderContext';

const ActivityOrders = ({ orders }) => {
  const { cancelOrder } = useOrder();
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
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('支付成功:', orderId);
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

  const getStatusConfig = (status) => {
    switch (status) {
      case '待支付':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: (
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          )
        };
      case '已支付':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case '已完成':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case '已取消':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: (
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null
        };
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
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无订单</h3>
        <p className="text-gray-500">您还没有任何活动订单</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {orders.map((order) => {
        const statusConfig = getStatusConfig(order.status);
        
        return (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {order.activity.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(order.activity.date)}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center space-x-1.5 ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span>{order.status}</span>
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {order.amount > 0 ? `¥${order.amount}` : '免费'}
                    </div>
                    {order.autoUpdated && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 inline-block">
                        自动更新
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Activity Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{order.participants}人参与</span>
                </div>
                {order.activity.time && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{order.activity.time}</span>
                  </div>
                )}
                {order.activity.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{order.activity.location}</span>
                  </div>
                )}
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">订单编号</span>
                    <span className="font-mono text-gray-800 font-medium">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">下单时间</span>
                    <span className="text-gray-800 font-medium">{formatDate(order.createdAt || order.orderDate)}</span>
                  </div>
                  {order.participant && (
                    <>
                      <div>
                        <span className="text-gray-500 block">报名者</span>
                        <span className="text-gray-800 font-medium">{order.participant.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">联系方式</span>
                        <span className="text-gray-800 font-medium">{order.participant.phone}</span>
                      </div>
                    </>
                  )}
                  {order.paidAt && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">支付时间</span>
                      <span className="text-gray-800 font-medium">{formatDate(order.paidAt)}</span>
                    </div>
                  )}
                  {order.completedAt && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">完成时间</span>
                      <span className="text-gray-800 font-medium">{formatDate(order.completedAt)}</span>
                    </div>
                  )}
                  {order.cancelledAt && (
                    <div className="col-span-2">
                      <span className="text-gray-500 block">取消时间</span>
                      <span className="text-gray-800 font-medium">{formatDate(order.cancelledAt)}</span>
                      {order.cancelReason && (
                        <span className="text-red-600 text-xs block mt-1">({order.cancelReason})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  查看详情
                </button>
                
                {/* Payment and Cancel Buttons for Pending Orders */}
                {order.status === '待支付' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handlePay(order.id)}
                      disabled={processingOrders[order.id] === 'paying'}
                      className="px-4 py-2.5 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {processingOrders[order.id] === 'paying' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>支付中</span>
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
                      className="px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {processingOrders[order.id] === 'cancelling' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>取消中</span>
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
                  </div>
                )}

                {/* Cancel Button for Paid Orders */}
                {order.status === '已支付' && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    disabled={processingOrders[order.id] === 'cancelling'}
                    className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {processingOrders[order.id] === 'cancelling' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>取消中</span>
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

                {/* Review Button for Completed Orders */}
                {order.status === '已完成' && (
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>评价活动</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityOrders;