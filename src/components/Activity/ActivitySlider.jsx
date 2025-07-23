import React, { useState, useEffect, useRef } from 'react';
import Slider from '../UI/Slider';
import { Link } from 'react-router-dom';

const ActivitySlider = ({ activities, autoPlay = true, className = "" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

  // 自动播放功能
  useEffect(() => {
    if (isPlaying && activities.length > 1) {
      const startAutoPlay = () => {
        setProgress(0);
        intervalRef.current = setTimeout(() => {
          setCurrentSlide(prev => (prev + 1) % activities.length);
        }, 4000);
        
        // 进度条动画
        progressIntervalRef.current = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              return 0;
            }
            return prev + (100 / 40); // 4秒内完成，每100ms更新一次
          });
        }, 100);
      };

      startAutoPlay();
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, currentSlide, activities.length]);

  // 手动切换时重置进度
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // 播放/暂停控制
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activity-slider-empty text-center py-12">
        <p className="text-gray-600">暂无活动数据</p>
      </div>
    );
  }

  return (
    <div className={`activity-slider relative ${className}`}>
      <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl group">
        {/* 主轮播区域 */}
        <Slider
          autoPlay={false} // 我们自己控制自动播放
          showDots={false} // 使用自定义指示器
          showArrows={true}
          infinite={true}
          className="h-full"
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
        >
        {activities.map((activity) => (
          <div key={activity.id} className="relative h-full group/slide">
            {/* 背景图片 */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-gray-300 transition-transform duration-700 group-hover/slide:scale-105"
              style={{
                backgroundImage: `url(${getActivityImage(activity.image)})`
              }}
            >
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* 特色标签 */}
              {activity.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ 精选推荐
                  </span>
                </div>
              )}
            </div>
            
            {/* 内容区域 */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8 text-white">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </span>
                <span className="inline-block bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activity.difficulty}
                </span>
                {activity.price === 0 && (
                  <span className="inline-block bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                    免费
                  </span>
                )}
              </div>

              <h3 className="text-2xl lg:text-4xl font-bold mb-3 group-hover/slide:text-blue-300 transition-colors duration-200">
                {activity.title}
              </h3>
              
              <p className="text-gray-200 mb-4 line-clamp-2 text-sm lg:text-base">
                {activity.description}
              </p>
              
              {/* 活动信息网格 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{activity.date} {activity.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{activity.location}</span>
                  </div>
                  {activity.organizer && (
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{activity.organizer}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-xl lg:text-3xl font-bold mb-2">
                    {activity.price > 0 ? `¥${activity.price}` : '免费'}
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    {activity.registered}/{activity.capacity} 人已报名
                  </div>
                  {/* 报名进度条 */}
                  <div className="w-full bg-gray-600/50 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((activity.registered / activity.capacity) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.capacity - activity.registered > 0 
                      ? `还有 ${activity.capacity - activity.registered} 个名额`
                      : '已满员'
                    }
                  </div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/activity/${activity.id}`}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center shadow-lg"
                >
                  查看详情
                </Link>
                <button 
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-white/30"
                  disabled={activity.registered >= activity.capacity}
                >
                  {activity.registered >= activity.capacity ? '已满员' : '立即报名'}
                </button>
              </div>
            </div>
          </div>
        ))}
        </Slider>

        {/* 自定义控制栏 */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          {/* 播放控制 */}
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlayPause}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
                </svg>
              )}
            </button>
            
            {/* 进度条 */}
            {isPlaying && (
              <div className="w-24 bg-gray-600/50 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-100" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* 自定义指示器 */}
          <div className="flex space-x-2">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySlider;