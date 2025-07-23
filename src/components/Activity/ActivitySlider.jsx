import React from 'react';
import Slider from '../UI/Slider';
import { Link } from 'react-router-dom';

const ActivitySlider = ({ activities, autoPlay = true, className = "" }) => {
  // 图片映射
  const getActivityImage = (imageKey) => {
    const imageMap = {
      basketball: '/images/basketball.jpg',
      yoga: '/images/yoga.jpg',
      football: '/images/football.jpg',
      badminton: '/images/badminton.jpg',
      running: '/images/running.jpg',
      swimming: '/images/swimming.jpg',
    };
    return imageMap[imageKey] || '/images/default-activity.jpg';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activity-slider-empty text-center py-12">
        <p className="text-gray-600">暂无活动数据</p>
      </div>
    );
  }return (
    <div className={`activity-slider ${className}`}>
      <Slider
        autoPlay={autoPlay}
        autoPlayInterval={4000}
        showDots={true}
        showArrows={true}
        infinite={true}
        className="h-96 rounded-lg overflow-hidden shadow-lg"
      >
        {activities.map((activity) => (
          <div key={activity.id} className="relative h-96 group">
            {/* 背景图片 */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-gray-300"
              style={{
                backgroundImage: `url(${getActivityImage(activity.image)})`
              }}
            >
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>
            
            {/* 内容区域 */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <div className="mb-4">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-200">
                {activity.title}
              </h3>
              
              <p className="text-gray-200 mb-4 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {activity.date} {activity.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {activity.location}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {activity.price > 0 ? `¥${activity.price}` : '免费'}
                  </div>
                  <div className="text-sm text-gray-300">
                    {activity.registered}/{activity.capacity} 人
                  </div>
                </div>
                </div>
              
              <div className="mt-4 flex space-x-3">
                <Link
                  to={`/activity/${activity.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  查看详情
                </Link>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  立即报名
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ActivitySlider;