import React, { useState } from 'react';
import activityService from '../../services/activityService';

const CommentForm = ({ activityId, onCommentAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await activityService.addComment(activityId, { content: comment, rating });
      setComment('');
      setRating(5);
      setShowForm(false);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('提交评价失败:', error);
      alert('提交评价失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (!showForm) {
    return (
      <div className="mt-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          写评价
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">写下您的评价</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评分
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评价内容
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="请分享您对这个活动的感受和体验..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '提交中...' : '提交评价'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setComment('');
              setRating(5);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;