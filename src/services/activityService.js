import api from '../utils/api';

export default {
  // 获取活动列表
  async getActivities() {
    const response = await api.get('/activities');
    return response.data;
  },
  
  // 获取活动详情
  async getActivityDetails(id) {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },
  
  // 报名活动
  async registerActivity(activityId, formData) {
    const response = await api.post(`/activities/${activityId}/register`, formData);
    return response.data;
  },
  
  // 获取活动评论
  async getComments(activityId) {
    const response = await api.get(`/activities/${activityId}/comments`);
    return response.data;
  },
  
  // 提交评论
  async addComment(activityId, comment) {
    const response = await api.post(`/activities/${activityId}/comments`, { content: comment });
    return response.data;
  }
};