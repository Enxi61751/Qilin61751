import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ActivityDetail from '@/components/Activity/ActivityDetail';
import ActivityRegister from '@/components/Activity/ActivityRegister';
import ActivityComments from '@/components/Activity/ActivityComments';
import ActivityContext from '@/context/ActivityContext';
import ActivityList from '../components/Activity/ActivityList';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { activities } = useContext(ActivityContext);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 查找活动详情
  useEffect(() => {
    if (!id) return;
    
    // 模拟API调用延迟
    const timer = setTimeout(() => {
      try {
        const foundActivity = activities.find(a => a.id === id);
        
        if (!foundActivity) {
          setError('未找到该活动');
          setLoading(false);
          return;
        }
        
        setActivity(foundActivity);
        setLoading(false);
      } catch (err) {
        setError('加载活动详情失败');
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, activities]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">加载活动详情中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto" role="alert">
          <strong className="font-bold">错误！</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => navigate('/activities')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            返回活动列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        返回活动列表
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 活动封面图 */}
        <div className="h-64 bg-gray-300 border-2 border-dashed w-full"></div>
        
        <div className="p-6">
          <ActivityDetail activity={activity} />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 报名表单 */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">报名参与</h2>
              {currentUser ? (
                <ActivityRegister activityId={id} />
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium mb-4">需要登录</h3>
                  <p className="mb-4">请登录账号以报名参加此活动</p>
                  <div className="flex space-x-4">
                    <a 
                      href="/login" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      登录
                    </a>
                    <a 
                      href="/register" 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      注册
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* 活动信息侧边栏 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">活动详情</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-500">日期</h4>
                  <p>{activity.date}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500">时间</h4>
                  <p>{activity.time}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500">地点</h4>
                  <p>{activity.location}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500">费用</h4>
                  <p className={`${activity.price > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}`}>
                    {activity.price > 0 ? `¥${activity.price}` : '免费'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500">名额</h4>
                  <p>
                    <span className="font-bold">{activity.registered}</span> / {activity.capacity} 人
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(activity.registered / activity.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 评论区域 */}
          <div className="mt-12">
            <ActivityComments activityId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;