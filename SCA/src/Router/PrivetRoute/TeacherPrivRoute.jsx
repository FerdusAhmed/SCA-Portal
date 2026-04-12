import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import { Navigate, useLocation } from 'react-router';
import SecendLoader from '../../components/SCALoader/SecendLoader';

const TeacherPrivRoute = ({children}) => {
  const { user, isLoading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();
  if (roleLoading || isLoading) {
    return <SecendLoader></SecendLoader>;
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
  }

  if (role !== 'teacher') {
    return <Navigate to="/" replace></Navigate>;
  }
  return children;
};

export default TeacherPrivRoute;