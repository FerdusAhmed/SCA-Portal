import React from 'react';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import SecendLoader from '../../components/SCALoader/SecendLoader';

const StudentPrivRoute = ({children}) => {
  const {user,isLoading}=useAuth()
  const [role, roleLoading] = useRole()
  const location = useLocation()
  if (roleLoading || isLoading) {
    return <SecendLoader></SecendLoader>
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
  }
  
  if (role !== 'student') {
    return <Navigate to="/"  replace></Navigate>;
  }
  return children
};

export default StudentPrivRoute;