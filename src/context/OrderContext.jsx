import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // 模拟WebSocket连接，实时更新订单状态
  useEffect(() => {
    if (!currentUser) return;

    // 初始化加载订单
    loadOrders();

    // 模拟实时更新 - 每10秒检查一次订单状态变化
    const interval = setInterval(() => {
      updateOrderStatuses();
    }, 10000);

    // 模拟随机订单状态变化 - 每30秒可能发生变化
    const statusUpdateInterval = setInterval(() => {
      simulateOrderStatusChange();
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(statusUpdateInterval);
    };
  }, [currentUser, updateOrderStatuses, simulateOrderStatusChange]);

  // 加载用户订单
  const loadOrders = useCallback(() => {
    if (!currentUser) return;

    const storedOrders = localStorage.getItem(`orders_${currentUser.id}`);
    if (storedOrders) {
      try {
        const orders = JSON.parse(storedOrders);
        setOrders(orders);
      } catch (error) {
        console.error('Failed to parse orders:', error);
        setOrders([]);
      }
    }
    setLoading(false);
  }, [currentUser]);

  // 保存订单到localStorage
  const saveOrders = useCallback((newOrders) => {
    if (!currentUser) return;
    localStorage.setItem(`orders_${currentUser.id}`, JSON.stringify(newOrders));
    setOrders(newOrders);
  }, [currentUser]);

  // 添加通知
  const addNotification = useCallback((notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // 保持最新10条通知
    
    // 3秒后自动移除info类型通知
    if (notification.type === 'info') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    }
  }, []);

  // 获取通知类型对应的样式类型
  const getNotificationType = (status) => {
    switch (status) {
      case '已支付':
        return 'success';
      case '已完成':
        return 'success';
      case '已取消':
        return 'error';
      default:
        return 'info';
    }
  };

  // 创建新订单
  const createOrder = useCallback((activity, formData, paymentMethod = 'alipay') => {
    if (!currentUser) return null;

    const newOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      activity: {
        id: activity.id,
        title: activity.title,
        date: activity.date,
        time: activity.time,
        location: activity.location,
        price: activity.price
      },
      participant: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes
      },
      status: '待支付',
      amount: activity.price || 0,
      paymentMethod,
      orderDate: new Date().toISOString(),
      participants: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // 添加预期状态变化时间（模拟真实场景）
      expectedStatusChanges: generateExpectedStatusChanges()
    };

    const currentOrders = orders.filter(order => order.userId === currentUser.id);
    const updatedOrders = [...currentOrders, newOrder];
    saveOrders(updatedOrders);

    // 添加通知
    addNotification({
      id: Date.now(),
      type: 'info',
      title: '订单创建成功',
      message: `活动"${activity.title}"的订单已创建，请及时完成支付。`,
      timestamp: new Date().toISOString()
    });

    return newOrder;
  }, [currentUser, orders, saveOrders, addNotification]);

  // 更新订单状态
  const updateOrderStatus = useCallback((orderId, newStatus, additionalData = {}) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...additionalData
        };

        // 根据状态变化添加特定字段
        if (newStatus === '已支付') {
          updatedOrder.paidAt = new Date().toISOString();
        } else if (newStatus === '已完成') {
          updatedOrder.completedAt = new Date().toISOString();
        } else if (newStatus === '已取消') {
          updatedOrder.cancelledAt = new Date().toISOString();
          updatedOrder.cancelReason = additionalData.cancelReason || '用户取消';
        }

        // 添加状态变化通知
        addNotification({
          id: Date.now(),
          type: getNotificationType(newStatus),
          title: '订单状态更新',
          message: `活动"${order.activity.title}"的订单状态已更新为：${newStatus}`,
          timestamp: new Date().toISOString(),
          orderId: orderId
        });

        return updatedOrder;
      }
      return order;
    });

    saveOrders(updatedOrders);
    return updatedOrders.find(order => order.id === orderId);
  }, [orders, saveOrders, addNotification]);

  // 生成预期状态变化时间
  const generateExpectedStatusChanges = () => {
    const now = new Date();
    return {
      paymentDeadline: new Date(now.getTime() + 30 * 60 * 1000).toISOString(), // 30分钟支付期限
      activityStart: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2天后活动开始
      expectedCompletion: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3天后预期完成
    };
  };

  // 模拟订单状态自动变化
  const simulateOrderStatusChange = useCallback(() => {
    const pendingOrders = orders.filter(order => 
      order.userId === currentUser?.id && 
      (order.status === '待支付' || order.status === '已支付')
    );

    if (pendingOrders.length === 0) return;

    // 随机选择一个订单进行状态更新
    const randomOrder = pendingOrders[Math.floor(Math.random() * pendingOrders.length)];
    const now = new Date();

    if (randomOrder.status === '待支付') {
      // 有30%的概率自动支付（模拟用户在其他设备上支付）
      if (Math.random() < 0.3) {
        updateOrderStatus(randomOrder.id, '已支付', {
          paidAt: now.toISOString(),
          autoUpdated: true
        });
      }
    } else if (randomOrder.status === '已支付') {
      // 检查是否到了活动时间，如果是则标记为已完成
      const activityDate = new Date(randomOrder.activity.date);
      if (now > activityDate && Math.random() < 0.5) {
        updateOrderStatus(randomOrder.id, '已完成', {
          completedAt: now.toISOString(),
          autoUpdated: true
        });
      }
    }
  }, [orders, currentUser, updateOrderStatus]);

  // 更新订单状态（定期检查）
  const updateOrderStatuses = useCallback(() => {
    if (!currentUser) return;

    const now = new Date();
    let hasUpdates = false;

    const updatedOrders = orders.map(order => {
      if (order.userId !== currentUser.id) return order;

      let newOrder = { ...order };

      // 检查支付超时
      if (order.status === '待支付' && order.expectedStatusChanges?.paymentDeadline) {
        const deadline = new Date(order.expectedStatusChanges.paymentDeadline);
        if (now > deadline) {
          newOrder.status = '已取消';
          newOrder.cancelReason = '支付超时';
          newOrder.cancelledAt = now.toISOString();
          newOrder.updatedAt = now.toISOString();
          hasUpdates = true;

          addNotification({
            id: Date.now() + Math.random(),
            type: 'warning',
            title: '订单已取消',
            message: `活动"${order.activity.title}"的订单因支付超时已自动取消。`,
            timestamp: now.toISOString(),
            orderId: order.id
          });
        }
      }

      // 检查活动完成
      if (order.status === '已支付') {
        const activityDate = new Date(order.activity.date);
        const activityEndTime = new Date(activityDate.getTime() + 2 * 60 * 60 * 1000); // 假设活动持续2小时
        
        if (now > activityEndTime) {
          newOrder.status = '已完成';
          newOrder.completedAt = now.toISOString();
          newOrder.updatedAt = now.toISOString();
          hasUpdates = true;

          addNotification({
            id: Date.now() + Math.random(),
            type: 'success',
            title: '活动已完成',
            message: `活动"${order.activity.title}"已结束，订单标记为已完成。`,
            timestamp: now.toISOString(),
            orderId: order.id
          });
        }
      }

      return newOrder;
    });

    if (hasUpdates) {
      saveOrders(updatedOrders);
    }
  }, [orders, currentUser, saveOrders, addNotification]);

  // 取消订单
  const cancelOrder = useCallback(async (orderId, reason = '用户取消') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedOrder = updateOrderStatus(orderId, '已取消', {
          cancelReason: reason,
          cancelledAt: new Date().toISOString()
        });
        resolve(updatedOrder);
      }, 1000);
    });
  }, [updateOrderStatus]);

  // 支付订单
  const payOrder = useCallback(async (orderId, paymentData = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedOrder = updateOrderStatus(orderId, '已支付', {
          paidAt: new Date().toISOString(),
          paymentData
        });
        resolve(updatedOrder);
      }, 2000);
    });
  }, [updateOrderStatus]);

  // 清除通知
  const clearNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  // 清除所有通知
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // 获取订单统计
  const getOrderStats = useCallback(() => {
    const userOrders = orders.filter(order => order.userId === currentUser?.id);
    return {
      total: userOrders.length,
      pending: userOrders.filter(o => o.status === '待支付').length,
      paid: userOrders.filter(o => o.status === '已支付').length,
      completed: userOrders.filter(o => o.status === '已完成').length,
      cancelled: userOrders.filter(o => o.status === '已取消').length,
      totalAmount: userOrders.reduce((sum, order) => sum + (order.amount || 0), 0),
      paidAmount: userOrders
        .filter(o => o.status === '已支付' || o.status === '已完成')
        .reduce((sum, order) => sum + (order.amount || 0), 0)
    };
  }, [orders, currentUser]);

  // 获取用户订单
  const getUserOrders = useCallback((filter = 'all') => {
    let userOrders = orders.filter(order => order.userId === currentUser?.id);
    
    if (filter !== 'all') {
      userOrders = userOrders.filter(order => order.status === filter);
    }
    
    // 按创建时间降序排序
    return userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, currentUser]);

  const value = {
    orders: getUserOrders(),
    loading,
    notifications,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    payOrder,
    getUserOrders,
    getOrderStats,
    addNotification,
    clearNotification,
    clearAllNotifications,
    loadOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;