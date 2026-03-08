import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminLoggedIn }) => {
  return isAdminLoggedIn ? children : <Navigate to="/AdminLogin" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAdminLoggedIn: PropTypes.bool.isRequired
};

export default ProtectedRoute;
