import { useEffect, useState } from 'react';
import activityService from '../../services/activityService';
import CommentForm from './CommentForm';

const ActivityComments = ({ activityId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchComments = async () => {
    try {
      const data = await activityService.getComments(activityId);
      setComments(data);
    } catch (error) {
      console.error('获取评价失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchComments();
  }, [activityId]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400 text-sm">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>
    );
  };
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">用户评价</h3>
      
      {loading ? (
        <div className="text-center py-4">加载中...</div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {comment.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">
                    {comment.user?.name || '匿名用户'}
                  </span>
                </div>
                {comment.rating && renderStars(comment.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              {comment.createdAt && (
                <span className="text-xs text-gray-500 mt-2 block">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          暂无评价，成为第一个评价的用户吧！
        </div>
      )}
      
      <CommentForm activityId={activityId} onCommentAdded={handleCommentAdded} />
    </div>
  );
};
export default ActivityComments;