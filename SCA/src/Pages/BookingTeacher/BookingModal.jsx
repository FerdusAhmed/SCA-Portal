import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Calendar, Clock, MessageSquare, Send, ChevronDown } from "lucide-react";

const BookingModal = ({ teacher, id }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const bookingInfo = {
      teacherId: teacher._id,       // ডাটাবেজের আইডি
      teacherName: teacher.name,
      teacherEmail: teacher.email,  // ফিল্টার করার জন্য ইমেইল জরুরি
      studentEmail: user?.email,
      studentName: user?.displayName || "Anonymous Student",
      studentImage: user?.photoURL || "https://i.ibb.co/L6v6pPx/user-placeholder.png",
      date: data.date,              // YYYY-MM-DD
      slot: data.time,              // আপনার ডাটাবেজ অনুযায়ী 'slot'
      agenda: data.reason,          // আপনার ব্যাকএন্ড অনুযায়ী 'agenda'
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);
      if (res.data.success) {
        toast.success(res.data.message);
        document.getElementById(id).close();
        reset();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!");
    }
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white rounded-4xl p-8 max-w-lg shadow-2xl">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <Calendar className="text-primary" /> Book a Slot
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Date */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Date</label>
            <input
              {...register("date", { required: "Required" })}
              type="date"
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-primary"
            />
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Available Slots</label>
            <div className="relative">
              <select
                {...register("time", { required: "Pick a slot" })}
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none appearance-none focus:border-primary cursor-pointer"
              >
                <option value="">Select a time</option>
                {teacher?.availableSlots?.map((slot, i) => (
                  <option key={i} value={slot}>{slot}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-4 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Agenda</label>
            <textarea
              {...register("reason", { required: "Add an agenda" })}
              placeholder="Topic of discussion..."
              className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none min-h-20 focus:border-primary"
            />
          </div>

          <div className="modal-action flex gap-2">
            <button type="button" onClick={() => document.getElementById(id).close()} className="btn btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn btn-primary flex-1 text-white">Send Request</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;