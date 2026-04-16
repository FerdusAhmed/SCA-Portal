import React, { useContext, useState } from 'react';
import { 
  Mail, Shield, MapPin, Edit3, Camera, 
  GraduationCap, X, Save, Phone, User, Loader2, Award, Calendar, CheckCircle,
 
} from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useRole from '../../Hooks/useRole';
import Swal from 'sweetalert2';
import FeedbackModal from './FeedbackModal';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const UserProfile = ({ dbUser, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);

  const { data: feedbacks = [] } = useQuery({
    queryKey: ['feedback', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student/feedback?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const userImg = user?.photoURL || "https://i.pravatar.cc/150?img=11";

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
    };

    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await refetch();
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          background: '#1e293b',
          color: '#cbd5e1',
          confirmButtonColor: '#475569',
        });
      }
    } catch (err) { console.error(err); } 
    finally { setIsUpdating(false); }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 text-slate-300">
      
      {/* ─── SOFT HERO SECTION ─── */}
      <div className="relative mt-10">
        <div className="h-48 sm:h-60 w-full bg-slate-900 rounded-[2.5rem] border border-slate-800 relative overflow-hidden shadow-inner">
          {/* Subtle noise pattern for texture without glare */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent"></div>
        </div>

        <div className="absolute -bottom-16 left-0 right-0 px-8 flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <img
              src={userImg}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-4xl border-[6px] border-[#0f172a] object-cover shadow-xl"
              alt="Profile"
            />
            <button className="absolute bottom-2 right-2 p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border-2 border-slate-950 text-slate-400 shadow-lg transition-all">
              <Camera size={16} />
            </button>
          </div>

          <div className="pb-4 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              {dbUser?.name || user?.displayName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-slate-800 text-slate-400 border border-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-widest">
               {role}
              </span>
              <span className="text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-600" /> {dbUser?.address || 'Sylhet, BD'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="absolute -bottom-28 md:-bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg"
        >
          <Edit3 size={14} /> Update Profile
        </button>
      </div>

      {/* ─── SOFT CONTENT GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-40 md:mt-28">
        
        {/* Profile Details */}
        <div className="lg:col-span-8 space-y-8 order-2 lg:order-1 ">
          <section className="bg-slate-900/50 border border-slate-800/60 p-6 sm:p-10 rounded-[2.5rem] h-full">
            <h3 className="text-lg font-bold mb-8 text-slate-200 flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400"><User size={18}/></div>
              Personal Records
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <InfoBox label="Full Name" value={dbUser?.name} icon={<User size={14} />} />
              <InfoBox label="Official Email" value={dbUser?.email} icon={<Mail size={14} />} />
              <InfoBox label="Contact" value={dbUser?.phone} icon={<Phone size={14} />} />
              <InfoBox label="Department" value={dbUser?.department?.replace('-', ' ')} icon={<GraduationCap size={14} />} />
                      </div>
                      
                     {/* Professional Activity/Status Footer */}
<div className="mt-auto pt-10">
  <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
    
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
        <Shield size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account Security</p>
        <p className="text-xs text-slate-300 font-medium">Your profile is fully protected</p>
      </div>
    </div>

    <div className="flex items-center gap-2">
       <div className="px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
         ID: {user?.uid?.slice(0, 8).toUpperCase() || "ST-9920"}
       </div>
       <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
       <span className="text-[10px] font-bold text-slate-500 uppercase">Online</span>
    </div>

  </div>
</div>
          </section>
        </div>

        {/* Muted Stats */}
        <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
          <div className="bg-slate-900/80 p-6 sm:p-8 rounded-[2.5rem] border border-slate-800">
            <h4 className="font-bold text-slate-500 mb-6 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
              <Award size={14} /> Academic Status
            </h4>
           <div className="space-y-4">
  {/* Account Security/Status - General User-er jonno */}
  <StatCard 
    label="Account Status" 
    value={user?.emailVerified ? "Verified" : "Pending"} 
    icon={<Shield size={14} className={user?.emailVerified ? "text-emerald-500" : "text-amber-500"} />} 
  />
  


  {/* Activity Date - User kobe join koreche seta jodi dbUser-e thake */}
  <StatCard 
    label="Member Since" 
    value={dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : "Jan 2026"} 
    icon={<Calendar size={14}/>} 
  />
  
  {/* General Notification/Action Button */}
  <button
    className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-400 border border-slate-700/50 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all mt-2 flex items-center justify-center gap-2"
  >
    <Shield size={12} /> Security Settings
  </button>
</div>
                  </div>

                            {/* apply btn */}
            <div className="bg-slate-900/80 p-6 rounded-4xl border border-slate-800 shadow-xl group">
            <Link to={'/admission'}>
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] active:scale-[0.98]">
                <GraduationCap size={18} className="group-hover:rotate-12 transition-transform" />
                Enroll Now
                </button>
            </Link>
            <p className="text-[9px] text-slate-500 text-center mt-3 uppercase tracking-widest font-medium">
                Limited seats available for 2026
            </p>
            </div>
                  
              </div>
              
              
      </div>

      {/* ─── MUTED MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-200">Update Profile</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl text-slate-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-8 space-y-5">
              <InputGroup label="Full Name" name="name" defaultValue={dbUser?.name} />
              <InputGroup label="Phone" name="phone" defaultValue={dbUser?.phone} />
              <InputGroup label="Address" name="address" defaultValue={dbUser?.address} />
              
              <button
                disabled={isUpdating}
                className="w-full py-4 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-slate-200 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 mt-4"
              >
                {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isFeedback && <FeedbackModal setIsFeedback={setIsFeedback} feedbacks={feedbacks} />}
    </div>
  );
};

// Low Contrast Helper Components
const InfoBox = ({ label, value, icon }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 mb-2 tracking-widest">
      {icon} {label}
    </p>
    <div className="text-slate-300 font-medium text-sm bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
      {value || "Not Set"}
    </div>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="flex justify-between items-center bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
    <div className="flex items-center gap-3 text-slate-500">
       {icon}
       <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
    <span className="text-base font-bold text-slate-300">{value}</span>
  </div>
);

const InputGroup = ({ label, name, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 tracking-widest">{label}</label>
    <input name={name} defaultValue={defaultValue} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 focus:border-slate-600 outline-none text-sm font-medium transition-all" />
  </div>
);

export default UserProfile;