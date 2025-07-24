import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(null);

  // 从导航状态中获取活动信息
  useEffect(() => {
    if (location.state && location.state.activity) {
      setActivity(location.state.activity);
    } else {
      // 如果没有活动信息，重定向回活动详情页
      navigate(`/activity/${id}`);
    }
  }, [location.state, id, navigate]);

  const handlePayment = async () => {
    if (!currentUser) {
      alert('请先登录');
      navigate('/login');
      return;
    }

    setLoading(true);
    // 模拟支付处理
    setTimeout(() => {
        setLoading(false);
        alert('支付成功！');
        navigate('/orders');
      }, 2000);
    };
  
    if (!activity) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      );
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* 返回按钮卡片 */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回活动详情
            </button>
          </div>
    
          {/* 支付信息卡片 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h1 className="text-2xl font-bold mb-2">活动支付</h1>
              <p className="opacity-90">{activity.title}</p>
            </div>
            <div className="p-6">
          {/* 订单信息 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">订单信息</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">活动名称:</span>
                <span className="font-medium">{activity.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">活动时间:</span>
                <span>{activity.date} {activity.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">活动地点:</span>
                <span>{activity.location}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-lg font-semibold">支付金额:</span>
                <span className="text-lg font-bold text-red-600">
                  {activity.price > 0 ? `¥${activity.price}` : '免费'}
                </span>
              </div>
            </div>
          </div>
           {/* 支付方式 */}
           {activity.price > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">选择支付方式</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="alipay"
                    checked={paymentMethod === 'alipay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded mr-3 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">支</span>
                    </div>
                    <span>支付宝</span>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="wechat"
                    checked={paymentMethod === 'wechat'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded mr-3 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">微</span>
                    </div>
                    <span>微信支付</span>
                  </div>
                </label>
              </div>
            </div>
          )}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : activity.price > 0
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                处理中...
              </div>
            ) : (
              activity.price > 0 ? `立即支付 ¥${activity.price}` : '确认报名(免费)'
            )}
          </button>

          {/* 安全提示 */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              安全支付环境，您的支付信息将被加密保护
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;  