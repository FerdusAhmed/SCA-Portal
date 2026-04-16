import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Shield, Mail, Phone, MapPin, GraduationCap,
  Edit3, Camera, Save, Clock, X, Loader2, User,
  Award, Bookmark, Calendar, Users
} from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthContext/AuthContext';

const TeacherProfile = ({ dbUser, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: dbUser?.name,
      phone: dbUser?.phone,
      address: dbUser?.address,
      department: dbUser?.department
    }
  });

  const slots = [
    "09:00 AM - 09:15 AM", "10:00 AM - 10:15 AM", "11:00 AM - 11:15 AM",
    "12:00 PM - 12:15 PM", "02:00 PM - 02:15 PM", "03:00 PM - 03:15 PM",
    "04:00 PM - 04:15 PM"
  ];

  const toggleSlot = async (slot) => {
    const currentSlots = dbUser?.availableSlots || [];
    const newSlots = currentSlots.includes(slot)
      ? currentSlots.filter(s => s !== slot)
      : [...currentSlots, slot];

    try {
      await axiosSecure.patch(`/users/${dbUser.email}`, { availableSlots: newSlots });
      refetch();
    } catch (err) {
      console.error("Slot update failed", err);
    }
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const res = await axiosSecure.patch(`/users/${dbUser?.email}`, data);
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await refetch();
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile Synchronized",
          text: "Professional details updated.",
          background: '#1E293B',
          color: '#fff',
          confirmButtonColor: '#10B981',
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-1000">
      
      {/* ─── HEADER HERO SECTION ─── */}
      <div className="relative mt-6 sm:mt-10">
        {/* Cover Image */}
        <div className="h-48 sm:h-64 w-full bg-linear-to-br from-indigo-900 via-slate-900 to-emerald-900 rounded-4xl sm:rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] to-transparent"></div>
        </div>

        {/* Profile Info Wrap */}
        <div className="absolute -bottom-20 sm:-bottom-16 left-0 right-0 px-6 sm:px-12 flex flex-col md:flex-row items-center md:items-end gap-4 sm:gap-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500 rounded-4xl sm:rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img
              src={user?.photoURL || "https://i.pravatar.cc/150?img=11"}
              className="w-32 h-32 sm:w-44 sm:h-44 rounded-4xl sm:rounded-[2.5rem] border-4 sm:border-8 border-[#0F172A] object-cover shadow-2xl relative z-10"
              alt="Profile"
            />
            <button className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 p-2 sm:p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[#0F172A] text-white shadow-lg transition-transform active:scale-90">
              <Camera size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

          {/* User Meta */}
          <div className="pb-0 md:pb-6 z-10 text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{dbUser?.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-2 sm:mt-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                Teacher
              </span>
              <span className="text-slate-400 text-xs sm:text-sm font-bold flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <MapPin size={12} className="text-indigo-400" /> {dbUser?.address || 'Not Provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button - Hidden on very small mobile to prevent clutter, or moved */}
        <button
          onClick={() => setModalOpen(true)}
          className="absolute -bottom-32 md:-bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-12 flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-slate-900 hover:bg-indigo-50 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 z-20"
        >
          <Edit3 size={14} className="sm:w-4 sm:h-4" /> Edit Profile
        </button>
      </div>

      {/* ─── MAIN CONTENT GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mt-40 md:mt-32">
        
        {/* Left Column: Details (Main Info) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-10 order-2 lg:order-1">
          
          {/* Availability Control */}
          <section className="bg-slate-900/40 border border-slate-800/60 p-6 sm:p-10 rounded-4xl sm:rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden">
            <h3 className="text-lg sm:text-xl font-black mb-6 sm:mb-8 text-white flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Clock size={18}/></div>
              Consultation Hours
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {slots.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSlot(s)}
                  className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black transition-all border ${
                    dbUser?.availableSlots?.includes(s)
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {s}
                    {dbUser?.availableSlots?.includes(s) && <Bookmark size={12} className="fill-white" />}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Identity & Dept */}
          <section className="bg-slate-900/40 border border-slate-800/60 p-6 sm:p-10 rounded-4xl sm:rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-black mb-6 sm:mb-8 text-white flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Shield size={18}/></div>
             Teacher Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <InfoBox label="Full Name" value={dbUser?.name} icon={<User size={14} />} color="indigo" />
              <InfoBox label="Academic Email" value={dbUser?.email} icon={<Mail size={14} />} color="emerald" />
              <InfoBox label="Department" value={dbUser?.department} icon={<GraduationCap size={14} />} color="orange" />
              <InfoBox label="Contact" value={dbUser?.phone} icon={<Phone size={14} />} color="rose" />
            </div>
          </section>
        </div>

        {/* Right Column: Statistics */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8 order-1 lg:order-2">
          <div className="bg-linear-to-b from-slate-900 to-[#0F172A] p-6 sm:p-10 rounded-4xl sm:rounded-[2.5rem] border border-slate-800">
            <h4 className="font-black text-slate-500 mb-6 uppercase text-[9px] tracking-[0.2em] flex items-center gap-2">
              <Award size={14} /> Academic Performance
            </h4>
            <div className="space-y-4 sm:space-y-6">
              <StatCard label="Active Batches" value="08" icon={<Users size={14}/>} />
              <StatCard label="Pending Tasks" value="14" icon={<Clock size={14}/>} />
              <StatCard label="Total Lectures" value="156" icon={<Calendar size={14}/>} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL (Responsive Overhaul) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/90 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 sm:p-10 border-b border-white/5 flex justify-between items-center bg-white/2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Modify Profile</h2>
                <p className="hidden sm:block text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Updates reflect across SCA Network</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 sm:p-4 hover:bg-white/5 rounded-xl sm:rounded-2xl text-slate-400 transition-colors">
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Form Scrollable Area */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className={`w-full bg-slate-950 border ${errors.name ? 'border-rose-500' : 'border-white/10'} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white focus:border-indigo-500 outline-none text-xs sm:text-sm font-bold transition-all`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Phone Number</label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white focus:border-indigo-500 outline-none text-xs sm:text-sm font-bold"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Office Address</label>
                  <div className="relative">
                    <input
                      {...register("address")}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 pl-12 sm:pl-14 text-white focus:border-indigo-500 outline-none text-xs sm:text-sm font-bold"
                    />
                    <MapPin size={16} className="absolute left-4 sm:left-5 top-4 sm:top-5 text-slate-600" />
                  </div>
                </div>
              </div>

              <button
                disabled={isUpdating}
                type="submit"
                className="w-full py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-3 transition-all mt-4 shadow-xl shadow-indigo-500/20"
              >
                {isUpdating ? <><Loader2 size={16} className="animate-spin" /> Syncing...</> : <><Save size={16} /> Deploy Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Small Components
const InfoBox = ({ label, value, icon, color }) => {
  const colors = {
    indigo: 'text-indigo-400 bg-indigo-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
    rose: 'text-rose-400 bg-rose-500/10',
  };
  return (
    <div className="group">
      <p className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2 mb-2 sm:mb-3 tracking-widest">
        <span className={`p-1 sm:p-1.5 rounded-md ${colors[color]}`}>{icon}</span> {label}
      </p>
      <div className="text-white font-bold text-xs sm:text-sm bg-slate-950/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
        {value || "Not Set"}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="flex justify-between items-center bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5">
    <div className="flex items-center gap-2 sm:gap-3">
       <div className="p-1.5 sm:p-2 bg-white/5 rounded-lg text-slate-400">{icon}</div>
       <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
    <span className="text-lg sm:text-xl font-black text-white">{value}</span>
  </div>
);

export default TeacherProfile;