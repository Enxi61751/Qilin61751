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

  // 初始化模拟数据
  React.useEffect(() => {
    const mockActivities = [
      {
        id: '1',
        title: '周末篮球友谊赛',
        description: '欢迎所有篮球爱好者参加，无论水平高低，重在参与和锻炼身体。',
        date: '2024-01-15',
        time: '14:00 - 16:00',
        location: '城市体育馆篮球场',
        category: '篮球',
        capacity: 20,
        registered: 15,
        price: 30,
        image: 'basketball',
      },
      {
        id: '2',
        title: '瑜伽入门体验课',
        description: '适合初学者的瑜伽课程，专业教练指导，放松身心，改善体态。',
        date: '2024-01-16',
        time: '18:30 - 20:00',
        location: '静心瑜伽工作室',
        category: '瑜伽',
        capacity: 15,
        registered: 10,
        price: 50,
        image: 'yoga',
      },
      {
        id: '3',
        title: '足球训练营',
        description: '专业足球教练指导，提升个人技术和团队配合能力。',
        date: '2024-01-17',
        time: '09:00 - 11:00',
        location: '绿茵足球场',
        category: '足球',
        capacity: 30,
        registered: 22,
        price: 40,
        image: 'football',
      },
      {
        id: '4',
        title: '羽毛球双打比赛',
        description: '双打比赛，自由组队或现场配对，奖品丰厚！',
        date: '2024-01-18',
        time: '19:00 - 21:00',
        location: '飞翔羽毛球馆',
        category: '羽毛球',
        capacity: 16,
        registered: 12,
        price: 60,
        image: 'badminton',
      },
      {
        id: '5',
        title: '晨跑俱乐部',
        description: '每周日早晨的跑步活动，不同路线，不同风景。',
        date: '2024-01-19',
        time: '06:00 - 08:00',
        location: '中央公园东门',
        category: '跑步',
        capacity: 50,
        registered: 35,
        price: 0,
        image: 'running',
      },
      {
        id: '6',
        title: '游泳进阶训练',
        description: '提高游泳技巧和耐力，适合有一定游泳基础的人士。',
        date: '2024-01-20',
        time: '17:00 - 19:00',
        location: '水上运动中心',
        category: '游泳',
        capacity: 20,
        registered: 18,
        price: 70,
        image: 'swimming',
      },
    ];
    setActivities(mockActivities);
  }, []);

  // 传递给子组件的值
  const value = {
    activities,
    setActivities,
    filters,
    setFilters
  };
  {/*const mockActivities = [
    // ...保持原有的mock数据不变
    {
      id: '1',
      title: '周末篮球友谊赛',
      description: '欢迎所有篮球爱好者参加，无论水平高低，重在参与和锻炼身体。',
      date: '2023-06-15',
      time: '14:00 - 16:00',
      location: '城市体育馆篮球场',
      category: '篮球',
      capacity: 20,
      registered: 15,
      price: 30,
      image: 'basketball',
    },
    {
      id: '2',
      title: '瑜伽入门体验课',
      description: '适合初学者的瑜伽课程，专业教练指导，放松身心，改善体态。',
      date: '2023-06-16',
      time: '18:30 - 20:00',
      location: '静心瑜伽工作室',
      category: '瑜伽',
      capacity: 15,
      registered: 10,
      price: 50,
      image: 'yoga',
    },
    {
      id: '3',
      title: '足球训练营',
      description: '专业足球教练指导，提升个人技术和团队配合能力。',
      date: '2023-06-17',
      time: '09:00 - 11:00',
      location: '绿茵足球场',
      category: '足球',
      capacity: 30,
      registered: 22,
      price: 40,
      image: 'football',
    },
    {
      id: '4',
      title: '羽毛球双打比赛',
      description: '双打比赛，自由组队或现场配对，奖品丰厚！',
      date: '2023-06-18',
      time: '19:00 - 21:00',
      location: '飞翔羽毛球馆',
      category: '羽毛球',
      capacity: 16,
      registered: 12,
      price: 60,
      image: 'badminton',
    },
    {
      id: '5',
      title: '晨跑俱乐部',
      description: '每周日早晨的跑步活动，不同路线，不同风景。',
      date: '2023-06-19',
      time: '06:00 - 08:00',
      location: '中央公园东门',
      category: '跑步',
      capacity: 50,
      registered: 35,
      price: 0,
      image: 'running',
    },
    {
      id: '6',
      title: '游泳进阶训练',
      description: '提高游泳技巧和耐力，适合有一定游泳基础的人士。',
      date: '2023-06-20',
      time: '17:00 - 19:00',
      location: '水上运动中心',
      category: '游泳',
      capacity: 20,
      registered: 18,
      price: 70,
      image: 'swimming',
    },
  ];
  setActivities(mockActivities);*/}

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