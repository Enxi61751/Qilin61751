import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityContext from '../../context/ActivityContext';

const ActivityRegister = ({ activityId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const navigate = useNavigate();
  const { activities } = useContext(ActivityContext);
  
  const activity = activities.find(a => a.id === activityId);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.name || !formData.phone) {
      alert('请填写姓名和联系电话');
      return;
    }
    
    // 跳转到支付页面，传递活动信息
    navigate(`/payment/${activityId}`, {
      state: { 
        activity: activity,
        formData: formData
      }
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">报名信息</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的姓名"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            联系电话 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的联系电话"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            邮箱地址
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的邮箱地址"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            备注信息
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="如有特殊需求或备注，请在此填写"
          />
        </div>
        
        {/* 立即报名按钮卡片 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-1 mt-6">
          <button 
            type="submit"
            className="w-full bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-6 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              立即报名
              {activity?.price > 0 && (
                <span className="ml-2 text-sm">
                  (¥{activity.price})
                </span>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
export default ActivityRegister;