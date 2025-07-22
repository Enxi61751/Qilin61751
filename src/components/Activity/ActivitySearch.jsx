import { useContext } from 'react';
import ActivityContext from '@context/ActivityContext';
import React, { useState } from 'react';
const ActivitySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useContext(ActivityContext);
  
  const handleSearch = () => {
    const result = activities.filter(activity =>
      activity.title.includes(keyword) || activity.description.includes(keyword)
    );
    setFilters(result);
   
  };
  
  return (
    <div className="flex mb-6">
      <input
        type="text"
        placeholder="搜索活动..."
        className="flex-grow p-2 border rounded-l"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        搜索
      </button>
    </div>
  );
};
export default ActivitySearch;