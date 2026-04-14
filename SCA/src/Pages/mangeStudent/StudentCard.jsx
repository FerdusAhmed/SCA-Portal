import React, { useState } from 'react';
import {
  FaRegCommentDots,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUserAlt,
} from 'react-icons/fa';
import FeedBack from './FeedBack';

const StudentCard = ({ studentData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudent, setStudent] = useState(null);

  const handleClick = id => {
    const singleStudent = studentData.find(s => id === s._id);
    setStudent(singleStudent);
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      {/* --- Mobile View: Box/Card Model (Visible only on small screens) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {studentData.length > 0
          ? studentData.map(student => (
              <div
                key={student._id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                      {student?.name?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100">
                        {student?.name || 'Anonymous Student'}
                      </h3>
                      <span className="text-[10px] text-blue-400 uppercase tracking-widest font-black">
                        Student Profile
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClick(student?._id)}
                    className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 active:scale-95"
                  >
                    <FaRegCommentDots size={18} />
                  </button>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/50">
                  <div className="flex items-center gap-3 text-slate-400">
                    <FaGraduationCap className="text-blue-500" size={16} />
                    <span className="text-sm font-medium">
                      Dept: {student?.department || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <FaMapMarkerAlt className="text-blue-500" size={16} />
                    <span className="text-sm italic">
                      {student?.address || 'Region Not Specified'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {/* --- Desktop View: Table Model (Visible only on md screens and up) --- */}
      <div className="hidden md:block w-full relative overflow-hidden rounded-[2rem] border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-blue-600/10 border-b border-slate-800">
              <tr className="text-blue-400 uppercase text-[11px] tracking-[0.2em] font-black">
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaUserAlt className="text-xs" /> Student Name
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap size={14} /> Department
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={13} /> Location
                  </div>
                </th>
                <th className="py-5 px-6 text-center">Engagement</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/50">
              {studentData.length > 0 ? (
                studentData.map(student => (
                  <tr
                    key={student._id}
                    className="hover:bg-blue-500/5 transition-colors group/row"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 group-hover/row:scale-110 transition-transform">
                          {student?.name?.charAt(0) || 'S'}
                        </div>
                        <span className="font-semibold text-slate-200 group-hover/row:text-blue-400 transition-colors">
                          {student?.name || 'Anonymous Student'}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700 uppercase tracking-tighter">
                        {student?.department || 'N/A'}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-slate-400 text-sm italic">
                        {student?.address || 'Region Not Specified'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleClick(student?._id)}
                        className="relative inline-flex items-center justify-center p-3 rounded-xl bg-slate-800 text-blue-400 border border-slate-700 hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-90 group/btn shadow-lg"
                      >
                        <FaRegCommentDots
                          size={18}
                          className="group-hover/btn:scale-110 transition-transform"
                        />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <p className="text-slate-500 font-medium italic">
                      No active student records found...
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Empty State (Mobile only) --- */}
      {studentData.length === 0 && (
        <div className="md:hidden py-10 text-center text-slate-500 italic">
          No active student records found...
        </div>
      )}

      {/* --- Modal Component --- */}
      <FeedBack isStudent={isStudent} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default StudentCard;
