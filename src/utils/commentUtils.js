export const formatCommentTime = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffMs = now - commentDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) {
        return '刚刚';
      }
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return commentDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };
  export const validateComment = (content) => {
    if (!content || !content.trim()) {
      return { isValid: false, message: '请输入评论内容' };
    }
    
    if (content.trim().length < 2) {
      return { isValid: false, message: '评论内容至少需要2个字符' };
    }
    
    if (content.length > 500) {
      return { isValid: false, message: '评论内容不能超过500个字符' };
    }
  
    // 简单的敏感词过滤
    const sensitiveWords = ['垃圾', '差劲', '骗子', '作弊'];
    const hasSensitiveWord = sensitiveWords.some(word => content.includes(word));
    
    if (hasSensitiveWord) {
      return { isValid: false, message: '评论内容包含不当词汇，请修改后重试' };
    }
    
    return { isValid: true, message: '' };
  };
  export const getUserAvatarColor = (userId) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ];
    
    const index = userId ? userId.toString().charCodeAt(0) % colors.length : 0;
    return colors[index];
  };
  export const getCommentStats = (comments) => {
    const total = comments.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayComments = comments.filter(comment => {
      const commentDate = new Date(comment.createdAt);
      return commentDate >= today;
    }).length;
  
    return {
      total,
      todayComments
    };
  };