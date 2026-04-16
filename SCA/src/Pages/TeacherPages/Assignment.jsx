import React from "react";
import { useForm } from "react-hook-form";
import { BookOpen, Calendar, Edit3, Eye, Trash2, Users } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Assignment = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assignments = [], refetch: assignmentFetch } = useQuery({
    queryKey: ["assignments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/assignments");
      return res.data;
    },
  });

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // form submission handler
  const onSubmit = async (data) => {
    try {
      // Adding a creation timestamp
      const assignmentData = {
        ...data,
        createdAt: new Date().toISOString(),
        email: user.email,
      };

      const res = await axiosSecure.post("/assignments", assignmentData);

      if (res.data?.insertedId || res.status === 200) {
        if (refetch) refetch();
        assignmentFetch();
        reset();

        Swal.fire({
          icon: "success",
          title: "Assignment Posted!",
          text: `Task assigned to ${data.targetClass}`,
          background: "#1E293B",
          color: "#fff",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error("Assignment Error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Post",
        text: err.response?.data?.message || "Something went wrong",
        background: "#1E293B",
        color: "#fff",
      });
    }
  };

  // edit and delete

  const handleDelete = () => {
    toast.success("Deleted!");
  };
  const handleEdit = () => {
    toast.success("Edited!");
  };

  return (
    <>
      <aside className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl  top-10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-500" /> Create Assignment
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Assignment Title */}
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Assignment Title (e.g. Math Chapter 1)"
              className={`w-full bg-slate-900 border ${errors.title ? "border-rose-500" : "border-slate-800"} rounded-xl p-3 text-sm outline-none focus:border-emerald-500 text-slate-200`}
            />
            {errors.title && (
              <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <textarea
              {...register("instructions", {
                required: "Instructions are required",
              })}
              placeholder="Write assignment instructions..."
              rows="4"
              className={`w-full bg-slate-900 border ${errors.instructions ? "border-rose-500" : "border-slate-800"} rounded-xl p-3 text-sm outline-none focus:border-emerald-500 text-slate-200 resize-none`}
            ></textarea>
            {errors.instructions && (
              <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
                {errors.instructions.message}
              </p>
            )}
          </div>

          {/* Target Class Selection */}
          <div className="relative">
            <select
              {...register("targetClass", {
                required: "Please select a class",
              })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-400 outline-none appearance-none focus:border-emerald-500"
            >
              <option value="">Select Target Class</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
            {errors.targetClass && (
              <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
                {errors.targetClass.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Marks/Weightage */}
            <input
              type="number"
              {...register("totalMarks", { required: true })}
              placeholder="Total Marks"
              className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
            />

            {/* Due Date */}
            <div className="relative">
              <input
                type="date"
                {...register("dueDate", { required: "Deadline is required" })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] text-slate-400 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Assign to Students
          </button>
        </form>
      </aside>

      {/* my assimnement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="bg-[#1E293B] border border-slate-800 p-6 rounded-[1.5rem] shadow-xl hover:border-emerald-500/30 transition-all group"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {a.title}
                </h4>
                <span className="inline-block bg-slate-900 text-emerald-500 text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 mt-1 uppercase font-bold tracking-wider">
                  Class - {a.targetClass}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter leading-none">
                  Marks
                </p>
                <p className="text-emerald-500 font-black text-xl">
                  {a.totalMarks}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-slate-400 text-sm mb-6 line-clamp-2 italic h-10">
              "{a.instructions}"
            </p>

            {/* Footer & Actions */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-800/50">
              <div className="flex items-center justify-between">
                {/* Due Date Info */}
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={14} className="text-rose-500" />
                  <div>
                    <p className="text-[9px] uppercase leading-none">
                      Due Date
                    </p>
                    <p className="text-xs font-semibold text-slate-300">
                      {a.dueDate}
                    </p>
                  </div>
                </div>

                {/* View Submissions Button */}
                <button className="flex items-center gap-1.5 bg-slate-900 hover:bg-emerald-600 text-white py-1.5 px-3 rounded-lg transition-all border border-slate-700 hover:border-emerald-500 group/btn">
                  <Eye size={14} />
                  <span className="text-[10px] font-bold uppercase">
                    Submissions
                  </span>
                </button>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(a)} // আপনার এডিট ফাংশন
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800/50 hover:bg-blue-600/20 text-blue-400 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all text-[10px] font-bold uppercase"
                >
                  <Edit3 size={14} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(a._id)} // আপনার ডিলিট ফাংশন
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800/50 hover:bg-rose-600/20 text-rose-400 border border-slate-700 hover:border-rose-500/50 rounded-xl transition-all text-[10px] font-bold uppercase"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Assignment;
