// src/components/EditComment.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../redux/slices/commentSlice';

const EditComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.comments.comments);

  const comment = comments.find((c) => c.id === parseInt(id));

  const [title, setTitle] = useState(comment ? comment.title : '');
  const [content, setContent] = useState(comment ? comment.content : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Both title and content are required.');
      return;
    }
    const responsee = await dispatch(updateComment({ id: comment.id, title, content }));
    if (responsee.payload.success) {
        navigate('/comments');
    }
  };

  if (!comment) {
    return <p>Comment not found.</p>;
  }

  return (
    <div className='container'>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditComment;