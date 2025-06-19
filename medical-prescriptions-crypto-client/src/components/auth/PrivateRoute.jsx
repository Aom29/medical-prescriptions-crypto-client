import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';

function PrivateRoute({ children, requiredRole }) {
  const { auth } = useAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && auth.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
