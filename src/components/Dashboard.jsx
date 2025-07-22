import AuthContext from '../context/AuthContext';

export const Dashboard = () => {
  const { currentUser, logout } = AuthContext;

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <h2>欢迎, {currentUser.username}!</h2>
      <p>邮箱: {currentUser.email}</p>
      <p>注册时间: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
      <button onClick={logout}>退出登录</button>
    </div>
  );
};