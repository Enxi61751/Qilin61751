import { Routes, Route } from 'react-router-dom';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import OrdersPage from './pages/OrdersPage';
import Login from './components/Auth/Login';
import HomePage from './pages/HomePage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/activities" element={<ActivitiesPage />} />
    <Route path="/orders" element={<OrdersPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/activity" element={<ActivityDetailPage />} />
    {/* 其他路由... */}
  </Routes>
);
export default AppRoutes;