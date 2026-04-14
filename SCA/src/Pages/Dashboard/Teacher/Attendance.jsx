import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Send, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!className) return;

    axios
      .get(`http://localhost:5000/students?class_name=${className}`)
      .then((res) => {
        if (res.data && res.data.result) {
          const formatted = res.data.result.map((student) => ({
            studentId: student._id,
            name: student.name,
            status: "present",
          }));
          setStudents(formatted);
        }
      })
      .catch(err => console.log("Fetch error:", err));
  }, [className]);

  const handleStatusChange = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
  };

  const handleSubmit = async () => {
    if (!className || !subject || !date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/attendance", {
        className,
        subject,
        date,
        teacherEmail: "teacher@gmail.com",
        students,
      });
      alert("Attendance Saved Successfully ✅");
    } catch (err) {
      alert("Attendance already taken ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Style Header */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          <span>Academic</span> / <span className="text-blue-500">Attendance Registry</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">Record Attendance</h1>
            <p className="text-slate-500 mt-2 text-xs md:text-sm font-medium">Digital roll call for classroom management.</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Live Session</span>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Class Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ml-1">Target Class</label>
              <div className="relative flex items-center bg-[#111827] border-2 border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-600 transition-all">
                <div className="pl-4 text-slate-500"><LayoutGrid size={18} /></div>
                <select 
                  value={className} 
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-transparent p-4 text-slate-200 outline-none appearance-none text-sm font-medium cursor-pointer"
                >
                  <option value="" className="bg-[#0F172A]">Select Class</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1}`} className="bg-[#1F2937]">Class {i + 1}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ml-1">Subject</label>
              <div className="flex items-center bg-[#111827] border-2 border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-600 transition-all">
                <div className="pl-4 text-slate-500"><BookOpen size={18} /></div>
                <input 
                  type="text" 
                  placeholder="e.g. Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent p-4 text-slate-200 placeholder:text-slate-700 outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ml-1">Session Date</label>
              <div className="flex items-center bg-[#111827] border-2 border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-600 transition-all">
                <div className="pl-4 text-slate-500"><Calendar size={18} /></div>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent p-4 text-slate-200 outline-none text-sm font-medium invert-icons"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Student List Table */}
        {students.length > 0 && (
          <div className="bg-[#0F172A] border border-slate-800 rounded-[1.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-blue-500" /> Student List
              </h3>
              <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase">
                {students.length} Total Students
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50">
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Roll No</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Student Name</th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {students.map((student, index) => (
                    <tr key={student.studentId} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-5 text-sm font-bold text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="p-5 text-sm font-semibold text-slate-200">
                        {student.name}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleStatusChange(index, "present")}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-black uppercase transition-all ${
                              student.status === "present"
                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                                : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                            }`}
                          >
                            <CheckCircle size={14} /> Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(index, "absent")}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-black uppercase transition-all ${
                              student.status === "absent"
                                ? "bg-rose-500 text-white shadow-lg shadow-rose-900/20"
                                : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                            }`}
                          >
                            <XCircle size={14} /> Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submit Section */}
        <div className="mt-10 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            disabled={loading || students.length === 0}
            className="group relative w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              <>
                <span>Commit Attendance Record</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            Ensure all records are accurate before submission
          </p>
        </div>

        <footer className="mt-20 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Educational Management Portal</p>
          <div className="flex gap-6">
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Logs</span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Help Desk</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Attendance;