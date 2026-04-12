import React from 'react';

import { Navigate, useLocation } from 'react-router';

import SCALoader from '../../components/SCALoader/Nexusloader';
import useAuth from '../../Hooks/useAuth';

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();

  const location = useLocation();
  if (isLoading) {
    return <SCALoader></SCALoader>;
  }

  console.log(user)
  if (!user) {
    return <Navigate to="/login" state={location?.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
