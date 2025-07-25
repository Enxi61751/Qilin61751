import React, { useState, useEffect } from 'react';
import activityService from '../../services/activityService';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    content: '',
    rating: 5,
    activityType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 预设的评价数据作为后备
  const defaultReviews = [
    { id: 1, name: '张伟', content: '这里的篮球活动组织得非常好，每周都能找到合适的对手！', rating: 5, activityType: '篮球' },
    { id: 2, name: '李娜', content: '瑜伽课程让我身心放松，认识了很多志同道合的朋友', rating: 4, activityType: '瑜伽' },
    { id: 3, name: '王明', content: '足球训练营专业度很高，教练非常专业，推荐给所有足球爱好者', rating: 5, activityType: '足球' },
    { id: 4, name: '陈静', content: '游泳俱乐部的设施很棒，水质干净，教练也很耐心', rating: 4, activityType: '游泳' },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await activityService.getAllReviews();
      setReviews(data.length > 0 ? data : defaultReviews);
    } catch (error) {
      console.log('使用默认评价数据');
      setReviews(defaultReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.content.trim() || !newReview.name.trim()) {
      alert('请填写完整信息');
      return;
    }

    setIsSubmitting(true);
    try {
      await activityService.addReview(newReview);
      await fetchReviews();
      setNewReview({ name: '', content: '', rating: 5, activityType: '' });
      setShowAddForm(false);
      alert('感谢您的评价！');
    } catch (error) {
      // 如果API不可用，直接添加到本地状态
      const localReview = {
        id: Date.now(),
        ...newReview,
        createdAt: new Date().toISOString()
      };
      setReviews(prev => [localReview, ...prev]);
      setNewReview({ name: '', content: '', rating: 5, activityType: '' });
      setShowAddForm(false);
      alert('感谢您的评价！');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={readOnly ? undefined : () => onRatingChange(star)}
            className={`text-xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${readOnly ? '' : 'hover:text-yellow-400 transition-colors'}`}
            disabled={readOnly}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          用户评价
        </h2>
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        用户评价
      </h2>
      
      {/* 添加评价按钮 */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          分享您的体验
        </button>
      </div>

      {/* 添加评价表单 */}
      {showAddForm && (
        <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4">分享您的体验</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您的姓名
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  placeholder="请输入您的姓名"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动类型
                </label>
                <input
                  type="text"
                  value={newReview.activityType}
                  onChange={(e) => setNewReview({...newReview, activityType: e.target.value})}
                  placeholder="如：篮球、瑜伽、游泳等"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评分
              </label>
              <StarRating 
                rating={newReview.rating} 
                onRatingChange={(rating) => setNewReview({...newReview, rating})} 
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                您的评价
              </label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                placeholder="请分享您对我们运动平台的体验和感受..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? '提交中...' : '提交评价'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewReview({ name: '', content: '', rating: 5, activityType: '' });
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* 评价展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {reviews.slice(0, 8).map((review) => (
          <div 
            key={review.id} 
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                {review.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800">{review.name}</h4>
                {review.activityType && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {review.activityType}
                  </span>
                )}
                <div className="flex mt-1">
                  <StarRating rating={review.rating} readOnly />
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.content}</p>
            {review.createdAt && (
              <div className="text-xs text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 8 && (
        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            查看更多评价 →
          </button>
        </div>
      )}
    </div>
  );
};

export default UserReviews;