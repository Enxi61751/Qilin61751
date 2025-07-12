// ActivityOrders.jsx
const ActivityOrders = ({ orders }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>活动名称</th>
          <th>订单状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.activity.title}</td>
            <td>{order.status}</td>
            <td>
              <button onClick={() => handleCancel(order.id)}>
                取消订单
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ActivityOrders;