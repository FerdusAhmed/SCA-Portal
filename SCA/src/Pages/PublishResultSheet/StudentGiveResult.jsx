import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaUserEdit,
} from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { Layers, MoreHorizontal, UserCheck, GraduationCap } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router';

const StudentGiveResult = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedClass = searchParams.get('class') || '';
  const selectedExam = searchParams.get('exam') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['studentGiveResult', currentPage, selectedClass, selectedExam],
    queryFn: async () => {
      const skip = (currentPage - 1) * limit;
      const res = await axiosSecure.get(
        `/students?limit=${limit}&skip=${skip}&class_name=${selectedClass || ''}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { data: alreadyGiveResult = [] } = useQuery({
    queryKey: ['alreadyGiveResult', selectedClass, selectedExam],
    enabled: !!selectedClass && !!selectedExam,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result/getResult?class_name=${selectedClass}&examOption=${selectedExam}`,
      );
      return res.data;
    },
  });

  const studentResult = alreadyGiveResult.map(student => student.studentEmail);
  const students = data?.result || [];
  const studentsNoResult = students.filter(
    student => !studentResult.includes(student.email),
  );

  const totalStudents = data?.allStudent || 0;
  const totalPages = Math.ceil(totalStudents / limit);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-10 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
                    <PiStudentBold size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Student Database</h2>
            </div>
            <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Academic Management System</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-44 group">
                <select
                  value={selectedClass}
                  onChange={e => setSearchParams({ class: e.target.value, exam: selectedExam, page: 1 })}
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-300 focus:border-blue-600 outline-none appearance-none cursor-pointer transition-all"
                >
                  <option value="">All Classes</option>
                  {[6,7,8,9,10].map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
             </div>

             <div className="relative flex-1 md:w-44">
                <select
                  value={selectedExam}
                  onChange={e => setSearchParams({ class: selectedClass, exam: e.target.value, page: 1 })}
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-300 focus:border-blue-600 outline-none appearance-none cursor-pointer transition-all"
                >
                  <option value="">Select Exam</option>
                  <option value="test-1">Test 1</option>
                  <option value="test-2">Test 2</option>
                  <option value="final">Final Exam</option>
                </select>
             </div>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
             <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
             <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs">Syncing Records...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-[#0F172A] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="p-6">Roll No</th>
                    <th className="p-6">Student Info</th>
                    <th className="p-6">Class</th>
                    <th className="p-6 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {studentsNoResult.map((student) => (
                    <tr key={student._id} className="hover:bg-blue-600/5 transition-colors group">
                      <td className="p-6">
                        <span className="text-lg font-black text-blue-500 tracking-tighter">#{student.roll}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                             <GraduationCap size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200">{student.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase italic">
                          Grade {student.class_name}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <Link
                          to={`/dashboard/student-give-result/${student._id}?class=${selectedClass}&exam=${selectedExam}&page=${currentPage}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-blue-900/20"
                        >
                          <FaUserEdit size={14}/> Give Marks
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {studentsNoResult.map((student) => (
                <div key={student._id} className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="p-2.5 bg-blue-600/10 rounded-lg text-blue-500 border border-blue-600/20">
                        <span className="font-black text-sm">#{student.roll}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white leading-tight">{student.name}</h3>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block italic">Class {student.class_name}</span>
                      </div>
                    </div>
                    <button className="text-slate-600"><MoreHorizontal size={18} /></button>
                  </div>
                  
                  <div className="py-3 border-t border-slate-800/50">
                     <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mb-1 text-center">System Identity</p>
                     <p className="text-xs font-bold text-slate-400 text-center truncate">{student.email}</p>
                  </div>

                  <Link 
                    to={`/dashboard/student-give-result/${student._id}?class=${selectedClass}&exam=${selectedExam}&page=${currentPage}`}
                    className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-black uppercase text-white flex items-center justify-center gap-2 tracking-widest transition-all"
                  >
                    <FaUserEdit size={12} /> Entry Result
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {studentsNoResult.length === 0 && (
              <div className="py-20 text-center bg-[#0F172A] rounded-[2rem] border border-slate-800 animate-in zoom-in-95 duration-500">
                <Layers size={40} className="mx-auto text-slate-800 mb-4" />
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">No eligible students found</p>
              </div>
            )}

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 px-2">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest order-2 md:order-1">
                  Showing <span className="text-blue-500">{studentsNoResult.length}</span> of <span className="text-white">{totalStudents}</span> Students
                </div>
                
                <nav className="flex items-center gap-2 order-1 md:order-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setSearchParams({ class: selectedClass, exam: selectedExam, page: currentPage - 1 })}
                    className="p-3 rounded-xl border border-slate-800 bg-[#0F172A] text-slate-400 hover:text-white hover:border-blue-600 disabled:opacity-20 transition-all"
                  >
                    <FaChevronLeft size={14} />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#0F172A] p-1 rounded-2xl border border-slate-800">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchParams({ class: selectedClass, exam: selectedExam, page: i + 1 })}
                          className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                            currentPage === i + 1
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                              : 'text-slate-500 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          {i + 1}
                        </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setSearchParams({ class: selectedClass, exam: selectedExam, page: currentPage + 1 })}
                    className="p-3 rounded-xl border border-slate-800 bg-[#0F172A] text-slate-400 hover:text-white hover:border-blue-600 disabled:opacity-20 transition-all"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentGiveResult;