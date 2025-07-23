import { useContext } from 'react';
import ActivityContext from '@context/ActivityContext';
import { Link } from 'react-router-dom';

const ActivityList = () => {
  const { activities } = useContext(ActivityContext);
  
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">暂无活动数据</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">所有活动列表</h2>
        <div className="text-sm text-gray-600">
          共 {activities.length} 个活动
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <div className="md:flex">
              {/* 活动图片 */}
              <div className="md:w-48 h-48 bg-gray-300 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{activity.category}</span>
                </div>
              </div>
              
              {/* 活动内容 */}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link to={`/activity/${activity.id}`}>
                      <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2">
                        {activity.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {activity.date}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {activity.time}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {activity.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activity.price > 0 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {activity.price > 0 ? `¥${activity.price}` : '免费'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {activity.registered}/{activity.capacity} 人
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/activity/${activity.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          查看详情
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;