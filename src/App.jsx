import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import CommentList from './components/CommentList';
import ProtectedRoute from './components/ProtectedRoute';
import CommentForm from './components/CommentForm';
import Layout from './components/Layout';
import EditComment from './components/EditComment';

function App() {

  return (
    <Provider store={store}>
    <Router>
    <Layout />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <CommentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments/create"
            element={
              <ProtectedRoute>
                <CommentForm />
              </ProtectedRoute>
            }
          />
           <Route
              path="/comments/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditComment />
                </ProtectedRoute>
              }
            />
          <Route path="/" element={<Navigate to="/comments" />} />
      </Routes>
    </Router>
  </Provider>
  )
}

export default App
