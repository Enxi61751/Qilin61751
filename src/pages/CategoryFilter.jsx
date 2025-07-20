import { Link } from 'react-router-dom';
import ActivityList from '../components/Activity/ActivityList';
import ActivitiesPage from './ActivitiesPage';
const CategoryFilter = ({ currentCategory, onChange }) => {
  const categories = [
    { id: 'all', name: '全部活动' },
    { id: '篮球', name: '篮球' },
    { id: '足球', name: '足球' },
    { id: '羽毛球', name: '羽毛球' },
    { id: '网球', name: '网球' },
    { id: '乒乓球', name: '乒乓球' },
    { id: '跑步', name: '跑步' },
    { id: '游泳', name: '游泳' },
    { id: '瑜伽', name: '瑜伽' },
    { id: '健身', name: '健身' },
    { id: '舞蹈', name: '舞蹈' },
  ];

  return (
    <>
    <div className="grid grid-cols-2 gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`text-left px-3 py-2 rounded text-sm ${
            currentCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
    <div>
      <Link 
        to={`/activity/${id}`} 
        className="detail-button"
      >
        查看详情
      </Link>
    </div>
    </>
  );
};

export default CategoryFilter;