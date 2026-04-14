

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import StudentCard from './StudentCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineUsers,
} from 'react-icons/hi2';
import SecendLoader from '../../components/SCALoader/SecendLoader';

const ManageStudents = () => {
  const axiosSecure = useAxiosSecure();
  const [isDepartment, setIsDepartment] = useState('');
  const [isAllPage, setIsAllPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;

  const { data: studentData = [], isLoading } = useQuery({
    queryKey: ['all-students', isDepartment, limit, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/students?class_name=${isDepartment}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const totalStudent = (res?.data?.allStudent || 0) / limit;
      setIsAllPage(Math.ceil(totalStudent) || 1);
      return res.data.result;
    },
  });

  if (isLoading) {
    return <SecendLoader></SecendLoader>;
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 text-slate-200 rounded-xl relative overflow-hidden">
      {/* --- Unique Decorative Background Element --- */}
      <div className="absolute top-0 right-0 -z-10 h-[200px] md:h-[300px] w-[200px] md:w-[300px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />

      {/* --- Header Section --- */}
      <header className="relative mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8 border-b border-slate-800/50 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 md:p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400 shrink-0">
              <HiOutlineUsers size={24} className="md:w-7 md:h-7" />
            </div>
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-white">
              Student <span className="text-blue-500">Management</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg italic">
            "Empowering educators with real-time feedback loops and departmental
            insights."
          </p>
        </div>

        {/* --- Responsive Filter Box --- */}
        <div className="relative w-full lg:max-w-sm group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex items-center bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden">
            <span className="pl-4 text-blue-400 shrink-0">
              <HiOutlineAdjustmentsHorizontal size={20} />
            </span>
            <select
              name="department"
              value={isDepartment}
              onChange={e => {
                setIsDepartment(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full bg-transparent p-3 md:p-4 text-white outline-none text-xs md:text-sm font-semibold cursor-pointer appearance-none"
            >
              <option className="bg-slate-900" value="">
                All Academic Departments
              </option>
              <option className="bg-slate-900" value="6">
                Standard VI (Class 6)
              </option>
              <option className="bg-slate-900" value="7">
                Standard VII (Class 7)
              </option>
              <option className="bg-slate-900" value="8">
                Standard VIII (Class 8)
              </option>
              <option className="bg-slate-900" value="9">
                Standard IX (Class 9)
              </option>
              <option className="bg-slate-900" value="10">
                Standard X (Class 10)
              </option>
            </select>
            {/* Custom Arrow for select */}
            <div className="absolute right-4 pointer-events-none text-slate-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* --- Student Content --- */}
      <main className="relative">
        {studentData.length > 0 ? (
          <div className="w-full">
            {/* Inside StudentCard, ensure you are using a grid like:
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            */}
            <StudentCard studentData={studentData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 rounded-[1.5rem] md:rounded-[2rem] bg-slate-900/30 border border-slate-800 backdrop-blur-sm px-6 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-slate-800 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-700" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-300">
              No Student Records Found
            </h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              Try adjusting your filters or checking back later.
            </p>
          </div>
        )}
      </main>

      {/* --- Futuristic Responsive Pagination --- */}
      {isAllPage > 0 && (
        <footer className="mt-12 md:mt-16 flex flex-col items-center gap-6 pb-6">
          <div className="flex items-center p-1 md:p-1.5 bg-slate-900/50 rounded-full border border-slate-800 shadow-2xl backdrop-blur-md max-w-full">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2.5 md:p-3 rounded-full transition-all disabled:opacity-20 hover:bg-blue-600 hover:text-white text-blue-400 shrink-0"
            >
              <SlArrowLeft size={18} className="md:w-5 md:h-5" />
            </button>

            {/* Desktop Page Numbers */}
            <div className="hidden md:flex items-center px-4 gap-2">
              {[...Array(isAllPage)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-300 ${
                    currentPage === i
                      ? 'bg-blue-600 text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'hover:bg-slate-800 text-slate-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Mobile View Page Indicator */}
            <div className="md:hidden px-4 flex flex-col items-center shrink-0">
              <span className="font-black text-blue-500 text-xs tracking-tighter">
                PAGE
              </span>
              <span className="text-white font-bold text-sm">
                {currentPage + 1}{' '}
                <span className="text-slate-600 text-xs">/</span> {isAllPage}
              </span>
            </div>

            <button
              disabled={currentPage >= isAllPage - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2.5 md:p-3 rounded-full transition-all disabled:opacity-20 hover:bg-blue-600 hover:text-white text-blue-400 shrink-0"
            >
              <SlArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-ping"></div>
            <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] md:tracking-[0.3em]">
              System Live • Records Page {currentPage + 1}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ManageStudents;