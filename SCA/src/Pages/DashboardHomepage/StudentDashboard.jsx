import React from 'react';
import { 
  BookOpen, Clock, FileText, 
  CheckCircle2, Calendar, Layout,
  ArrowRight, Bell,
  
} from 'lucide-react';
import useStudent from '../../Hooks/useStudent';
import { Link } from 'react-router';

const StudentDashboard = ({ userData }) => {
  // // ধরে নিচ্ছি userData তে class এবং section আছে
  // const studentClass = userData?.class || "10";
  // const section = userData?.section || "A";
  const { student } = useStudent();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700 ">
      {/* 1. Welcome & Class Info Card */}
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 to-blue-700 p-8 rounded-4xl text-white shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {student?.name}! 🎓
            </h2>
            <p className="text-blue-100 flex items-center gap-2">
              <Layout size={16} />
              Class {student?.class_name} | Student_Id : {student?.student_id} |
              Roll: {student?.roll}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Attendance
            </p>
            <p className="text-2xl font-black">94.8%</p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Today's Class Schedule (Main Focus) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-100">
              <Clock className="text-blue-500" size={22} /> Today's Schedule
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full uppercase">
              Feb 28, 2026
            </span>
          </div>

          <div className="space-y-4">
            <ScheduleItem
              subject="Advanced Mathematics"
              time="09:00 AM - 10:00 AM"
              room="Room 302"
              status="ongoing"
            />
            <ScheduleItem
              subject="Physics Lab"
              time="10:30 AM - 12:00 PM"
              room="Lab B"
              status="upcoming"
            />
            <ScheduleItem
              subject="English Literature"
              time="01:00 PM - 02:00 PM"
              room="Room 105"
              status="upcoming"
            />
          </div>
        </div>

        {/* 3. Academic Tasks & Notices */}
        <div className="space-y-8">
          {/* Pending Assignments */}
          <div className="bg-[#1E293B] border border-slate-700/50 p-6 rounded-4xl">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-100">
              <FileText className="text-amber-500" size={20} /> Assignments
            </h3>
            <div className="space-y-4">
              <TaskItem
                title="Calculus Homework"
                due="Due: Tomorrow"
                color="text-amber-500"
              />
              <TaskItem
                title="Physics Report"
                due="Due: Mar 05"
                color="text-blue-500"
              />
            </div>
            <Link
              to={'/dashboard/my-assignments'}
              className="w-full  mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-all flex items-center justify-center  gap-2"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Recent Class Notice */}
          {/* <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-4xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-400">
              <Bell size={20} /> Class Notice
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              "The Chemistry practical exam for Class  has been rescheduled to next Monday."
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ScheduleItem = ({ subject, time, room, status }) => (
  <div className={`p-5 rounded-3xl border transition-all ${
    status === 'ongoing' 
    ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5' 
    : 'bg-[#1E293B] border-slate-700/50 hover:border-slate-600'
  }`}>
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className={`p-3 rounded-2xl ${status === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
          <BookOpen size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-100">{subject}</h4>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <Clock size={12} /> {time} | {room}
          </p>
        </div>
      </div>
      {status === 'ongoing' && (
        <span className="px-3 py-1 bg-blue-500 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
          Live Now
        </span>
      )}
    </div>
  </div>
);

const TaskItem = ({ title, due, color }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className={`w-1.5 h-8 rounded-full bg-current ${color}`}></div>
    <div>
      <p className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{title}</p>
      <p className="text-[10px] font-bold text-slate-500 uppercase">{due}</p>
    </div>
  </div>
);

export default StudentDashboard;