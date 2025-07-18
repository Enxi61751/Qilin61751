import React, { useEffect, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import ActivityContext from '@/context/ActivityContext';
import ActivityList from '@/components/Activity/ActivityList';
import ActivitySearch from '@/components/Activity/ActivitySearch';
import CategoryFilter from '@/pages/CategoryFilter';
import "@style"; // 添加在顶部
const ActivitiesPage = () => {
  const { currentUser } = useAuth();
  
  // 安全访问 Context
  const context = useContext(ActivityContext);
  
  // 检查 Context 是否可用
  if (!context) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-red-500">
            活动数据加载失败，请稍后再试
          </h2>
          <p className="mt-2 text-gray-600">
            未能获取活动上下文，请检查网络连接或刷新页面
          </p>
        </div>
      </div>
    );
  }
  
  // 安全解构
  const { activities = [], setActivities, filters = {}, setFilters } = context;

  // 模拟从API获取活动数据
  useEffect(() => {
    // 实际项目中应从API获取
    const mockActivities = [
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
    
    setActivities(mockActivities);
  }, [setActivities]);

  // 处理分类过滤
  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  return (
    <div className="activities-page container">
    <div className="page-header">
      <h1>所有活动</h1>
      <p>发现适合您的体育活动，加入我们的社区</p>
    </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧筛选区 */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">筛选条件</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">活动类型</h3>
              <CategoryFilter 
                currentCategory={filters.category}
                onChange={handleCategoryChange}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">价格范围</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="price-all" 
                    name="price" 
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="price-all">全部</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="price-free" 
                    name="price" 
                    className="mr-2"
                  />
                  <label htmlFor="price-free">免费</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="price-paid" 
                    name="price" 
                    className="mr-2"
                  />
                  <label htmlFor="price-paid">付费</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">日期范围</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="date-all" 
                    name="date" 
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="date-all">全部日期</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="date-week" 
                    name="date" 
                    className="mr-2"
                  />
                  <label htmlFor="date-week">本周</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="date-weekend" 
                    name="date" 
                    className="mr-2"
                  />
                  <label htmlFor="date-weekend">周末</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧活动列表 */}
        <div className="md:w-3/4">
          <ActivitySearch />
          <ActivityList />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;