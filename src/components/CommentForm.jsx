import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../redux/slices/commentSlice';

const CommentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const { loading, error } = useSelector((state) => state.comments);

    const handleSubmit =  async (e) =>   {
        e.preventDefault();
        const result = await dispatch(createComment({ title, content }));
        
         if (result.payload.success) {
            setTitle('');
            setContent('');
            navigate('/comments');
         }
       
      };
  return (
    <div className='container'>
        <h2>Create a Comment</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Form to create a new comment */}
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
        <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
      </form>
    </div>
    
  )
}

export default CommentForm