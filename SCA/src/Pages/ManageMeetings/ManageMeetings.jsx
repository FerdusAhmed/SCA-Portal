import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { CheckCircle, XCircle, Clock, Calendar, MessageSquare, User } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageMeetings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/bookings/teacher/${user.email}`)
        .then(res => {
          setMeetings(res.data);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Meeting ${newStatus} successfully!`);
        // লোকাল স্টেট আপডেট করা যাতে পেজ রিফ্রেশ না লাগে
        setMeetings(meetings.map(m => m._id === id ? { ...m, status: newStatus } : m));
      }
    } catch (err) {
      toast.error("Action failed", err.response?.data?.message || "");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-primary animate-pulse">Loading Meetings...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Manage <span className="text-primary">Meetings</span></h1>
        <p className="text-slate-500 font-medium mt-1">Review and manage your appointments with students.</p>
      </div>

      {meetings.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-4xl p-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No meeting requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <div key={meeting._id} className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              
              {/* Status Badge */}
              <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                meeting.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 
                meeting.status === 'rejected' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {meeting.status}
              </div>

              <div className="flex items-center gap-4 mb-6">
                 <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                    <img src={meeting.studentImage} alt={meeting.studentName} className="h-full w-full object-cover rounded-2xl" />
                 </div>
                 <div>
                    <h3 className="font-black text-slate-800 leading-tight">{meeting.studentName}</h3>
                    <p className="text-xs text-slate-400 font-bold">{meeting.studentEmail}</p>
                 </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-600 text-sm font-semibold">
                  <Calendar size={16} className="text-primary" /> {meeting.date}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm font-semibold">
                  <Clock size={16} className="text-primary" /> {meeting.slot}
                </div>
                <div className="flex gap-3 text-slate-500 text-sm italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <MessageSquare size={16} className="shrink-0 text-slate-400" />
                  "{meeting.agenda}"
                </div>
              </div>

              {/* Action Buttons */}
              {meeting.status === 'pending' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleStatusUpdate(meeting._id, 'approved')}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(meeting._id, 'rejected')}
                    className="flex-1 py-3 bg-white border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMeetings;