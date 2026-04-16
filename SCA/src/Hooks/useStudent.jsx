import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useStudent = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    

    const {data: studentInfo={}, isLoading:studentLoading } = useQuery({
        queryKey: ['student-class', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/students/single-student?email=${user.email}`);
            return res.data;
        }
    })



    return {student: studentInfo, studentLoading};
};

export default useStudent;