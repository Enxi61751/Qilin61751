// ActivityList.jsx
import { useContext } from 'react';
import ActivityContext from '@context/ActivityContext';
import {Link} from 'react-router-dom';

const ActivityList = () => {
  const { activities } = useContext(ActivityContext);
  
  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>
          <Link to={`/activity/${activity.id}`}>
            <h3>{activity.title}</h3>
            {/* 其他内容 */}
          </Link>
        </div>
      ))}
    </div>
  );
  
};
export default ActivityList;