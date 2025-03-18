// src/components/CommentList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/commentSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

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
                            comments.length === 0 ? (<p>No comments Yet. Be First to add one !</p>)
                                : (
                                    comments.map((comment) => (
                                        <tr key={comment.id}>
                                            <td>{comment.title}</td>
                                            <td>{comment.content}</td>
                                            <td>
                                                <button style={{ 'marginRight': '1rem' }}>Edit</button>
                                                <button>Delete</button>
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