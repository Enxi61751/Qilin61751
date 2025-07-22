import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储中的登录状态
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // 注册函数
  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 检查邮箱是否已注册
    if (users.some(user => user.email === email)) {
      throw new Error('邮箱已被注册');
    }

    // 创建新用户对象
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // 注意：实际应用中应使用加密存储
      createdAt: new Date().toISOString(),
      role: 'user' // 添加角色信息
    };

    // 保存用户数据
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // 自动登录新注册的用户
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    
    return newUser;
  };

  // 登录函数
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) throw new Error('邮箱或密码错误');
    
    // 保存登录状态
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // 退出函数
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // 更新用户信息
  const updateUser = (updatedInfo) => {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? {...user, ...updatedInfo} : user
    );
    
    const updatedUser = {...currentUser, ...updatedInfo};
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    
    return updatedUser;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

