import { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate, Outlet } from "react-router";
import {
  LayoutDashboard, Users, BookOpen, FileText,
  Bell, LogOut, Menu, X, UserCircle, GraduationCap,
  ClipboardList,
  ClipboardClock,
  CircleDollarSign,
} from "lucide-react";
import { AuthContext } from "../AuthContext/AuthContext";
import logo from "../assets/logo.png";
import useRole from "../Hooks/useRole";
import SCALoader from "../components/SCALoader/Nexusloader";
import { PiStudentFill } from 'react-icons/pi';
import { IoCreateOutline } from 'react-icons/io5';
import { FaBookOpenReader } from "react-icons/fa6";
import { ImFileText } from 'react-icons/im';
import { BiSpreadsheet } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Logo from "../components/UI/Logo";
import { MdNotificationsActive, MdOutlineHistory } from 'react-icons/md';

// --- SidebarLink Helper Component ---
const SidebarLink = ({ to, icon, label, isOpen, end = false, onClick }) => (

  
  <li>
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all group ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <div className={`shrink-0 ${!isOpen && "mx-auto"}`}>{icon}</div>
      {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </NavLink>
  </li>
);

// --- NavLinks Logic ---
const NavLinks = ({
  isOpen,
  isMobile = false,
  userRole,
  setMobileMenuOpen,
}) => (
  <ul className="space-y-2">
    <SidebarLink
      to="/dashboard"
      icon={<LayoutDashboard size={20} />}
      label="Dashboard"
      isOpen={isOpen}
      end={true}
      onClick={() => isMobile && setMobileMenuOpen(false)}
    />

    {userRole === 'admin' && (
      <>
        <SidebarLink
          to="/dashboard/manage-users"
          icon={<Users size={20} />}
          label="Manage Users"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/noticepost"
          icon={<Bell size={20} />}
          label="Post Notice"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/admissions"
          icon={<ClipboardList size={20} />}
          label="Admission Apps"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/create-routine"
          icon={<IoCreateOutline size={20} />}
          label="Create Routine"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/student-give-result"
          icon={<ImFileText size={20} />}
          label="Create Result Sheet"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/payments"
          icon={<CircleDollarSign size={20} />}
          label="Payments"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
      </>
    )}

    {userRole === 'teacher' && (
      <>
        {/* <SidebarLink
          to="/dashboard/my-classes"
          icon={<BookOpen size={20} />}
          label="My Classes"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        /> */}
        <SidebarLink
          to="/dashboard/teachersh/Attendance"
          icon={<BookOpen size={20} />}
          label="Attendance"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/teachersh/AttendanceHistory"
          icon={<MdOutlineHistory  size={20} />}
          label="Attendance History"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/assignments"
          icon={<FileText size={20} />}
          label="Assignments"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/manage-student"
          icon={<PiStudentFill size={20} />}
          label="Manage Student"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/exam-schedule"
          icon={<ImFileText size={20} />}
          label="Exam Schedule"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
      </>
    )}

    {userRole === 'student' && (
      <>
        <SidebarLink
          to="/dashboard/my-courses"
          icon={<GraduationCap size={20} />}
          label="My Courses"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/student-result"
          icon={<BiSpreadsheet size={20} />}
          label="Exam Results"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/my-assignments"
          icon={<FileText size={20} />}
          label="My Assignments"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/class-routine"
          icon={<FaBookOpenReader size={20} />}
          label="Class Routine"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/my-exam-schedule"
          icon={<ClipboardClock size={20} />}
          label="My Exam Schedule"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/my-payments"
          icon={<CircleDollarSign size={20} />}
          label="My Payments"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
        <SidebarLink
          to="/dashboard/school-notices"
          icon={<MdNotificationsActive size={20} />}
          label="School Notices"
          isOpen={isOpen}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        />
      </>
    )}

    <div
      className={`my-4 border-t border-slate-700/50 ${isOpen ? 'pt-4' : 'pt-2'}`}
    >
      <SidebarLink
        to="/dashboard/profile"
        icon={<UserCircle size={20} />}
        label="My Profile"
        isOpen={isOpen}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      />
    </div>
  </ul>
);

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, roleLoading] = useRole();
  const [isDropDown, setIsDorpDown] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [role] = useRole()
 
  


  const handleClick = () => {
    setIsDorpDown(!isDropDown)
  }

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', user?.email,role],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/notifications?email=${user?.email}&role=${role}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
    refetchInterval: 6000,
  });

  const handleSeeAndUpdate =async (n) => {
   try {
     
    await axiosSecure.patch(`/notifications/${n._id}`)
    navigate(n?.link);
       
   } catch (error) {
    console.log(error)
   }
  }
 
  console.log(notifications)
  if (roleLoading) return <SCALoader />;

  const userName = user?.displayName || "SCA User";
  const userImg = user?.photoURL || "https://i.pravatar.cc/150?img=11";

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-[#E2E8F0] font-sans selection:bg-blue-500/30">
      {/* --- MOBILE SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-[#1E293B] p-6 transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-slate-800 rounded-lg text-slate-400"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <NavLinks
              isOpen={true}
              isMobile={true}
              userRole={userRole}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </nav>
        </aside>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-24'} bg-[#1E293B] p-6 hidden md:flex flex-col border-r border-slate-700 shadow-2xl transition-all duration-300 h-screen sticky top-0`}
      >
        <div className="mb-10 flex items-center gap-3 overflow-hidden">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full shrink-0 shadow-lg"
            />
            {isSidebarOpen && (
              <span className="text-xl font-bold text-white whitespace-nowrap">
                SCA-<span className="text-blue-500">ACADEMY</span>
              </span>
            )}
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <NavLinks isOpen={isSidebarOpen} userRole={userRole} />
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-700">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-2 hover:bg-slate-800 transition-colors rounded-2xl group"
          >
            <img
              src={userImg}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shrink-0"
            />
            {isSidebarOpen && (
              <div className="truncate">
                <p className="text-sm font-bold truncate text-white">
                  {userName}
                </p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  {userRole}
                </p>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-[#1E293B]/80 backdrop-blur-md flex justify-between items-center px-4 md:px-8 border-b border-slate-700 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-slate-800 rounded-lg md:hidden text-slate-400"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg hidden md:block text-slate-400"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-sm md:text-lg font-medium text-slate-300">
              System <span className="text-white font-bold">Portal</span>
            </h1>
          </div>

          {/* logout and notification div */}
          <div className="flex items-center gap-3  ">
            {/* logout button */}
            <button
              onClick={handleLogout}
              className="px-3  py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-xs flex items-center gap-2"
            >
              <LogOut size={16} />{' '}
              <span className="hidden sm:inline">Logout</span>
            </button>

            

            {/* notification dropdown */}
            <div className="relative">
              <button
                onClick={handleClick}
                tabIndex={0}
                role="button"
                className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 relative group"
              >
                <IoIosNotifications
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />

                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#1E293B]">
                    {notifications.length}
                  </div>
                )}
              </button>

              {isDropDown && (
                <div className="absolute w-[300px] bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl right-0 mt-3 overflow-hidden z-50">
                  {/* Header */}
                  <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                    <h3 className="text-white font-semibold text-sm">
                      Notifications
                    </h3>
                  </div>

                  {/* List */}
                  <div className="h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((n, index) => (
                        <div
                          key={index}
                          onClick={() => handleSeeAndUpdate(n)}
                          className="p-4 border-b border-slate-800/50 hover:bg-black   cursor-pointer transition-colors last:border-0"
                        >
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {n?.notifications}
                          </p>
                          <span className="text-[10px] text-slate-300 mt-1 block">
                            {new Date(n?.createAt).toDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        No new notifications
                      </div>
                    )}
                  </div>

                  
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;