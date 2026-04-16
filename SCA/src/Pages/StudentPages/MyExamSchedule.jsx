import React, { useState } from "react";
import useStudent from "../../Hooks/useStudent";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DownloadExamRoutine from "../../components/UI/DownloadExamRoutine";
import { BookOpen, Calendar, Clock, Edit, Trash, X } from "lucide-react";

const MyExamSchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { student, studentLoading } = useStudent(); // Destructuring for cleaner code
  const [selectedExam, setSelectedExam] = useState(null);

  const { data: myExamSchedule, isLoading: isQueryLoading } = useQuery({
    // Include the department in the key so it refetches if the student changes
    queryKey: ['exam-schedule', student?.class_name],
    enabled: !!student?.class_name,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/exam-routine?className=${student?.class_name}`,
      );
      return res.data;
    },
  });

  // Handle Loading States
  if (studentLoading || isQueryLoading) {
    return (
      <div className="text-center p-10 text-emerald-500">
        Loading Schedule...
      </div>
    );
  }

  
  // Handle Empty States
  if (!myExamSchedule || myExamSchedule.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-[#0b1120] border border-blue-900/20 rounded-[2.5rem] shadow-2xl shadow-blue-950/10 transition-all">
        {/* Icon with Glowing Effect */}
        <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-6 shadow-inner relative group">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Calendar
            className="text-blue-500 relative z-10"
            size={40}
            strokeWidth={1.5}
          />
        </div>

        {/* Main Text */}
        <h3 className="text-2xl font-black text-white tracking-tight mb-3 italic">
          Exam Schedule <span className="text-blue-500">Not Found</span>
        </h3>

        {/* Description Text */}
        <p className="text-slate-500 text-sm max-w-xs text-center leading-relaxed">
          Currently, no exam schedule has been published for your class. Please
          check back later or contact the admin.
        </p>

        {/* Optional: Simple Glow Divider */}
        <div className="mt-8 w-16 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Professional Heading Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center lg:text-left">
        {/* Top Badge / Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
            Academic Records
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          My Exam <span className="text-emerald-500">Schedule</span>
        </h1>

        {/* Subheading / Description */}
        <p className="text-slate-400 text-lg max-w-2xl">
          View your upcoming exams and download your schedule for easy
          reference. Stay organized and never miss an important exam date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {myExamSchedule.map((e, i) => (
          <div
            key={e._id || i}
            className="bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-700">
                  <BookOpen size={24} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Class -{' '}
                  <span className="text-emerald-500">{e?.class_name}</span>
                </h2>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {e.subjects?.slice(0, 2).map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-500" />
                    <span className="text-sm font-semibold text-slate-200">
                      {s.subjectName}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {s.examDate}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-5">
              <DownloadExamRoutine e={e} />
              <button
                onClick={() => setSelectedExam(e)}
                className="w-full py-3 border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-wider"
              >
                See All
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1E293B] border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Full Routine: {selectedExam.exam}
              </h2>
              <button
                onClick={() => setSelectedExam(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {selectedExam.subjects.map((s, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-slate-900 rounded-xl border border-slate-800"
                >
                  <span className="text-sm font-medium text-slate-200">
                    {s.subjectName}
                  </span>
                  <span className="text-xs font-mono text-emerald-500">
                    {s.examDate}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <DownloadExamRoutine e={selectedExam} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};;

export default MyExamSchedule;
