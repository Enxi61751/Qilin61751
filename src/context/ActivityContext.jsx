import React, { createContext, useState, useContext } from 'react';

// 创建 Context
const ActivityContext = createContext();

// 创建 Provider 组件
export const ActivityProvider = ({ children }) => {
  // 活动数据状态
  const [activities, setActivities] = useState([]);
  
  // 过滤条件状态
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    date: 'all'
  });

  // 传递给子组件的值
  const value = {
    activities,
    setActivities,
    filters,
    setFilters
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

// 自定义 hook 方便使用
export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};

// 导出 Context 对象
export default ActivityContext;