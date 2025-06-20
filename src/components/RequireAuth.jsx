import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../api/hooks/useAuth';
import PropTypes from 'prop-types';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to='unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='login' state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RequireAuth;
