import React from 'react';
import useRole from "../../Hooks/useRole";
import SCALoader from '../../components/SCALoader/Nexusloader';
import StudentDashboard from '../DashboardHomepage/StudentDashboard';
import AdminDashboard from '../DashboardHomepage/AdminDashboard';
import TeacherDashboard from '../DashboardHomepage/TeacherDashboard';

import AdminPrivetRoute from '../../Router/PrivetRoute/AdminPrivetRoute';
import TeacherPrivRoute from '../../Router/PrivetRoute/TeacherPrivRoute';
import StudentPrivRoute from '../../Router/PrivetRoute/StudentPrivRoute';
import UserDashboard from './UserDasboard/UserDashboard';
import PrivateRoutes from '../../Router/PrivetRoute/PrivateRoutes';


const Dashboard = () => {
    const [role, roleLoading] = useRole();

    if (roleLoading) {
        return (
            <SCALoader />
        );
    }
   
    // role based rendering
    if (role === 'admin') return (
        <AdminPrivetRoute>
          <AdminDashboard />
        </AdminPrivetRoute>);
    if (role === 'teacher') return (
        <TeacherPrivRoute>
          <TeacherDashboard />
        </TeacherPrivRoute>
      
    );

    if (role === 'student') {
         return (
           <StudentPrivRoute>
             <StudentDashboard />
           </StudentPrivRoute>
         );
    }
  
    return (
      
        <PrivateRoutes>
          <UserDashboard></UserDashboard>
        </PrivateRoutes>
     
    );
};

export default Dashboard;