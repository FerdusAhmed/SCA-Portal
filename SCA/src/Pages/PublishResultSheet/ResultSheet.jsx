// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import SeeResultTable from './SeeResultTable';
// import { CiSearch } from 'react-icons/ci';

// const ResultSheet = () => {
//   const [className, setClassName] = useState('');
//   const [studentRoll, setStudentRoll] = useState('');
//   const [examOption, setExamOption] = useState('');
//   const [studentEmail, setStudentEmail] = useState('');
//   const axiosSecure = useAxiosSecure();

//   const { data: resultSheet, isLoading } = useQuery({
//     queryKey: ['resultSheet', className, studentRoll, examOption, studentEmail],
//     enabled: !!className && !! studentRoll && !! examOption ,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/result?studentRoll=${studentRoll}&class_name=${className}&examOption=${examOption}&studentEmail=${studentEmail}`,
//       );
//       return res.data;
//     },
//   });

//   return (
//     <div className="min-h-screen max-w-7xl px-4 md:px-6 mx-auto my-5 ">
//       {/* Search Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold  md:text-left text-center ">
//             Student <span className="text-blue-500">Result Sheet</span>
//           </h1>
//           <p className="text-slate-400 mt-2">
//             Filter and view individual student performance
//           </p>
//         </header>

//         {/* Filter Panel */}
//         <div className="  border border-blue-500/20 rounded-2xl p-4 md:p-8 mb-8 shadow-sm shadow-blue-900/20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Exam Option */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
//                 Exam Type
//               </label>
//               <select
//                 className=" border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
//                 value={examOption}
//                 onChange={e => setExamOption(e.target.value)}
//               >
//                 <option value={''}>Select Exam</option>
//                 <option value={'test-1'}>Test 1</option>
//                 <option value={'test-2'}>Test 2</option>
//                 <option value={'final'}>Final Exam</option>
//               </select>
//             </div>

//             {/* Class Name */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
//                 Class Name
//               </label>
//               <select
//                 className="border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
//                 value={className}
//                 onChange={e => setClassName(e.target.value)}
//               >
//                 <option value={''}>Select Class</option>
//                 <option value={'6'}>Class 6</option>
//                 <option value={'7'}>Class 7</option>
//                 <option value={'8'}>Class 8</option>
//                 <option value={'9'}>Class 9</option>
//                 <option value={'10'}>Class 10</option>
//               </select>
//             </div>

//             {/* Class Roll */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
//                 Class Roll
//               </label>
//               <input
//                 type="number"
//                 value={studentRoll}
//                 onChange={e => setStudentRoll(e.target.value)}
//                 className=" border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
//                 placeholder="Roll (e.g. 05)"
//               />
//             </div>

//             {/* Student Email */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
//                 Student Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="student@school.com"
//                 value={studentEmail}
//                 onChange={e => setStudentEmail(e.target.value)}
//                 className=" border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Results Content Area */}
//         <div className="relative  w-full  rounded-2xl overflow-hidden min-h-[300px]">
//           {isLoading ? (
//             <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
//               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-blue-400 animate-pulse font-medium">
//                 Fetching Records...
//               </p>
//             </div>
//           ) : resultSheet?.studentRoll ? (
//             <div className="p-1">
//               <SeeResultTable resultSheet={resultSheet} />
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center p-8 bg-white border border-blue-50 rounded-xl">
//               {/* Icon Container */}
//               <CiSearch size={50} className=" text-blue-500" />

//               {/* Text Content */}
//               <h3 className="text-blue-900 font-bold text-lg mb-1">
//                 No Results Found
//               </h3>
//               <p className="text-blue-400 text-sm text-center max-w-[250px]">
//                 We couldn't find what you're looking for. Please adjust your
//                 filters and try again.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultSheet;

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SeeResultTable from './SeeResultTable';
import { CiSearch } from 'react-icons/ci';

const ResultSheet = () => {
  const [className, setClassName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [examOption, setExamOption] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: resultSheet, isLoading } = useQuery({
    queryKey: ['resultSheet', className, studentRoll, examOption, studentEmail],
    enabled: !!className && !!studentRoll && !!examOption,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result?studentRoll=${studentRoll}&class_name=${className}&examOption=${examOption}&studentEmail=${studentEmail}`,
      );
      return res.data;
    },
  });

  return (
    <div className="min-h-screen max-w-7xl px-4 md:px-6 mx-auto my-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Student <span className="text-blue-500">Result Sheet</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Filter and view individual student performance
          </p>
        </header>

        {/* Filter Panel - Original White & Blue Border */}
        <div className="bg-white border border-blue-500/20 rounded-2xl p-5 md:p-8 mb-8 shadow-sm shadow-blue-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Exam Option */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500 ml-1">
                Exam Type
              </label>
              <select
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none bg-white text-sm"
                value={examOption}
                onChange={e => setExamOption(e.target.value)}
              >
                <option value={''}>Select Exam</option>
                <option value={'test-1'}>Test 1</option>
                <option value={'test-2'}>Test 2</option>
                <option value={'final'}>Final Exam</option>
              </select>
            </div>

            {/* Class Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500 ml-1">
                Class Name
              </label>
              <select
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none bg-white text-sm"
                value={className}
                onChange={e => setClassName(e.target.value)}
              >
                <option value={''}>Select Class</option>
                <option value={'6'}>Class 6</option>
                <option value={'7'}>Class 7</option>
                <option value={'8'}>Class 8</option>
                <option value={'9'}>Class 9</option>
                <option value={'10'}>Class 10</option>
              </select>
            </div>

            {/* Class Roll */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500 ml-1">
                Class Roll
              </label>
              <input
                type="number"
                value={studentRoll}
                onChange={e => setStudentRoll(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-sm"
                placeholder="Roll (e.g. 05)"
              />
            </div>

            {/* Student Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500 ml-1">
                Student Email
              </label>
              <input
                type="email"
                placeholder="student@school.com"
                value={studentEmail}
                onChange={e => setStudentEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Results Content Area */}
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-500 animate-pulse font-medium text-sm">
                Fetching Records...
              </p>
            </div>
          ) : resultSheet?.studentRoll ? (
            <div className="w-full overflow-x-auto pb-4">
              <SeeResultTable resultSheet={resultSheet} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 md:p-16 bg-white border border-blue-50 rounded-2xl shadow-sm">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <CiSearch size={40} className="text-blue-500" />
              </div>
              <h3 className="text-blue-900 font-bold text-lg mb-2">
                No Results Found
              </h3>
              <p className="text-blue-400 text-sm text-center max-w-[280px]">
                Please adjust your filters and try again to view the result
                sheet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSheet;