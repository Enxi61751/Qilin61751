import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '@/context/AuthContext';  

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = AuthContext;
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}