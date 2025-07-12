import { Routes, Route } from 'react-router-dom';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import OrdersPage from './pages/OrdersPage';
import Login from './components/Auth/Login';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ActivitiesPage />} />
    <Route path="/activities" element={<ActivityDetailPage />} />
    <Route path="/orders" element={<OrdersPage />} />
    <Route path="/login" element={<Login />} />
    {/* 其他路由... */}
  </Routes>
);