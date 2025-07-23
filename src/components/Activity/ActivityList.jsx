// ActivityList.jsx
import { useContext } from 'react';
import ActivityContext from '@context/ActivityContext';
import { Link } from 'react-router-dom';

const ActivityList = () => {
  const { activities, filters } = useContext(ActivityContext);
  
  // 确定要显示的活动列表
  const displayActivities = filters?.searchResults || activities;
  const isSearching = filters?.searchTerm && filters.searchTerm.trim() !== '';
  
  if (!displayActivities || displayActivities.length === 0) {
    return (
      <div className="activity-list-empty">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>{isSearching ? '未找到相关活动' : '暂无活动'}</h3>
          <p>{isSearching ? `没有找到与 "${filters.searchTerm}" 相关的活动` : '目前还没有任何活动，请稍后再试'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-list">
      {isSearching && (
        <div className="search-results-header">
          <h3>搜索结果</h3>
          <p>找到 <span className="result-count">{displayActivities.length}</span> 个相关活动</p>
        </div>
      )}
      
      <div className="activity-grid">
        {displayActivities.map(activity => (
          <div key={activity.id} className="activity-card">
            <Link to={`/activity/${activity.id}`} className="activity-link">
              <div className="activity-image">
                <div className={`activity-icon ${activity.category.toLowerCase()}`}>
                  {getActivityIcon(activity.category)}
                </div>
                <div className="activity-price">
                  {activity.price === 0 ? '免费' : `¥${activity.price}`}
                </div>
              </div>
              
              <div className="activity-content">
                <div className="activity-header">
                  <h3 className="activity-title">{activity.title}</h3>
                  <span className="activity-category">{activity.category}</span>
                </div>
                
                <p className="activity-description">{activity.description}</p>
                
                <div className="activity-details">
                  <div className="activity-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{activity.date} {activity.time}</span>
                  </div>
                  
                  <div className="activity-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 6.134 7.134 2 12 2C16.866 2 21 6.134 21 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>{activity.location}</span>
                  </div>
                </div>
                
                <div className="activity-stats">
                  <div className="activity-capacity">
                    <span className="registered">{activity.registered}</span>
                    <span className="separator">/</span>
                    <span className="total">{activity.capacity}人</span>
                  </div>
                  
                  <div className="activity-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(activity.registered / activity.capacity) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="activity-status">
                    {activity.registered >= activity.capacity ? (
                      <span className="status-full">已满</span>
                    ) : (
                      <span className="status-available">可报名</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// 获取活动图标的辅助函数
const getActivityIcon = (category) => {
  const icons = {
    '篮球': '🏀',
    '瑜伽': '🧘',
    '足球': '⚽',
    '羽毛球': '🏸',
    '跑步': '🏃',
    '游泳': '🏊',
    '网球': '🎾',
    '健身': '💪',
    '骑行': '🚴',
    '登山': '🏔️'
  };
  return icons[category] || '🏃';
};

export default ActivityList;