// src/components/CommentList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/commentSlice';
import { logoutUser } from '../redux/slices/authSlice';

const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <h1>Comments</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h3>{comment.title}</h3>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;