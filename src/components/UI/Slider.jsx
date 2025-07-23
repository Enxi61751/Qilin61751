import React, { useState, useEffect, useRef } from 'react';

const Slider = ({ 
  children, 
  autoPlay = false, 
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  slidesToShow = 1,
  className = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  
  // 自动播放功能
  useEffect(() => {
    if (autoPlay && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          if (infinite) {
            return (prev + 1) % totalSlides;
          } else {
            return prev + 1 < totalSlides ? prev + 1 : 0;
          }
        });
      }, autoPlayInterval);
    }
    return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }, [autoPlay, autoPlayInterval, totalSlides, infinite]);
    
    // 下一张
    const nextSlide = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      
      if (infinite) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      }
      
      setTimeout(() => setIsAnimating(false), 300);
    };
    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        if (infinite) {
          setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
        
        setTimeout(() => setIsAnimating(false), 300);
      };
      
      // 跳转到指定滑块
      const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 300);
      };
      
      // 鼠标进入暂停自动播放
      const handleMouseEnter = () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
      const handleMouseLeave = () => {
        if (autoPlay && totalSlides > 1) {
          autoPlayRef.current = setInterval(() => {
            nextSlide();
          }, autoPlayInterval);
        }
      };
      
      if (totalSlides === 0) {
        return <div className="slider-empty">暂无内容</div>;
      }
      return (
        <div 
          className={`slider-container relative overflow-hidden ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={sliderRef}
        >
          {/* 滑块容器 */}
          <div 
            className="slider-wrapper flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              width: `${(totalSlides * 100) / slidesToShow}%`
            }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className="slider-slide"
                style={{ width: `${100 / totalSlides}%` }}
              >
                {slide}
              </div>
            ))}
          </div>
          {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={!infinite && currentSlide === 0}
            className="slider-arrow slider-arrow-left absolute left-2 top-1/2 transform -translate-y-1/2 
                     bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            disabled={!infinite && currentSlide === totalSlides - 1}
            className="slider-arrow slider-arrow-right absolute right-2 top-1/2 transform -translate-y-1/2 
                     bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {/* 底部指示点 */}
      {showDots && totalSlides > 1 && (
        <div className="slider-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;