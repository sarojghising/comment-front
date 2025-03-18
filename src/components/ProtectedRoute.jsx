import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkToken } from '../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(checkToken());
    }, [dispatch]);
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;