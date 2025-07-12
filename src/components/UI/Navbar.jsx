import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">体育活动室</Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/activities" className="hover:bg-blue-700 px-3 py-2 rounded transition">
            活动中心
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/orders" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                我的订单
              </Link>
              <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                个人中心
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded transition">
                登录
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition">
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