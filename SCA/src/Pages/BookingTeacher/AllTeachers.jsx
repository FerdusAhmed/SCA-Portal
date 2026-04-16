import React, { useEffect, useState } from 'react';
import { Search, GraduationCap, CalendarCheck, Mail, MapPin, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import BookingModal from './BookingModal';

const AllTeachers = () => {
  const axiosSecure = useAxiosSecure();
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // শুরুতে loading true রাখলে useEffect-এর ভেতর setLoading(true) কল করার দরকার পড়ে না
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // মাউন্ট হওয়ার সময় একবারই কল হবে
    let isMounted = true; 

    const fetchTeachers = async () => {
      try {
        // রিকোয়েস্ট পাঠানোর আগে setLoading কল করার বদলে ইনিশিয়াল স্টেট ব্যবহার করা ভালো
        const res = await axiosSecure.get('/users/teachers/all');
        if (isMounted) {
          setTeachers(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
        if (isMounted) setLoading(false);
      }
    };

    fetchTeachers();

    return () => { isMounted = false; }; // Cleanup function
  }, [axiosSecure]);

  // ২. সার্চ লজিক
  const filteredTeachers = teachers.filter(t =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="font-black text-slate-800 uppercase tracking-widest animate-pulse">Loading Faculty...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Meet Our <span className="text-blue-600 italic">Teachers</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Find and book a meeting with your department experts.
          </p>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full pl-12 pr-4 py-4 rounded-3xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all shadow-sm bg-white font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTeachers.map((teacher) => (
          <div key={teacher._id} className="bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all duration-500"></div>

            {/* Profile Image */}
            <div className="relative mb-6 inline-block">
              <div className="w-28 h-28 rounded-4xl overflow-hidden ring-8 ring-slate-50 shadow-inner">
                <img
                  src={teacher.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.email}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={teacher.name}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2.5 rounded-2xl shadow-lg border-4 border-white">
                <GraduationCap className="text-white" size={18} />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                  {teacher.name}
                </h3>
                <span className="mt-2 text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg inline-block uppercase tracking-[0.15em]">
                  {teacher.department || "General Faculty"}
                </span>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <div className="p-1.5 bg-slate-50 rounded-lg"><Mail size={14} /></div>
                  <span className="truncate font-medium">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <div className="p-1.5 bg-slate-50 rounded-lg"><MapPin size={14} /></div>
                  <span className="font-medium">{teacher.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => document.getElementById(`booking_modal_${teacher._id}`).showModal()}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-600/30 transition-all active:scale-95"
              >
                <CalendarCheck size={18} /> Book Meeting
              </button>
            </div>
            <BookingModal teacher={teacher} id={`booking_modal_${teacher._id}`} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-black text-xl uppercase tracking-widest">No Teachers Found</p>
        </div>
      )}
    </div>
  );
};

export default AllTeachers;