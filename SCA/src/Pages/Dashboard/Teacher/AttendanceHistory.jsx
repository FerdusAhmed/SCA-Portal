import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Calendar, 
  Layers, 
  Search, 
  History, 
  UserCheck, 
  UserX, 
  ChevronDown,
  Info
} from 'lucide-react';

const AttendanceHistory = () => {
  // আজ পর্যন্ত ডেট সিলেক্ট করা যাবে এমন লিমিট রাখা ভালো
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [className, setClassName] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!className || !selectedDate) return;
    setLoading(true);

    // Date formatting logic (ISO format YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    axios
      .get("http://localhost:5000/attendance", {
        params: { className, date: dateStr },
      })
      .then((res) => {
        setAttendanceData(res.data);
      })
      .catch(() => {
        setAttendanceData([]);
      })
      .finally(() => setLoading(false));
  }, [className, selectedDate]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-12 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          <span>Reports</span> / <span className="text-blue-500">Archive</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none flex items-center gap-3">
               Attendance History
            </h1>
            <p className="text-slate-500 mt-2 text-xs md:text-sm font-medium">Review and audit previous classroom attendance records.</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Database Connected</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end relative z-20">
            {/* Class Dropdown */}
            <div className="w-full">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
                Target Class
              </label>
              <div className="relative group">
                <div className="flex items-center bg-[#111827] border-2 border-slate-800 rounded-xl overflow-hidden transition-all group-focus-within:border-blue-600">
                  <div className="pl-4 text-slate-500"><Layers size={18} /></div>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full bg-transparent p-4 text-slate-200 outline-none appearance-none cursor-pointer text-sm font-medium"
                  >
                    <option value="" className="bg-[#0F172A]">Select Class</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`${i + 1}`} className="bg-[#1F2937]">Class {i + 1}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Date Picker - FIXED WRAPPER */}
            <div className="w-full">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
                Reference Date
              </label>
              <div className="relative group">
                <div className="flex items-center bg-[#111827] border-2 border-slate-800 rounded-xl transition-all group-focus-within:border-blue-600">
                  <div className="pl-4 text-slate-500"><Calendar size={18} /></div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()} // ভবিষ্যতে ডেট সিলেক্ট করা বন্ধ
                    placeholderText="Select Date"
                    className="w-full bg-transparent p-4 text-slate-200 placeholder:text-slate-700 outline-none text-sm font-medium cursor-pointer"
                    wrapperClassName="w-full" // ফিক্সড ক্যালেন্ডার পজিশন
                    popperPlacement="bottom-start"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for DatePicker - এটি আপনার Global CSS ফাইলে যোগ করতে পারেন */}
        <style>{`
          .react-datepicker {
            background-color: #1e293b !important;
            border: 1px solid #334155 !important;
            font-family: inherit !important;
            border-radius: 12px !important;
            overflow: hidden;
          }
          .react-datepicker__header {
            background-color: #0f172a !important;
            border-bottom: 1px solid #334155 !important;
          }
          .react-datepicker__current-month, .react-datepicker__day-name {
            color: #f8fafc !important;
          }
          .react-datepicker__day {
            color: #cbd5e1 !important;
          }
          .react-datepicker__day:hover {
            background-color: #3b82f6 !important;
            color: white !important;
          }
          .react-datepicker__day--selected {
            background-color: #2563eb !important;
            color: white !important;
            border-radius: 8px !important;
          }
          .react-datepicker__day--disabled {
            color: #475569 !important;
          }
        `}</style>

        {/* Content Area */}
        <div className="space-y-8">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Querying Archives...</p>
            </div>
          )}

          {!loading && attendanceData.length === 0 && className && selectedDate && (
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-12 text-center">
              <History size={48} className="mx-auto text-rose-500/30 mb-4" />
              <p className="text-rose-500 font-bold uppercase tracking-widest text-xs">No records found for Class {className}</p>
            </div>
          )}

          {attendanceData.map((item, index) => (
            <div key={index} className="bg-[#0F172A] border border-slate-800 rounded-[1.5rem] overflow-hidden shadow-2xl">
              {/* Record Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600/10 p-3 rounded-xl">
                    <Search size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {item.subject}
                    </h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      Class {item.className} • {new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-3 py-1.5 rounded-lg border border-emerald-500/20 uppercase tracking-tighter">
                     Verified Record
                   </span>
                </div>
              </div>

              {/* Record Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/50">
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Roll No</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Student Name</th>
                      <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {item.students.map((student, i) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                        <td className="p-5 text-sm font-bold text-slate-500">
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="p-5 text-sm font-semibold text-slate-200">
                          {student.name}
                        </td>
                        <td className="p-5 text-right">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border tracking-tighter ${
                            student.status === "present"
                              ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                              : "bg-rose-500/5 text-rose-500 border-rose-500/20"
                          }`}>
                            {student.status === "present" ? <UserCheck size={12} /> : <UserX size={12} />}
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Academic Information System</p>
          <div className="flex gap-6">
            <span className="hover:text-blue-500 cursor-pointer transition-colors flex items-center gap-1">
              <Info size={12} /> System Status
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AttendanceHistory;