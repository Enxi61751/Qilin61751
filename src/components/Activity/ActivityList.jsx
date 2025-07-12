// ActivityList.jsx
import { useContext } from 'react';
import ActivityContext from '@context/ActivityContext';

const ActivityList = () => {
  const { activities } = useContext(ActivityContext);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
export default ActivityList;