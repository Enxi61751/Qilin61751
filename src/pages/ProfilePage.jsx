import React, { useState, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';  

const ProfilePage = () => {
  const { currentUser, updateUser, logout } = AuthContext;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 初始化表单数据
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        bio: currentUser.bio || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateUser(formData);
      setSuccessMessage('个人资料已成功更新！');
      setEditMode(false);
      
      // 5秒后清除成功消息
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (err) {
      setErrorMessage('更新失败: ' + err.message);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">需要登录</h2>
          <p className="mb-6">请登录账号以查看个人资料</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              登录
            </a>
            <a 
              href="/register" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              注册
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">个人中心</h1>
        <p className="text-gray-600 mt-2">
          管理您的个人资料和账户设置
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧个人信息 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mb-4"></div>
              <h2 className="text-xl font-bold">{currentUser.username}</h2>
              <p className="text-gray-600">{currentUser.email}</p>
              
              <div className="mt-6 w-full">
                <h3 className="font-medium mb-2">会员状态</h3>
                <div className="bg-blue-50 text-blue-800 py-2 px-4 rounded">
                  普通会员
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                退出登录
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-bold mb-4">账户安全</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>登录密码</span>
                <button className="text-blue-600 hover:text-blue-800">修改</button>
              </li>
              <li className="flex justify-between items-center">
                <span>绑定手机</span>
                <button className="text-blue-600 hover:text-blue-800">绑定</button>
              </li>
              <li className="flex justify-between items-center">
                <span>安全邮箱</span>
                <button className="text-blue-600 hover:text-blue-800">验证</button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 右侧个人资料编辑 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">个人资料</h2>
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  编辑资料
                </button>
              )}
            </div>
            
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}
            
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                      用户名
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="w-full px-3 py-2 border rounded"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      邮箱
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      手机号码
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border rounded"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2" htmlFor="bio">
                      个人简介
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      className="w-full px-3 py-2 border rounded"
                      value={formData.bio}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                  >
                    保存更改
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-500 mb-1">用户名</h4>
                  <p>{currentUser.username}</p>
                </div>
                
                <div>
                  <h4 className="text-gray-500 mb-1">邮箱</h4>
                  <p>{currentUser.email}</p>
                </div>
                
                <div>
                  <h4 className="text-gray-500 mb-1">手机号码</h4>
                  <p>{currentUser.phone || '未设置'}</p>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-gray-500 mb-1">个人简介</h4>
                  <p>{currentUser.bio || '暂无简介'}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-bold mb-6">我的活动</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <div key={item} className="border border-gray-200 rounded-lg p-4 flex">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16"></div>
                  <div className="ml-4">
                    <h3 className="font-bold">活动标题 {item}</h3>
                    <p className="text-gray-600 text-sm">2023-06-{10 + item}</p>
                    <div className="mt-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        已报名
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">暂无更多活动</p>
                <a 
                  href="/activities" 
                  className="inline-block mt-2 text-blue-600 hover:text-blue-800"
                >
                  浏览更多活动 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;