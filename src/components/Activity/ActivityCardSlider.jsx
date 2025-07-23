import React from 'react';
import Slider from '../UI/Slider';
import { Link } from 'react-router-dom';

const ActivityCardSlider = ({ activities, slidesToShow = 3, className = "" }) => {
  // 图片映射
  const getActivityImage = (imageKey) => {
    const imageMap = {
      basketball: '/images/basketball.jpg',
      yoga: '/images/yoga.jpg',
      football: '/images/football.jpg',
      badminton: '/images/badminton.jpg',
      running: '/images/running.jpg',
      swimming: '/images/swimming.jpg',
      hiking: '/images/hiking.jpg',
      taichi: '/images/taichi.jpg',
    };
    return imageMap[imageKey] || '/images/default-activity.jpg';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activity-card-slider-empty text-center py-12">
        <p className="text-gray-600">暂无活动数据</p>
      </div>
    );
  }
  return (
    <div className={`activity-card-slider ${className}`}>
      <Slider
        autoPlay={false}
        showDots={false}
        showArrows={true}
        infinite={false}
        slidesToShow={slidesToShow}
        className="h-auto"
      >
        {activities.map((activity) => (
          <div key={activity.id} className="px-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
              {/* 活动图片 */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center bg-gray-300 hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${getActivityImage(activity.image)})`
                  }}
                >
                  {/* 价格标签 */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
                      activity.price > 0 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    }`}>
                      {activity.price > 0 ? `¥${activity.price}` : '免费'}
                    </span>
                  </div>
                  {/* 分类和难度标签 */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                      {activity.category}
                    </span>
                    {activity.difficulty && (
                      <span className="bg-purple-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        {activity.difficulty}
                      </span>
                    )}
                  </div>
                  {/* 精选标记 */}
                  {activity.featured && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ 精选
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 卡片内容 */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                  {activity.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {activity.description}
                </p>

                {/* 主办方信息 */}
                {activity.organizer && (
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>主办：{activity.organizer}</span>
                  </div>
                )}
                {/* 活动信息 */}
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{activity.location}</span>
                  </div>
                </div>
                {/* 报名进度 */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>已报名</span>
                    <span>{activity.registered}/{activity.capacity} 人</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((activity.registered / activity.capacity) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <Link
                    to={`/activity/${activity.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    查看详情
                  </Link>
                  <button 
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                      activity.registered >= activity.capacity
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                    }`}
                    disabled={activity.registered >= activity.capacity}
                  >
                    {activity.registered >= activity.capacity ? '已满员' : '立即报名'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ActivityCardSlider;
