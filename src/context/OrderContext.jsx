import React, { createContext, useContext, useState, useCallback } from 'react';

// 创建 OrderContext
const OrderContext = createContext();

// Custom hook to use OrderContext
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// OrderProvider 组件
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 更新订单状态 - 使用 useCallback 来确保函数在组件顶层被定义
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

  // 获取订单列表
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
            ? { ...order, status: '已取消' }
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

  // Context 值
  const contextValue = {
    orders,
    loading,
    error,
    updateOrderStatuses,
    fetchOrders,
    createOrder,
    cancelOrder,
    setError
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;