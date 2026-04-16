import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !isLoading && !!user?.email, 
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/role/${user.email}`);
                return res.data.role;
            } catch (err) {
                // User not in DB yet (e.g. during signup flow) — return null
                if (err?.response?.status === 404) return null;
                throw err;
            }
        }
    });

    return [role, roleLoading];
};

export default useRole;