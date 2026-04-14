import React from 'react';
import { 
  Users, BookOpen, Clock, CheckCircle, 
  Calendar as CalendarIcon, MessageSquare, 
  FileText, ArrowUpRight, GraduationCap,
  Bell, LayoutGrid, Award, PenTool
} from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const axiosSecure=useAxiosSecure()
  // console.log(user) // Debugging: Check if user data is available

  const { data:counter } = useQuery({
    queryKey: ['counter'],
    queryFn: async () => {
      const res = await axiosSecure.get('/counter')
      return res.data
    }
  })
 console.log(counter)
  return (
    <div className="min-h-screen  text-slate-300 p-4 md:p-10 font-sans">
      {/* --- TOP NAVIGATION / HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            Teacher's <span className="text-blue-500">Workspace</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Shahid Cadet Academy | Academic Year 2026
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-white leading-tight">
              {user?.displayName || 'Emon Hasan'}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">
              Assistant Teacher (ICT)
            </p>
          </div>
        </div>
      </header>

      {/* --- SCHOOL STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Students"
          value={counter?.totalStudents}
          trend="Assigned to you"
          icon={<Users className="text-blue-400" />}
        />
        <StatCard
          label="Total Periods"
          value={counter?.totalRoutine}
          trend="Per Week"
          icon={<Clock className="text-indigo-400" />}
        />
        <StatCard
          label="Avg. Attendance"
          value="92%"
          trend="This Month"
          icon={<Award className="text-emerald-400" />}
        />
        <StatCard
          label="Scripts to Grade"
          value="34"
          trend="Final Term"
          icon={<PenTool className="text-amber-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* --- CLASS ROUTINE (Main Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end px-2">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <LayoutGrid size={24} className="text-blue-500" /> Today's
                Routine
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Thursday, April 02, 2026
              </p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 border-b border-blue-500/30 pb-1 hover:text-blue-300 transition-all">
              Full Timetable
            </button>
          </div>

          <div className="space-y-4">
            <ScheduleCard
              subject="ICT & Programming"
              time="09:00 AM - 09:45 AM"
              room="Computer Lab"
              batch="Class 10 - Science"
              status="Finished"
            />
            <ScheduleCard
              subject="Mathematics (Higher)"
              time="10:30 AM - 11:15 AM"
              room="Room 402"
              batch="Class 09 - Science"
              status="Ongoing"
            />
            <ScheduleCard
              subject="Physics Practical"
              time="01:00 PM - 02:00 PM"
              room="Science Lab"
              batch="Class 10 - Science"
              status="Upcoming"
            />
          </div>
        </div>

        {/* --- SIDEBAR: EXAM & NOTICES --- */}
        <div className="space-y-8">
          {/* Result Progress */}
          <section className="bg-[#0F172A] border border-blue-500/10 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
            <h4 className="font-black text-blue-400 mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
              <FileText size={16} /> Exam Grading Status
            </h4>

            <div className="space-y-6 relative z-10">
              <GradingItem
                title="ICT Class Test"
                due="Completed"
                count="40/40"
                progress="100"
                color="text-emerald-400"
              />
              <GradingItem
                title="Math Mid-Term"
                due="3 Days left"
                count="15/45"
                progress="35"
                color="text-blue-400"
              />
              <GradingItem
                title="Physics Viva"
                due="Next Week"
                count="0/42"
                progress="0"
                color="text-slate-500"
              />
            </div>
          </section>

          {/* School Notices */}
          <section className="bg-[#0F172A] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black text-white text-sm uppercase tracking-widest">
                School Notice
              </h4>
              <MessageSquare size={18} className="text-slate-600" />
            </div>
            <div className="space-y-5">
              <ActivityItem
                text="Staff meeting at Principal's office"
                time="03:30 PM"
                important
              />
              <ActivityItem
                text="Submit final marksheet of Class 9"
                time="Sat, 04 Apr"
                important={false}
              />
              <ActivityItem
                text="Annual Sports Day preparation"
                time="Next Week"
                important={false}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- Modern Sub-Components ---

const StatCard = ({ label, value, trend, icon }) => (
  <div className="bg-[#0F172A] p-8 rounded-[2.5rem] border border-slate-800/50 flex items-center justify-between group hover:border-blue-500/40 transition-all duration-500 shadow-lg">
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <h2 className="text-4xl font-black text-white tracking-tighter">{value}</h2>
      <p className="text-[10px] text-blue-400 font-bold mt-2 italic">{trend}</p>
    </div>
    <div className="p-4 bg-slate-800/50 rounded-3xl group-hover:bg-blue-600/10 group-hover:scale-110 transition-all duration-500">
      {React.cloneElement(icon, { size: 28 })}
    </div>
  </div>
);

const ScheduleCard = ({ subject, time, room, batch, status }) => (
  <div className="bg-[#0F172A] p-6 rounded-4xl border border-slate-800/50 flex items-center justify-between hover:bg-blue-600/3 hover:border-blue-500/20 transition-all cursor-pointer group">
    <div className="flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
        status === 'Ongoing' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
        status === 'Finished' ? 'bg-slate-800/30 text-slate-600' : 'bg-slate-800 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-500'
      }`}>
        {status === 'Ongoing' ? <Clock size={24} className="animate-pulse" /> : <ArrowUpRight size={24} />}
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h4 className={`font-black text-lg tracking-tight ${status === 'Finished' ? 'text-slate-600 line-through' : 'text-white'}`}>{subject}</h4>
          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
            status === 'Ongoing' ? 'bg-emerald-500/20 text-emerald-500' : 
            status === 'Finished' ? 'bg-slate-800 text-slate-600' : 'bg-slate-800 text-slate-500'
          }`}>{status}</span>
        </div>
        <div className="flex items-center gap-4 mt-1.5">
          <span className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold italic">
            <Clock size={12} className="text-blue-500"/> {time}
          </span>
          <span className="text-slate-700 text-[11px] font-black">•</span>
          <span className="text-slate-500 text-[11px] font-black uppercase tracking-wider">{room}</span>
        </div>
      </div>
    </div>
    <div className="text-right hidden sm:block">
      <p className={`text-xs font-black uppercase tracking-widest ${status === 'Finished' ? 'text-slate-700' : 'text-blue-400'}`}>{batch}</p>
      <p className="text-[9px] text-slate-600 font-bold mt-1 uppercase italic">Target Batch</p>
    </div>
  </div>
);

const GradingItem = ({ title, due, count, progress, color }) => (
  <div className="group cursor-pointer">
    <div className="flex justify-between items-center mb-2">
      <div className="space-y-0.5">
        <p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</p>
        <p className={`text-[10px] font-bold uppercase tracking-tighter ${color}`}>{due}</p>
      </div>
      <p className="text-xs font-black text-white">{count}</p>
    </div>
    <div className="w-full h-1 bg-slate-800 rounded-full">
      <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const ActivityItem = ({ text, time, important }) => (
  <div className="flex justify-between items-start gap-4 p-2 rounded-xl hover:bg-slate-800/30 transition-all">
    <div className="flex gap-3">
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${important ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-slate-700'}`}></div>
      <p className={`text-xs leading-tight font-medium ${important ? 'text-slate-200' : 'text-slate-500'}`}>{text}</p>
    </div>
    <span className="text-[10px] font-black text-slate-700 whitespace-nowrap italic">{time}</span>
  </div>
);

export default TeacherDashboard;