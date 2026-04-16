import React, { useContext, useState } from 'react';
import {
  Shield, Users, Settings,
  Activity, Bell, UserPlus, Database,
  Edit3, Camera, X, Save, Loader2, Mail, Phone, MapPin,
  BookOpen, BarChart2, PlusCircle, Eye, Tag, DollarSign,
  FileText, MessageSquare, Clipboard, CreditCard, Percent,
  TrendingUp, Sliders, Lock, Cpu, Trash2
} from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const colorMap = {
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  teal:   { bg: "bg-teal-500/10",   text: "text-teal-400",   border: "border-teal-500/20" },
  amber:  { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/20" },
  coral:  { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20" },
  green:  { bg: "bg-emerald-500/10",text: "text-emerald-400",border: "border-emerald-500/20" },
};

const AdminProfile = ({ dbUser, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
          position: "top-end",
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
          background: '#0F172A',
          color: '#FBBF24',
          customClass: { popup: 'border border-slate-700 rounded-3xl' }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* ── Header Section ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] border border-slate-700 p-8 md:p-10 mb-8 shadow-2xl">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/150?img=12"}
                className="w-32 h-32 rounded-3xl border-4 border-slate-800 object-cover shadow-2xl ring-1 ring-slate-700 transition-transform duration-500 group-hover:scale-105"
                alt="Admin"
              />
              <div className="absolute -bottom-2 -right-2 p-2.5 bg-amber-500 rounded-2xl shadow-lg border-4 border-slate-900">
                <Camera size={16} className="text-slate-950" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-black text-slate-50 tracking-tight">
                {dbUser?.name || user?.displayName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest opacity-80">Admin</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 px-5 py-4 bg-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-amber-400 shadow-[0_10px_20px_-10px_rgba(245,158,11,0.5)] active:scale-95"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* ── Main Content Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Identity Details */}
        <div className="lg:col-span-8 space-y-4">
          <section className="bg-slate-900 rounded-4xl border border-slate-700 p-10 shadow-xl">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-amber-500" /> Account Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={<Mail />} label="Admin Email" value={dbUser?.email || user?.email} isEmail={true} />
              <InfoCard icon={<Phone />} label="Primary Phone" value={dbUser?.phone || "Not Provided"} />
              <InfoCard icon={<MapPin />} label="Admin Location" value={dbUser?.address || "Not Provided"} />
            </div>
          </section>
        </div>

        {/* Actions Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-4xl border border-slate-700 p-5 shadow-xl h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-5">System Commands</h3>
            <div className="space-y-3">
              <ActionBtn icon={<UserPlus />} label="Add Teacher" />
              <ActionBtn icon={<Bell />} label="Send Notice" />
              <ActionBtn icon={<Database />} label="DB Backup" />
              <ActionBtn icon={<Settings />} label="Settings" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Admin Capabilities ──────────────────────────────────── */}
      <div className="mt-5">
        <section className="bg-slate-900 rounded-4xl border border-slate-700 p-10 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-amber-500" /> Admin Capabilities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <CapabilityCard
              icon={<Users />}
              title="User Management"
              color="purple"
              items={[
                { icon: <UserPlus size={12} />, text: "Add new teacher accounts" },
                { icon: <Users size={12} />, text: "View & edit student profiles" },
                { icon: <Trash2 size={12} />, text: "Remove any user account", danger: true },
                { icon: <Shield size={12} />, text: "Assign & change user roles" },
              ]}
            />
            <CapabilityCard
              icon={<BookOpen />}
              title="Course Management"
              color="teal"
              items={[
                { icon: <PlusCircle size={12} />, text: "Create & publish new courses" },
                { icon: <Edit3 size={12} />, text: "Edit & update course content" },
                { icon: <Eye size={12} />, text: "Approve & manage enrollments" },
                { icon: <Tag size={12} />, text: "Manage categories & tags" },
              ]}
            />
            <CapabilityCard
              icon={<BarChart2 />}
              title="Analytics & Reports"
              color="amber"
              items={[
                { icon: <Users size={12} />, text: "View total student & teacher count" },
                { icon: <DollarSign size={12} />, text: "Revenue & payment reports" },
                { icon: <Activity size={12} />, text: "Monitor course performance" },
                { icon: <FileText size={12} />, text: "Export reports (CSV / PDF)" },
              ]}
            />
            <CapabilityCard
              icon={<Bell />}
              title="Notice & Communication"
              color="coral"
              items={[
                { icon: <Mail size={12} />, text: "Send email notices to all users" },
                { icon: <Bell size={12} />, text: "Post platform-wide announcements" },
                { icon: <MessageSquare size={12} />, text: "View & reply to support tickets" },
                { icon: <Clipboard size={12} />, text: "Create noticeboard posts" },
              ]}
            />
            <CapabilityCard
              icon={<CreditCard />}
              title="Payment & Finance"
              color="green"
              items={[
                { icon: <CreditCard size={12} />, text: "View all payment transactions" },
                { icon: <Percent size={12} />, text: "Create coupons & discounts" },
                { icon: <TrendingUp size={12} />, text: "Manage teacher salaries" },
                { icon: <FileText size={12} />, text: "Generate invoices" },
              ]}
            />
            <CapabilityCard
              icon={<Settings />}
              title="System Settings"
              color="purple"
              items={[
                { icon: <Sliders size={12} />, text: "Modify site configuration" },
                { icon: <Database size={12} />, text: "Take database backups" },
                { icon: <Lock size={12} />, text: "Security & access control" },
                { icon: <Cpu size={12} />, text: "Manage API keys & integrations" },
              ]}
            />
          </div>
        </section>
      </div>

      {/* ── Update Modal ────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-slate-700 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-10 pb-0 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-50">Modify Account</h2>
              <button onClick={() => setModalOpen(false)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-10 space-y-6">
              <InputGroup label="Full Name" name="name" defaultValue={dbUser?.name || user?.displayName} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Phone" name="phone" defaultValue={dbUser?.phone || ""} />
                <InputGroup label="Address" name="address" defaultValue={dbUser?.address || ""} />
              </div>

              <button
                disabled={isUpdating}
                className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
              >
                {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── UI Elements ─────────────────────────────────────────────── */

const InfoCard = ({ icon, label, value, isEmail }) => (
  <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700 hover:border-amber-500/50 transition-all group overflow-hidden">
    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 text-amber-500 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className={`font-black text-slate-100 ${isEmail ? 'text-[13px] break-all leading-relaxed' : 'text-base'}`}>
      {value}
    </p>
  </div>
);

const ActionBtn = ({ icon, label }) => (
  <button className="w-full flex items-center gap-4 p-4 bg-slate-800/40 border border-slate-700 rounded-2xl text-slate-100 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-slate-700 hover:border-amber-500/30 active:scale-95 group">
    <span className="text-amber-500 group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 18 })}</span>
    {label}
  </button>
);

const InputGroup = ({ label, name, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input
      name={name}
      defaultValue={defaultValue}
      className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-5 text-slate-50 focus:border-amber-500 outline-none transition-all font-black text-sm"
    />
  </div>
);

const CapabilityCard = ({ icon, title, color, items }) => {
  const c = colorMap[color] || colorMap.purple;
  return (
    <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700 hover:border-amber-500/30 transition-all group">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}>
          {React.cloneElement(icon, { size: 18 })}
        </div>
        <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900/60 text-[12px] font-semibold ${item.danger ? "text-red-400" : "text-slate-400"}`}
          >
            <span className={item.danger ? "text-red-500" : c.text}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProfile;