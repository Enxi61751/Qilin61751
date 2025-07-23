import React, { useEffect, useContext, useState } from 'react';
import { useAuth } from '@/context/AuthContext';    
import ActivityContext from '@/context/ActivityContext';
import ActivityList from '@/components/Activity/ActivityList';
import ActivitySearch from '@/components/Activity/ActivitySearch';
import ActivitySlider from '@/components/Activity/ActivitySlider';
import ActivityCardSlider from '@/components/Activity/ActivityCardSlider';
import CategoryFilter from '@/pages/CategoryFilter';
import "@styles"; // 添加在顶部
const ActivitiesPage = () => {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [stats, setStats] = useState({
    totalActivities: 0,
    totalParticipants: 0,
    popularCategories: []
  });
  
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
    // 扩展的mock数据
    const mockActivities = [
      {
        id: '1',
        title: '周末篮球友谊赛',
        description: '欢迎所有篮球爱好者参加，无论水平高低，重在参与和锻炼身体。比赛采用5v5形式，将根据水平分组进行。',
        date: '2023-06-15',
        time: '14:00 - 16:00',
        location: '城市体育馆篮球场',
        category: '篮球',
        capacity: 20,
        registered: 15,
        price: 30,
        image: 'basketball',
        featured: true,
        difficulty: '初级',
        organizer: '城市篮球俱乐部'
      },
      {
        id: '2',
        title: '瑜伽入门体验课',
        description: '适合初学者的瑜伽课程，专业教练指导，放松身心，改善体态。包含基础体式练习和冥想环节。',
        date: '2023-06-16',
        time: '18:30 - 20:00',
        location: '静心瑜伽工作室',
        category: '瑜伽',
        capacity: 15,
        registered: 10,
        price: 50,
        image: 'yoga',
        featured: true,
        difficulty: '初级',
        organizer: '静心瑜伽中心'
      },
      {
        id: '3',
        title: '足球训练营',
        description: '专业足球教练指导，提升个人技术和团队配合能力。包含技术训练、战术演练和友谊赛。',
        date: '2023-06-17',
        time: '09:00 - 11:00',
        location: '绿茵足球场',
        category: '足球',
        capacity: 30,
        registered: 22,
        price: 40,
        image: 'football',
        featured: false,
        difficulty: '中级',
        organizer: '职业足球学院'
      },
      {
        id: '4',
        title: '羽毛球双打比赛',
        description: '双打比赛，自由组队或现场配对，奖品丰厚！采用淘汰赛制，设有多个奖项。',
        date: '2023-06-18',
        time: '19:00 - 21:00',
        location: '飞翔羽毛球馆',
        category: '羽毛球',
        capacity: 16,
        registered: 12,
        price: 60,
        image: 'badminton',
        featured: true,
        difficulty: '中级',
        organizer: '羽毛球协会'
      },
      {
        id: '5',
        title: '晨跑俱乐部',
        description: '每周日早晨的跑步活动，不同路线，不同风景。有专业跑步指导和营养师建议。',
        date: '2023-06-19',
        time: '06:00 - 08:00',
        location: '中央公园东门',
        category: '跑步',
        capacity: 50,
        registered: 35,
        price: 0,
        image: 'running',
        featured: false,
        difficulty: '初级',
        organizer: '城市跑步联盟'
      },
      {
        id: '6',
        title: '游泳进阶训练',
        description: '提高游泳技巧和耐力，适合有一定游泳基础的人士。包含四种泳姿技术指导。',
        date: '2023-06-20',
        time: '17:00 - 19:00',
        location: '水上运动中心',
        category: '游泳',
        capacity: 20,
        registered: 18,
        price: 70,
        image: 'swimming',
        featured: false,
        difficulty: '高级',
        organizer: '专业游泳俱乐部'
      },
      {
        id: '7',
        title: '户外徒步探险',
        description: '探索城市周边美丽的山林小径，呼吸新鲜空气，欣赏自然风光。',
        date: '2023-06-21',
        time: '08:00 - 16:00',
        location: '青山国家森林公园',
        category: '户外',
        capacity: 25,
        registered: 20,
        price: 80,
        image: 'hiking',
        featured: true,
        difficulty: '中级',
        organizer: '户外探险俱乐部'
      },
      {
        id: '8',
        title: '太极晨练班',
        description: '传统太极拳教学，适合所有年龄段参与，强身健体，修身养性。',
        date: '2023-06-22',
        time: '06:30 - 08:00',
        location: '湖心公园广场',
        category: '太极',
        capacity: 40,
        registered: 28,
        price: 0,
        image: 'taichi',
        featured: false,
        difficulty: '初级',
        organizer: '太极文化协会'
      }
    ];
    
    setActivities(mockActivities);
    
    // 计算统计数据
    const totalParticipants = mockActivities.reduce((sum, activity) => sum + activity.registered, 0);
    const categoryCount = {};
    mockActivities.forEach(activity => {
      categoryCount[activity.category] = (categoryCount[activity.category] || 0) + 1;
    });
    const popularCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, count]) => ({ category, count }));
    
    setStats({
      totalActivities: mockActivities.length,
      totalParticipants,
      popularCategories
    });
  }, [setActivities]);

  // 处理分类过滤
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilters({ ...filters, category });
  };

  // 获取精选活动
  const featuredActivities = activities.filter(activity => activity.featured);
  
  // 获取最新活动
  const latestActivities = activities.slice(0, 6);
  
  // 获取免费活动
  const freeActivities = activities.filter(activity => activity.price === 0);

  return (
    <div className="activities-page">
      {/* 页面头部 */}
      <div className="page-header bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">发现精彩活动</h1>
            <p className="text-xl opacity-90 mb-8">加入我们的体育社区，享受运动的乐趣</p>
            
            {/* 统计信息 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{stats.totalActivities}</div>
                <div className="text-sm opacity-80">活动总数</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{stats.totalParticipants}</div>
                <div className="text-sm opacity-80">参与人数</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{stats.popularCategories.length}</div>
                <div className="text-sm opacity-80">活动类别</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 精选活动轮播 */}
      {featuredActivities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">精选活动</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                为您精心挑选的热门活动，不容错过的精彩体验
              </p>
            </div>
            <ActivitySlider 
              activities={featuredActivities} 
              autoPlay={true} 
              className="mb-8"
            />
          </div>
        </section>
      )}

      {/* 活动分类展示 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">热门分类</h2>
            <p className="text-gray-600">探索不同类型的体育活动</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {['全部', '篮球', '足球', '羽毛球', '游泳', '跑步', '瑜伽', '户外'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-4 rounded-lg text-center transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
                }`}
              >
                <div className="font-medium">{category}</div>
                <div className="text-sm opacity-75">
                  {category === '全部' 
                    ? `${activities.length}个活动` 
                    : `${activities.filter(a => a.category === category).length}个活动`
                  }
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 最新活动卡片轮播 */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">最新活动</h2>
            <p className="text-gray-600">最近发布的活动，抢先报名</p>
          </div>
          <ActivityCardSlider 
            activities={latestActivities} 
            slidesToShow={3}
            className="mb-8"
          />
        </div>
      </section>

      {/* 免费活动专区 */}
      {freeActivities.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">免费活动</h2>
              <p className="text-gray-600">零成本参与，收获满满乐趣</p>
            </div>
            <ActivityCardSlider 
              activities={freeActivities} 
              slidesToShow={2}
              className="mb-8"
            />
          </div>
        </section>
      )}

      {/* 主要内容区域 */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 侧边栏筛选 */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-6">筛选条件</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">活动类型</h4>
                  <CategoryFilter 
                    currentCategory={filters.category}
                    onChange={handleCategoryChange}
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">价格范围</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" defaultChecked />
                      <span>全部价格</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span>免费活动</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="price" className="mr-2" />
                      <span>付费活动</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">难度等级</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>初级</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>中级</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>高级</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">时间安排</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="time" className="mr-2" defaultChecked />
                      <span>全部时间</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="time" className="mr-2" />
                      <span>本周</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="time" className="mr-2" />
                      <span>周末</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 活动列表区域 */}
            <div className="lg:w-3/4">
              <ActivitySearch />
              <ActivityList />
            </div>
          </div>
        </div>
      </section>

      {/* 推荐活动 */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">为您推荐</h2>
            <p className="text-gray-600">基于您的兴趣为您推荐的活动</p>
          </div>
          <ActivityCardSlider 
            activities={activities.slice(0, 4)} 
            slidesToShow={4}
            className="mb-8"
          />
        </div>
      </section>

      {/* 底部行动号召 */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">加入我们的运动社区</h2>
          <p className="text-xl opacity-90 mb-8">
            与志同道合的朋友一起运动，享受健康快乐的生活方式
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              创建活动
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;