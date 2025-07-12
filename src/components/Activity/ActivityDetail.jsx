// ActivityDetail.jsx
const ActivityDetail = ({ activity }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
      <p className="text-gray-700">{activity.description}</p>
      <div className="mt-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {activity.category}
        </span>
      </div>
    </div>
  );
};
export default ActivityDetail;