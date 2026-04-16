import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Calendar,
  Upload,
  Inbox,
  Loader2,
  BookOpen,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import useStudent from "../../Hooks/useStudent";

const MyAssignments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { student, studentLoading } = useStudent(); // Destructuring for cleaner code
  const [uploadingId, setUploadingId] = useState(null);
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: assignments = [], isPending } = useQuery({
    queryKey: ["my-assignments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/my-assignment?className=${student.class_name}`,
      );
      return res.data;
    },
    enabled: !!user?.email && !studentLoading && !!student?.class_name,
  });

  // upload logic
  const handleTriggerUpload = (assignmentId) => {
    setUploadingId(assignmentId);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && uploadingId) {
      console.log(`Uploading ${file.name} for assignment ${uploadingId}`);
      // Add your actual upload logic (FormData + Axios) here
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // এটিই আসল সমাধান, যাতে পুনরায় একই ফাইল সিলেক্ট করা যায়
    }
  };

  console.log(uploadingId, "my d rahat");

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 pb-20 px-6">
      <div className="max-w-6xl mx-auto pt-12">
        {/* Header Section */}
        <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="text-blue-500" size={24} />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                My <span className="text-blue-500">Assignments</span>
              </h2>
            </div>
            <p className="text-slate-400 text-base max-w-md">
              Manage your coursework, track deadlines, and submit your progress
              in one place.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Total Active
            </p>
            <p className="text-3xl font-black text-white">
              {assignments.length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-900/40 rounded-[2rem] border border-slate-800/50 backdrop-blur-sm">
            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
            <p className="text-slate-400 font-semibold text-lg animate-pulse">
              Syncing assignments...
            </p>
          </div>
        )}

        {/* Grid Layout */}
        {!isPending && assignments.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-blue-600/5 blur-[50px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/10 px-3 py-1 rounded-md">
                        {a.targetClass || "Core Module"}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-3 group-hover:text-blue-400 transition-colors">
                        {a.title}
                      </h3>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center min-w-[70px]">
                      <p className="text-[9px] text-slate-500 font-bold uppercase">
                        Marks
                      </p>
                      <p className="text-2xl font-black text-white">
                        {a.totalMarks}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-8 line-clamp-2 italic">
                    &ldquo;{a.instructions}&rdquo;
                  </p>

                  {selectedFile ? (
                    <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-between group/file animate-in fade-in slide-in-from-left-2">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {/* ফাইল আইকন ব্যাকগ্রাউন্ডসহ */}
                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                          <FileText size={18} />
                        </div>

                        <div className="overflow-hidden">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 leading-none">
                            Selected File
                          </p>
                          <p className="text-sm text-slate-200 font-medium truncate mt-1">
                            {selectedFile.name}
                          </p>
                        </div>
                      </div>

                      {/* ফাইল সাইজ বা ডিলিট বাটন (ঐচ্ছিক) */}
                      <div className="flex items-center gap-2 px-3">
                        <span className="text-[10px] font-mono text-slate-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </span>
                        <button
                          onClick={() => handleRemoveFile()}
                          className="p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded-md transition-colors text-slate-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 py-3 px-4 border-2 border-dashed border-slate-800 rounded-2xl flex items-center gap-3 text-slate-500 italic text-sm">
                      <Inbox size={16} className="opacity-50" />
                      <span>No file attached yet</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-500/10 rounded-lg">
                        <Calendar size={18} className="text-rose-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-none">
                          Deadline
                        </p>
                        <p className="text-sm font-semibold text-slate-200">
                          {a.dueDate}
                        </p>
                      </div>
                    </div>

                    {selectedFile?.id === a._id && selectedFile.file ? (
                      <button
                        // onClick={() => handlUpload(a._id)}
                        className="group/btn relative overflow-hidden flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
                      >
                        <Upload
                          size={16}
                          className="group-hover/btn:-translate-y-1 transition-transform"
                        />
                        Upload Assignment
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTriggerUpload(a._id)}
                        className="group/btn relative overflow-hidden flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
                      >
                        <Upload
                          size={16}
                          className="group-hover/btn:-translate-y-1 transition-transform"
                        />
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Empty State */}
        {!isPending && assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[3rem]">
            <div className="w-20 h-20 bg-slate-800/50 flex items-center justify-center rounded-full mb-6 border border-slate-700">
              <Inbox size={32} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Clear Skies!</h3>
            <p className="text-slate-500 max-w-xs text-center">
              No pending assignments found for your account. Enjoy your free
              time!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssignments;
