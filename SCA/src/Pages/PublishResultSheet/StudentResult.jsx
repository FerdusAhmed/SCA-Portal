// import React, { useState } from 'react';
// import useAuth from '../../Hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import { CiSaveDown1 } from 'react-icons/ci';
// import SecendLoader from '../../components/SCALoader/SecendLoader';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const StudentResult = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [examOptions, setExamOptions] = useState('');

//   const { data: student } = useQuery({
//     queryKey: ['email-base-student', user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/students/single-student?email=${user?.email}`,
//       );
//       return res.data;
//     },
//   });

//   const { data: studentResult, isLoading } = useQuery({
//     queryKey: [
//       'studentResult',
//       student?.email,
//       student?.class_name,
//       examOptions,
//     ],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/result/student-result?email=${student?.email}&class_name=${student?.class_name}&examOption=${examOptions}`,
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <SecendLoader></SecendLoader>;
//   }

//   if (!studentResult?.subjects) {
//     return (
//       <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-blue-500/30 rounded-xl bg-slate-900/50">
//         <p className="text-blue-400 mb-4">
//           No result data found for this selection.
//         </p>
//         <select
//           value={examOptions}
//           onChange={e => setExamOptions(e.target.value)}
//           className="select select-bordered border-blue-600 bg-slate-800 text-blue-100 focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select Options</option>
//           <option value="test-1">Test 1</option>
//           <option value="test-2">Test 2</option>
//           <option value="final">Final</option>
//         </select>
//       </div>
//     );
//   }

//   const validSubjects = studentResult?.subjects.filter(
//     sub => sub.mark !== null,
//   );

//   const getSubjectGrad = mark => {
//     if (mark >= 80) return 'A+';
//     if (mark >= 70) return 'A';
//     if (mark >= 60) return 'A-';
//     if (mark >= 50) return 'B';
//     if (mark >= 40) return 'C';
//     if (mark >= 33) return 'D';
//     return 'F';
//   };

//   const getPointSubject = mark => {
//     if (mark >= 80) return 5;
//     if (mark >= 70) return 4;
//     if (mark >= 60) return 3.5;
//     if (mark >= 50) return 3;
//     if (mark >= 40) return 2;
//     if (mark >= 33) return 1;
//     return 0;
//   };

//   const totalPoint = validSubjects?.reduce(
//     (sum, sub) => sum + getPointSubject(sub.mark),
//     0,
//   );
//   const getGard = (totalPoint / (validSubjects.length || 1)).toFixed(2);

//   const handleClick = result => {
//    const doc = new jsPDF();
//    const primaryBlue = [30, 64, 175]; // #1E40AF
//    const accentBlue = [219, 234, 254]; // Light blue for row stripes

//    // --- Header Section ---
//    // Blue Header Bar
//    doc.setFillColor(...primaryBlue);
//    doc.rect(0, 0, 210, 40, 'F');

//    // School Name (White)
//    doc.setTextColor(255, 255, 255);
//    doc.setFontSize(22);
//    doc.setFont('helvetica', 'bold');
//    doc.text('Shahid Cadet Academy Result Sheet', 20, 25);

//    // --- Info Section ---
//    doc.setTextColor(60, 60, 60);
//    doc.setFontSize(10);
//    doc.setFont('helvetica', 'normal');

//    // Student Details Grid
//    doc.text(`Exam: ${result?.examOption || 'N/A'}`, 20, 50);
//    doc.text(`Class: ${result?.className || 'N/A'}`, 20, 57);
//    doc.text(`Roll No: ${result?.studentRoll || 'N/A'}`, 20, 64);

//    // Decorative Divider Line
//    doc.setDrawColor(...primaryBlue);
//    doc.setLineWidth(0.5);
//    doc.line(20, 70, 190, 70);

//    // --- Subject Table ---
//    autoTable(doc, {
//      startY: 75,
//      head: [['Subject', 'Mark', 'Grade']],
//      body: result.subjects.map(sub => [
//        sub?.name.toUpperCase(),
//        sub?.mark,
//        getSubjectGrad(sub?.mark),
//      ]),
//      // Custom Blue & White Styling
//      headStyles: {
//        fillColor: primaryBlue,
//        textColor: [255, 255, 255],
//        fontSize: 12,
//        fontStyle: 'bold',
//        halign: 'center',
//      },
//      bodyStyles: {
//        textColor: [40, 40, 40],
//        halign: 'center',
//      },
//      alternateRowStyles: {
//        fillColor: accentBlue,
//      },
//      margin: { left: 20, right: 20 },
//      theme: 'grid',
//      styles: {
//        lineColor: [200, 200, 200],
//        lineWidth: 0.1,
//      },
//    });

//    // --- Footer ---
//    const finalY = doc.lastAutoTable.finalY || 150;

//    doc.save(`Nexus-Result-${result?.classRoll}.pdf`);
//   };;

//   return (
//     <div className="rounded-xl border border-blue-500/30 bg-slate-900 shadow-xl overflow-hidden">

//       <div className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-900 p-8 border-b border-blue-500/20">
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-end">
//           <div className="space-y-1">
//             <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
//               Student Name
//             </h2>
//             <p className="text-lg font-bold text-white truncate border-l-2 border-blue-500 pl-3 leading-tight">
//               {studentResult?.studentName}
//             </p>
//           </div>

//           <div className="space-y-1">
//             <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
//               Roll No
//             </h2>
//             <p className="text-lg font-bold text-white border-l-2 border-blue-500/40 pl-3 leading-tight">
//               {studentResult?.studentRoll}
//             </p>
//           </div>

//           <div className="space-y-1">
//             <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
//               Class
//             </h2>
//             <p className="text-lg font-bold text-white border-l-2 border-blue-500/40 pl-3 leading-tight">
//               {studentResult?.class_name}
//             </p>
//           </div>

//           <div className="space-y-1">
//             <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
//               Current View
//             </h2>
//             <p className="text-sm font-medium text-blue-200 capitalize bg-blue-500/10 px-2 py-1 rounded w-fit">
//               {studentResult?.examOption || 'General Overview'}
//             </p>
//           </div>

//           <div className="col-span-2 lg:col-span-1">
//             <select
//               value={examOptions}
//               onChange={e => setExamOptions(e.target.value)}
//               className="select select-sm w-full bg-slate-800/80 border border-blue-500/30 text-blue-50 hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg text-xs"
//             >
//               <option value="">Switch Exam</option>
//               <option value="test-1">Test 1</option>
//               <option value="test-2">Test 2</option>
//               <option value="final">Final</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto p-4">
//         <table className="table w-full">
//           <thead className="text-blue-400 border-b border-blue-800">
//             <tr className="border-none uppercase text-xs tracking-tighter">
//               <th className="bg-transparent">Subject Name</th>
//               <th className="bg-transparent text-center">Mark</th>
//               <th className="bg-transparent text-right">Grade</th>
//             </tr>
//           </thead>
//           <tbody className="text-slate-200">
//             {validSubjects.map((subj, idx) => (
//               <tr
//                 key={subj?.name || idx}
//                 className="border-blue-900/50 hover:bg-blue-900/20 transition-colors"
//               >
//                 <td className="font-medium">{subj?.name}</td>
//                 <td className="text-center font-mono">{subj?.mark}</td>
//                 <td className="text-right">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       getSubjectGrad(subj?.mark) === 'F'
//                         ? 'bg-red-500/20 text-red-400'
//                         : 'bg-blue-500/20 text-blue-300'
//                     }`}
//                   >
//                     {getSubjectGrad(subj?.mark)}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer / Summary Section */}
//       <div className="bg-blue-950/40 p-5 border-t border-blue-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-3">
//           <div className="h-12 w-12 rounded-lg  flex items-center justify-center shadow-blue-900/50">
//             <span className="text-white font-bold text-xl">{getGard}</span>
//           </div>
//           <div>
//             <p className="text-xs text-blue-400 uppercase font-bold tracking-wider">
//               GPA
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={()=>handleClick(studentResult)}
//           className="btn bg-blue-600 hover:bg-blue-500 border-none text-white px-8 rounded-full shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95"
//         >
//           <CiSaveDown1 />
//           Download Report
//         </button>
//       </div>
//     </div>

//   );
// };

// export default StudentResult;

import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { CiSaveDown1 } from 'react-icons/ci';
import SecendLoader from '../../components/SCALoader/SecendLoader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StudentResult = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [examOptions, setExamOptions] = useState('');

  const { data: student } = useQuery({
    queryKey: ['email-base-student', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/students/single-student?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const { data: studentResult, isLoading } = useQuery({
    queryKey: [
      'studentResult',
      student?.email,
      student?.class_name,
      examOptions,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result/student-result?email=${student?.email}&class_name=${student?.class_name}&examOption=${examOptions}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <SecendLoader />;
  }

  if (!studentResult?.subjects) {
    return (
      <div className="flex flex-col items-center justify-center p-6 md:p-10 border-2 border-dashed border-blue-500/30 rounded-xl bg-slate-900/50 text-center">
        <p className="text-blue-400 mb-4">
          No result data found for this selection.
        </p>
        <select
          value={examOptions}
          onChange={e => setExamOptions(e.target.value)}
          className="select select-bordered border-blue-600 bg-slate-800 text-blue-100 focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
        >
          <option value="">Select Options</option>
          <option value="test-1">Test 1</option>
          <option value="test-2">Test 2</option>
          <option value="final">Final</option>
        </select>
      </div>
    );
  }

  const validSubjects = studentResult?.subjects.filter(
    sub => sub.mark !== null,
  );

  const getSubjectGrad = mark => {
    if (mark >= 80) return 'A+';
    if (mark >= 70) return 'A';
    if (mark >= 60) return 'A-';
    if (mark >= 50) return 'B';
    if (mark >= 40) return 'C';
    if (mark >= 33) return 'D';
    return 'F';
  };

  const getPointSubject = mark => {
    if (mark >= 80) return 5;
    if (mark >= 70) return 4;
    if (mark >= 60) return 3.5;
    if (mark >= 50) return 3;
    if (mark >= 40) return 2;
    if (mark >= 33) return 1;
    return 0;
  };

  const totalPoint = validSubjects?.reduce(
    (sum, sub) => sum + getPointSubject(sub.mark),
    0,
  );
  const getGard = (totalPoint / (validSubjects.length || 1)).toFixed(2);

  const handleClick = result => {
    const doc = new jsPDF();
    const primaryBlue = [30, 64, 175];
    const accentBlue = [219, 234, 254];

    doc.setFillColor(...primaryBlue);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Shahid Cadet Academy Result Sheet', 20, 25);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Exam: ${result?.examOption || 'N/A'}`, 20, 50);
    doc.text(`Class: ${result?.className || 'N/A'}`, 20, 57);
    doc.text(`Roll No: ${result?.studentRoll || 'N/A'}`, 20, 64);

    doc.setDrawColor(...primaryBlue);
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);

    autoTable(doc, {
      startY: 75,
      head: [['Subject', 'Mark', 'Grade']],
      body: result.subjects.map(sub => [
        sub?.name.toUpperCase(),
        sub?.mark,
        getSubjectGrad(sub?.mark),
      ]),
      headStyles: {
        fillColor: primaryBlue,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: { textColor: [40, 40, 40], halign: 'center' },
      alternateRowStyles: { fillColor: accentBlue },
      margin: { left: 20, right: 20 },
      theme: 'grid',
    });

    doc.save(`SCA-Result-${result?.studentRoll}.pdf`);
  };

  return (
    <div className="rounded-xl border border-blue-500/30 bg-slate-900 shadow-xl overflow-hidden mb-10">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-900 p-5 md:p-8 border-b border-blue-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
              Student Name
            </h2>
            <p className="text-md md:text-lg font-bold text-white truncate border-l-2 border-blue-500 pl-3 leading-tight">
              {studentResult?.studentName}
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
              Roll No
            </h2>
            <p className="text-md md:text-lg font-bold text-white border-l-2 border-blue-500/40 pl-3 leading-tight">
              {studentResult?.studentRoll}
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
              Class
            </h2>
            <p className="text-md md:text-lg font-bold text-white border-l-2 border-blue-500/40 pl-3 leading-tight">
              {studentResult?.class_name}
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-black">
              Current View
            </h2>
            <p className="text-xs md:text-sm font-medium text-blue-200 capitalize bg-blue-500/10 px-2 py-1 rounded w-fit">
              {studentResult?.examOption || 'General Overview'}
            </p>
          </div>

          <div className="w-full">
            <select
              value={examOptions}
              onChange={e => setExamOptions(e.target.value)}
              className="select select-sm w-full bg-slate-800/80 border border-blue-500/30 text-blue-50 hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg text-xs"
            >
              <option value="">Switch Exam</option>
              <option value="test-1">Test 1</option>
              <option value="test-2">Test 2</option>
              <option value="final">Final</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Display Area */}
      <div className="p-4 md:p-6">
        {/* Desktop View (Visible from md upwards) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead className="text-blue-400 border-b border-blue-800">
              <tr className="border-none uppercase text-xs tracking-tighter">
                <th className="bg-transparent">Subject Name</th>
                <th className="bg-transparent text-center">Mark</th>
                <th className="bg-transparent text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {validSubjects.map((subj, idx) => (
                <tr
                  key={idx}
                  className="border-blue-900/50 hover:bg-blue-900/20 transition-colors"
                >
                  <td className="font-medium">{subj?.name}</td>
                  <td className="text-center font-mono">{subj?.mark}</td>
                  <td className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        getSubjectGrad(subj?.mark) === 'F'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {getSubjectGrad(subj?.mark)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Visible only on small screens) */}
        <div className="md:hidden space-y-3">
          {validSubjects.map((subj, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 p-4 rounded-lg border border-blue-500/10 flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-blue-400 uppercase font-black">
                  {subj?.name}
                </p>
                <p className="text-lg font-mono text-white">
                  Mark: {subj?.mark}
                </p>
              </div>
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full font-bold ${
                  getSubjectGrad(subj?.mark) === 'F'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {getSubjectGrad(subj?.mark)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Summary Section */}
      <div className="bg-blue-950/40 p-5 border-t border-blue-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
            <span className="text-white font-bold text-xl">{getGard}</span>
          </div>
          <div>
            <p className="text-xs text-blue-400 uppercase font-bold tracking-wider">
              GPA
            </p>
          </div>
        </div>

        <button
          onClick={() => handleClick(studentResult)}
          className="btn w-full sm:w-auto bg-blue-600 hover:bg-blue-500 border-none text-white px-8 rounded-full shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
        >
          <CiSaveDown1 className="text-lg" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default StudentResult;