const ActivityComments = ({ activityId }) => {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchComments = async () => {
      const data = await activityService.getComments(activityId);
      setComments(data);
    };
    fetchComments();
  }, [activityId]);
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">用户评价</h3>
      {comments.map(comment => (
        <div key={comment.id} className="border-b pb-3 mb-3">
          <p>{comment.content}</p>
          <span className="text-sm text-gray-500">
            - {comment.user.name}
          </span>
        </div>
      ))}
      <CommentForm activityId={activityId} />
    </div>
  );
};
export default ActivityComments;