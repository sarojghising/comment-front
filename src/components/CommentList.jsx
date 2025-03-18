// src/components/CommentList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments,deleteComment } from '../redux/slices/commentSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const CommentList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { comments, loading, error } = useSelector((state) => state.comments);


    const handleEdit = (id) => {
        navigate(`/comments/edit/${id}`);
      };


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
          dispatch(deleteComment(id));
          dispatch(fetchComments());
        }
    };
    

    const handleLogout = () => {
        dispatch(logoutUser());
    };
    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    return (
        <>
            <button className='logoutbtn' onClick={handleLogout}>Logout</button>
            <div className='container'>
                <h1>Comments</h1>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link to="/comments/create">
                    <button>Add New</button>
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.length === 0 ? (<tr><td>No comments Yet. Be First to add one !</td></tr>)
                                : (
                                    comments.map((comment) => (
                                        <tr key={comment.id}>
                                            <td>{comment.title}</td>
                                            <td>{comment.content}</td>
                                            <td>
                                                <button style={{ 'marginRight': '1rem' }}
                                                 onClick={() => handleEdit(comment.id)}>Edit</button>
                                                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )
                        }

                    </tbody>
                </table>
            </div>
        </>

    );
};

export default CommentList;