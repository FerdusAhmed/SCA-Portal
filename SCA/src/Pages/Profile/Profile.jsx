import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";
import TeacherProfile from "./TeacherProfile";
import StudentProfile from "./StudentProfile";
import SCALoader from "../../components/SCALoader/Nexusloader";



const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();

  const { data: dbUser, isLoading, refetch } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || roleLoading) return <div className="flex items-center justify-center min-h-100 w-full">
    <div className="relative">
      {/* Outer Ring */}
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Inner Pulse Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
    </div>
  </div>;

  // রোল অনুযায়ী কম্পোনেন্ট পাঠানো হচ্ছে
  if (role === 'admin') return <AdminProfile dbUser={dbUser} refetch={refetch} />;
  if (role === 'teacher') return <TeacherProfile dbUser={dbUser} refetch={refetch} />;
  if (role === 'student') return <StudentProfile dbUser={dbUser} refetch={refetch} />;

  return <UserProfile dbUser={dbUser} refetch={refetch} />;
};

export default Profile;