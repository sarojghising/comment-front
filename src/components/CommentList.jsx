// src/components/CommentList.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment } from '../redux/slices/commentSlice';
import { Link, useNavigate } from 'react-router-dom';

const CommentList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { comments, loading, error } = useSelector((state) => state.comments);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/comments/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            dispatch(deleteComment(id)).then(() => {
                dispatch(fetchComments());
            });
        }
    };

    const renderEmptyState = () => (
        <tr>
            <td colSpan="4" className="empty-state">
                No comments yet. Be the first to add one!
            </td>
        </tr>
    );

    const renderCommentRow = (comment, index) => (
        <tr key={comment.id}>
            <td>{index + 1}</td>
            <td>{comment.title}</td>
            <td>{comment.content}</td>
            <td className="action-buttons">
                <button
                    className="edit-button"
                    onClick={() => handleEdit(comment.id)}
                >
                    Edit
                </button>
                <button
                    className="delete-button"
                    onClick={() => handleDelete(comment.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );

    return (
        <div className="container">
            <div className="comment-header">
                <h1>Comments</h1>
                <Link to="/comments/create">
                    <button className="add-button">Add New</button>
                </Link>
            </div>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            <table className="comment-table">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.length === 0
                        ? renderEmptyState()
                        : comments.map((comment, index) => renderCommentRow(comment, index))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CommentList;