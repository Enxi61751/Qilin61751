import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';


const OrderContext = createContext();

// Custom hook to use OrderContext
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// 添加useOrders hook作为useOrder的别名
export const useOrders = () => {
  return useOrder();
};

export const OrderProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // 添加通知功能
  const addNotification = useCallback((title, message, type = 'info') => {
    const notification = {
      id: `notification-${Date.now()}`,
      title,
      message,
      type,
      timestamp: Date.now()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // 最多保留10条通知
  }, []);

  const clearNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // 添加useEffect来在用户登录时自动获取订单
  useEffect(() => {
    if (currentUser) {
      fetchOrders(currentUser.id);
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [currentUser]);

  // 获取订单统计
  const getOrderStats = useCallback(() => {
    const stats = {
      total: orders.length,
      pending: orders.filter(order => order.status === '待支付').length,
      paid: orders.filter(order => order.status === '已支付').length,
      completed: orders.filter(order => order.status === '已完成').length,
      cancelled: orders.filter(order => order.status === '已取消').length,
    };
    return stats;
  }, [orders]);

  // 根据状态筛选订单
  const getUserOrders = useCallback((filter = 'all') => {
    if (filter === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === filter);
  }, [orders]);

  const updateOrderStatuses = useCallback(async (orderIds, newStatus) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          orderIds.includes(order.id) 
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (err) {
      setError(err.message || '更新订单状态失败');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // 模拟WebSocket连接，实时更新订单状态
  
  const fetchOrders = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockOrders = [
        {
          id: 'order-1',
          activity: {
            id: '1',
            title: '周末篮球友谊赛',
            date: '2023-06-15',
            time: '14:00-16:00',
            location: '体育中心篮球场'
          },
          status: '已支付',
          amount: 30,
          orderDate: '2023-06-10',
          createdAt: '2023-06-10',
          participants: 1,
          participant: {
            name: '张三',
            phone: '13800138000'
          }
        },
        {
          id: 'order-2',
          activity: {
            id: '2',
            title: '瑜伽入门体验课',
            date: '2023-06-16',
            time: '10:00-11:30',
            location: '健身房瑜伽室'
          },
          status: '已取消',
          amount: 50,
          orderDate: '2023-06-08',
          createdAt: '2023-06-08',
          participants: 1,
          participant: {
            name: '李四',
            phone: '13900139000'
          },
          cancelledAt: '2023-06-09',
          cancelReason: '时间冲突'
        },
        {
          id: 'order-3',
          activity: {
            id: '3',
            title: '足球训练营',
            date: '2023-06-17',
            time: '09:00-11:00',
            location: '足球场'
          },
          status: '已完成',
          amount: 40,
          orderDate: '2023-06-05',
          createdAt: '2023-06-05',
          participants: 2,
          participant: {
            name: '王五',
            phone: '13700137000'
          },
          paidAt: '2023-06-05',
          completedAt: '2023-06-17'
        },
        {
          id: 'order-4',
          activity: {
            id: '4',
            title: '游泳入门课程',
            date: '2023-06-20',
            time: '15:00-16:00',
            location: '游泳馆'
          },
          status: '待支付',
          amount: 60,
          orderDate: '2023-06-12',
          createdAt: '2023-06-12',
          participants: 1,
          participant: {
            name: '赵六',
            phone: '13600136000'
          }
        },
      ];
      
      setOrders(mockOrders);
    } catch (err) {
      setError(err.message || '获取订单列表失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 创建新订单
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder = {
        id: `order-${Date.now()}`,
        ...orderData,
        orderDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        status: '已支付'
      };
      setOrders(prevOrders => [...prevOrders, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err.message || '创建订单失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 支付订单
  const payOrder = useCallback(async (orderId, paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: '已支付',
                paidAt: new Date().toISOString().split('T')[0],
                paymentMethod: paymentData?.paymentMethod
              }
            : order
        )
      );
    } catch (err) {
      setError(err.message || '支付失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 取消订单
  const cancelOrder = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: '已取消',
                cancelledAt: new Date().toISOString().split('T')[0],
                cancelReason: '用户取消'
              }
            : order
        )
      );
    } catch (err) {
      setError(err.message || '取消订单失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 更新订单状态
  const updateOrderStatus = useCallback(async (orderId, newStatus, extraData = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: newStatus,
                ...extraData,
                [`${newStatus === '已完成' ? 'completed' : newStatus === '已取消' ? 'cancelled' : 'updated'}At`]: new Date().toISOString().split('T')[0]
              }
            : order
        )
      );
    } catch (err) {
      setError(err.message || '更新订单状态失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Context 值
  const contextValue = {
    orders,
    loading,
    error,
    updateOrderStatuses,
    fetchOrders,
    createOrder,
    cancelOrder,
    payOrder,
    updateOrderStatus,
    getOrderStats,
    getUserOrders,
    setError,
    notifications,
    addNotification,
    clearNotification,
    clearAllNotifications
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};


export default OrderContext;