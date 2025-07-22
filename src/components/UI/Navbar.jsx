import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from '@/context/AuthContext';  

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-card">
      <div className="navbar-logo">
        {/*<Link to="/" className="nav-link-card">体育活动室</Link>*/}
        
        <div className="navbar-center">
          <Link to="/activities" className="nav-link-card">
            活动中心
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/orders" className="nav-link-card">
                我的订单
              </Link>
              <Link to="/profile" className="nav-link-card">
                个人中心
              </Link>
              <button 
                onClick={handleLogout}
                className="logout-btn-card"
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link-card">
                登录
              </Link>
              <Link to="/register" className="nav-link-card">
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;