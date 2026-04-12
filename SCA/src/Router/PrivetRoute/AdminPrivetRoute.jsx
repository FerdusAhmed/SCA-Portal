import React from 'react';
import useRole from '../../Hooks/useRole';
import SecendLoader from '../../components/SCALoader/SecendLoader';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const AdminPrivetRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [role, roleLoading] = useRole()
  const location = useLocation();

  if (roleLoading || isLoading) {
    return <SecendLoader></SecendLoader>
  }

  if (!user) {
     return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
  }

  if (role !== 'admin') {
   return <Navigate to="/" replace></Navigate>;
  }
  return children
    
  
};

export default AdminPrivetRoute;