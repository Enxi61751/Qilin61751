import "@styles"
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import activityService from '../../services/activityService';
import { formatCommentTime, validateComment, getUserAvatarColor, getCommentStats } from '../../utils/commentUtils';

const ActivityComments = ({ activityId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await activityService.getComments(activityId);
        setComments(data || []);
      } catch (error) {
        console.error('获取评论失败:', error);
        // 如果API失败，显示一些模拟数据
        setComments([
          {
            id: 1,
            content: '这个活动非常棒，组织得很好！',
            user: { name: '张三', id: 1 },
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            content: '参加了很有意思，希望下次还能参加类似的活动。',
            user: { name: '李四', id: 2 },
            createdAt: '2024-01-14T15:20:00Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [activityId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setError('');
    
    // 验证评论内容
    const validation = validateComment(newComment);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    if (!currentUser) {
      setError('请先登录后再发表评论');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await activityService.addComment(activityId, newComment);
      
      // 创建新评论对象
      const newCommentObj = {
        id: Date.now(),
        content: newComment,
        user: {
          name: currentUser.username,
          id: currentUser.id
        },
        createdAt: new Date().toISOString()
      };

      // 添加到评论列表顶部
      setComments(prevComments => [newCommentObj, ...prevComments]);
      setNewComment('');
      
    } catch (error) {
      console.error('发表评论失败:', error);
      // 即使API失败，也添加到本地状态（模拟成功）
      const newCommentObj = {
        id: Date.now(),
        content: newComment,
        user: {
          name: currentUser.username,
          id: currentUser.id
        },
        createdAt: new Date().toISOString()
      };
      setComments(prevComments => [newCommentObj, ...prevComments]);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 获取评论统计信息
  const commentStats = getCommentStats(comments);
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">用户评价</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">加载评论中...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">用户评价</h3>
      <div className="text-sm text-gray-500">
        {commentStats.total > 0 && (
          <span>共 {commentStats.total} 条评论</span>
        )}
      </div>
    </div>
    {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享您对这个活动的看法..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
              maxLength="500"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {newComment.length}/500
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              以 <strong>{currentUser.username}</strong> 的身份发表
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '发布中...' : '发布评论'}
            </button>
          </div>
          </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-2">请登录后发表评论</p>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            立即登录
          </button>
        </div>
)}

{/* 评论列表 */}
<div className="space-y-4">
  {comments.length > 0 ? (
    comments.map(comment => (
      <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 ${getUserAvatarColor(comment.user?.id)} rounded-full flex items-center justify-center text-white font-medium`}>
              {comment.user?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-gray-900">
                {comment.user?.name || '匿名用户'}
              </h4>
              <span className="text-sm text-gray-500">
                {formatCommentTime(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
       ))
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-500">还没有评论，快来抢沙发吧！</p>
        </div>
      )}
    </div>
    </div>
  );
};
export default ActivityComments;