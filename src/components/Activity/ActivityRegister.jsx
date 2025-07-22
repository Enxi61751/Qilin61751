import { useEffect, useState } from 'react';
const ActivityRegister = ({ activityId }) => {
  const [formData, setFormData] = useState({ /* ... */ });
  
  const handleSubmit = async (e) => {
    {/*e.preventDefault();*/}
    // 调用 activityService.registerActivity()
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 报名表单字段 */}
      {<button type="submit">立即报名</button>}
      

    </form>
  );
};
export default ActivityRegister;