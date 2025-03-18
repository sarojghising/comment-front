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

  const [formData, setFormData] = useState({
    title: comment?.title || '',
    content: comment?.content || '',
  });

  useEffect(() => {
    if (comment) {
      setFormData({ title: comment.title, content: comment.content });
    }
  }, [comment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Both title and content are required.');
      return;
    }

    const response = await dispatch(
      updateComment({ id: comment.id, ...formData })
    );

    if (response.payload?.success) {
      navigate('/comments');
    }
  };

  if (!comment) {
    return <p>Comment not found.</p>;
  }

  return (
    <div className="container">
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditComment;