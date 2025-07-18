import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "@style"; // 添加在顶部
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    try {
      await register(username, email, password);
      navigate('/activities'); // 注册成功后跳转到活动页面
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
    <div className="register-container card">
      <div className="register-header">
        <h2>注册新账号</h2>
        <p>创建账户，加入我们的社区</p>
      </div>
      
      {error && <div className="text-error mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            用户名
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            密码
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            确认密码
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          注册
        </button>
      </form>
      
      <div className="text-center mt-6 text-muted">
        <span>已有账号？</span>
        <a href="/login" className="text-primary">立即登录</a>
      </div>
    </div>
  </div>
  );
};

export default Register;