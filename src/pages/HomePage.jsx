import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  
import Navbar from '@/components/UI/Navbar';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* 英雄区域 */}
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            发现精彩体育活动
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            加入我们的体育社区，参与各种精彩活动，结交志同道合的朋友
          </p>
          
          
        </div>

        {/* 特色活动 */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            热门活动类型
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, name: '篮球联赛', icon: '🏀', count: 24 },
              { id: 2, name: '足球训练营', icon: '⚽', count: 18 },
              { id: 3, name: '瑜伽课程', icon: '🧘', count: 32 },
              { id: 4, name: '羽毛球比赛', icon: '🏸', count: 15 },
              { id: 5, name: '游泳俱乐部', icon: '🏊', count: 21 },
              { id: 6, name: '跑步小组', icon: '🏃', count: 28 },
            ].map((sport) => (
              <div 
                key={sport.id} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{sport.icon}</div>
                <h3 className="text-xl font-bold mb-2">{sport.name}</h3>
                <p className="text-gray-600">{sport.count} 个活动正在进行</p>
              </div>
            ))}
          </div>
        </div>

        {/* 用户评价 */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            用户评价
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { id: 1, name: '张伟', comment: '这里的篮球活动组织得非常好，每周都能找到合适的对手！', rating: 5 },
              { id: 2, name: '李娜', comment: '瑜伽课程让我身心放松，认识了很多志同道合的朋友', rating: 4 },
              { id: 3, name: '王明', comment: '足球训练营专业度很高，教练非常专业，推荐给所有足球爱好者', rating: 5 },
              { id: 4, name: '陈静', comment: '游泳俱乐部的设施很棒，水质干净，教练也很耐心', rating: 4 },
            ].map((review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h4 className="font-bold">{review.name}</h4>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;