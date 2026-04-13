import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import logoimg from "../../assets/NS1.png";
import useRole from "../../Hooks/useRole";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCircle,
  UserPen,
  X,
  CalendarDays,
  Users,
  ChevronDown,
  ShieldCheck,
  GraduationCap,
  Home,
  BookOpen,
  Mail,
  ClipboardList,
} from "lucide-react";
import Logo from "../UI/Logo";

const Navbar = () => {
  const { logOut, user, isLoading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.info("Logged out successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const navItemBase =
    "relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group";
  const navItemActive = "text-[#4F6EF7] bg-[#4F6EF7]/8";
  const navItemInactive =
    "text-slate-500 hover:text-slate-800 hover:bg-slate-100";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
          }
        >
          <Home size={15} strokeWidth={2.2} />
          Home
        </NavLink>
      </li>

      {user && role === "teacher" && (
        <li>
          <NavLink
            to="/manage-meetings"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
            }
          >
            <CalendarDays size={15} strokeWidth={2.2} />
            Meetings
          </NavLink>
        </li>
      )}

      {user && role === "student" && (
        <li>
          <NavLink
            to="/booking-teachers"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
            }
          >
            <Users size={15} strokeWidth={2.2} />
            Book Teacher
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
          }
        >
          <BookOpen size={15} strokeWidth={2.2} />
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
          }
        >
          <Mail size={15} strokeWidth={2.2} />
          Contact
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/result-sheet"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? navItemActive : navItemInactive}`
          }
        >
          <ClipboardList size={15} strokeWidth={2.2} />
          Results
        </NavLink>
      </li>
    </>
  );

  const roleColors = {
    admin: { bg: "bg-violet-500/12", text: "text-violet-600", icon: <ShieldCheck size={9} strokeWidth={2.5} /> },
    teacher: { bg: "bg-emerald-500/12", text: "text-emerald-600", icon: <ShieldCheck size={9} strokeWidth={2.5} /> },
    student: { bg: "bg-blue-500/12", text: "text-blue-600", icon: <GraduationCap size={9} strokeWidth={2.5} /> },
  };
  const roleStyle = roleColors[role] || roleColors.student;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ns-nav {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .ns-logo-mark {
          background: linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%);
        }

        .ns-avatar-ring {
          background: conic-gradient(from 0deg, #4F6EF7, #7C3AED, #4F6EF7);
          animation: spin-slow 4s linear infinite;
        }

        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }

        .ns-dropdown {
          animation: dropdown-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }

        @keyframes dropdown-in {
          from { opacity: 0; transform: scale(0.92) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ns-mobile-drawer {
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ns-nav-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #4F6EF7;
          border-radius: 2px;
          transition: width 0.2s ease;
        }

        .ns-active-link .ns-nav-indicator {
          width: calc(100% - 24px);
        }
      `}</style>

      <header
        className={`ns-nav top-0 left-0 right-0 z-50 sticky transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-900/[0.04]"
            : "bg-white border-b border-slate-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between gap-4">

          {/* ── LEFT: Mobile toggle + Logo ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>

           <Logo />
          </div>

          {/* ── CENTER: Desktop nav ── */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-0.5">
              {navLinks}
            </ul>
          </nav>

          {/* ── RIGHT: Auth section ── */}
          <div className="flex items-center gap-2 shrink-0">
            {isLoading || roleLoading ? (
              <div className="h-9 w-32 bg-slate-100 animate-pulse rounded-lg" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-4xl border transition-all duration-200 ${
                    dropdownOpen
                      ? "bg-slate-100 border-slate-200"
                      : "bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/150"}
                      referrerPolicy="no-referrer"
                      alt="User"
                      className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>

                  {/* Name + Role */}
                  <div className="hidden sm:flex flex-col items-start leading-none gap-1">
                    <span className="text-[13px] font-bold text-slate-700 leading-none">
                      {user?.displayName?.split(" ")[0] || "User"}
                    </span>
                    <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full ${roleStyle.bg} ${roleStyle.text}`}>
                      {roleStyle.icon}
                      {role}
                    </span>
                  </div>

                  <ChevronDown
                    size={13}
                    className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="ns-dropdown absolute top-full right-0 mt-2.5 w-56 bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/10 z-50 overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
                        <p className="text-xs font-extrabold text-slate-800 truncate">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      <div className="p-2 space-y-0.5">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                            <LayoutDashboard size={14} className="text-indigo-500" />
                          </div>
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                            <UserCircle size={14} className="text-indigo-500" />
                          </div>
                          My Profile
                        </Link>
                      </div>

                      <div className="p-2 pt-0">
                        <div className="h-px bg-slate-100 mb-2" />
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center transition-colors">
                            <LogOut size={14} className="text-rose-500" />
                          </div>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <LogIn size={15} strokeWidth={2.2} />
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#4F6EF7] hover:bg-[#3D5CE8] rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all active:scale-95"
                >
                  <UserPen size={15} strokeWidth={2.2} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden fixed inset-0 z-[200] transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer panel */}
        <div
          className={`ns-mobile-drawer absolute top-0 left-0 h-full w-[78%] max-w-[300px] bg-white shadow-2xl flex flex-col ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="ns-logo-mark w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-indigo-500/20">
                <img src={logoimg} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-[15px] font-extrabold text-slate-800 tracking-tight">
                Shahid Cadet<span className="text-[#4F6EF7]"> Academy</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.15em] px-3 mb-2">
              Navigation
            </p>
            <ul className="space-y-0.5" onClick={() => setMobileOpen(false)}>
              {navLinks}
            </ul>
          </nav>

          {/* Bottom user section */}
          {user ? (
            <div className="p-4 border-t border-slate-100 bg-slate-50/60 space-y-3  ">
              <div className="flex items-center gap-3">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || "https://i.pravatar.cc/150"}
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                  alt="Profile"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                >
                  <LayoutDashboard size={13} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <LogIn size={14} />
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-white bg-[#4F6EF7] hover:bg-[#3D5CE8] rounded-xl shadow-md shadow-indigo-500/20 transition-colors"
              >
                <UserPen size={14} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;