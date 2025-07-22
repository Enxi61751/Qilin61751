// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '@context/AuthContext';  
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Dashboard } from './components/Dashboard';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import OrdersPage from './pages/OrdersPage';
import { ActivityProvider } from '@/context/ActivityContext'; 
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { currentUser, loading } = AuthContext;

  if (loading) return <div>加载中...</div>;

  return (
    <ActivityProvider> {/* 新增 ActivityProvider */}
      <Router>
        <Routes>
          {/* 公开路由 */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
          
          {/* 需要认证的私有路由 */}
          {/*<Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />*/}
          <Route path="/orders" element={currentUser ? <OrdersPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
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
            path="/orders" 
            element={currentUser ? <OrdersPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/activity/:activityId/orders" 
            element={currentUser ? <OrdersPage /> : <Navigate to="/login" />} 
          />
          
          {/* 404处理 */}
          <Route path="*" element={<h1>页面不存在</h1>} />
        </Routes>
      </Router>
    </ActivityProvider> 
  );
}

export default App;