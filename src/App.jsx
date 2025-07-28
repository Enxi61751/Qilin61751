// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';  
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Dashboard } from './components/Dashboard';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPages';
import { ActivityProvider } from '@/context/ActivityContext'; 
import { OrderProvider } from '@/context/OrderContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotificationCenter from './components/UI/NotificationCenter';


function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>加载中...</div>;

  return (
    <ActivityProvider>
      <OrderProvider>
        <Router>
          <Routes>
            {/* 公开路由 */}
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
            
            {/* 需要认证的私有路由 */}
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/activities" 
              element={currentUser ? <ActivitiesPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/activity/:id" 
              element={currentUser ? <ActivityDetailPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/payment/:id" 
              element={currentUser ? <PaymentPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/orders" 
              element={currentUser ? <OrdersPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            
            {/* 404处理 */}
            <Route path="*" element={<h1>页面不存在</h1>} />
          </Routes>
          
          {/* 通知中心 - 只在用户登录时显示 */}
          {currentUser && <NotificationCenter />}
        </Router>
      </OrderProvider>
    </ActivityProvider> 
  );
}

export default App;