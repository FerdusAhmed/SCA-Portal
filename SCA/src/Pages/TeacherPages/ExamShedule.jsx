import React, { useState } from "react";
import { Calendar, BookOpen, Clock, X, Edit, Trash } from "lucide-react";
import AddExamShedule from "./AddExamShedule";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DownloadExamRoutine from "../../components/UI/DownloadExamRoutine";
import useRole from "../../Hooks/useRole";

const ExamShedule = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedExam, setSelectedExam] = useState(null); // Modal-এর স্টেট

  const { data: examSchedule = [], refetch } = useQuery({
    queryKey: ["exam-shedule"],
    queryFn: async () => {
      const res = await axiosSecure.get("/exam-routine");
      return res.data;
    },
  });

  const role = useRole();

  const handleDelete = (id) => {
    alert("Deleted")
    console.log(id)
  }

  const handleEdit = () => {
    alert('edited')
  }

  return (
    <>
      <div className=" md:p-10 min-h-screen space-y-8">
        {role[0] === "admin" ||
          (role[0] === "teacher" && <AddExamShedule refetch={refetch} />)}

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            Shahid Cadet Academy <span className="text-emerald-500">Exam Schedule</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium tracking-[0.2em] uppercase">
            Academic Year 2026
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {examSchedule.map((e, i) => (
            <div
              key={i}
              className="bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center justify-between w-full mb-6">
                  {/* Left Side: Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-700">
                      <BookOpen size={24} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Class -{" "} 
                      <span className="text-emerald-500">
                       {e?.class_name}
                      </span>
                    </h2>
                  </div>

                  {/* Right Side: Actions with Hover Effect */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(e)}
                      className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="p-2 text-rose-500 hover:bg-rose-950/30 rounded-lg transition-all"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* দেখাবে শুধু প্রথম ২টি সাবজেক্ট */}
              <div className="space-y-3 mb-8">
                {e.subjects.slice(0, 2).map((s, idx) => (
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
                  className="w-full py-3 border border-gray-400 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-wider"
                >
                  See All
                </button>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
};

export default ExamShedule;
