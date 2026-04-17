import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import {
  HiOutlineDownload,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiAcademicCap,
} from 'react-icons/hi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SecendLoader from '../../components/SCALoader/SecendLoader';

const ClassRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: studentData = [] } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students`);
      return res.data.result;
    },
  });

  const findSingleStudent = studentData.find(s => s?.email === user?.email);

  const { data: routine = [], isLoading } = useQuery({
    queryKey: ['routine', findSingleStudent?.class_name],
    enabled: !!findSingleStudent?.class_name,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/routine?class_name=${findSingleStudent?.class_name}`,
      );
      return res.data;
    },
  });

  const days = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  const periods = [1, 2, 3];

  const formatTime = timeString => {
    if (!timeString) return '';
    const [hour, minute] = timeString.split(':');
    const hours = parseInt(hour, 10);
    const fixHours = hours >= 12 ? 'pm' : 'am';
    const h = hours % 12 || 12;
    return `${h}:${minute} ${fixHours}`;
  };

  const getClass = (day, period) => {
    const items = routine.filter(
      r => r.day === day && Number(r.period) === Number(period),
    );

    if (items.length === 0) {
      return (
        <div className="h-full min-h-[60px] md:min-h-[80px] bg-slate-900/50 border border-slate-800 rounded flex items-center justify-center">
          <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">
            No Class
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-900 border border-slate-800 rounded shadow-sm hover:border-blue-500/50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-600 p-1 rounded shrink-0">
                  <HiOutlineBookOpen className="text-white text-[10px]" />
                </div>
                <p className="text-[11px] font-bold text-slate-200 uppercase leading-tight">
                  {item.subject}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <HiOutlineUser className="text-[11px]" />
                  <p className="text-[10px] font-medium">{item.teacherName}</p>
                </div>
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <HiOutlineClock className="text-[11px]" />
                  <span className="text-[10px]">{formatTime(item.time)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleDownload = result => {
    const doc = new jsPDF();
    const primaryBlue = [30, 64, 175];
    const accentBlue = [235, 245, 255];

    doc.setFillColor(...primaryBlue);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Shahid Cadet Academy Class Routine', 20, 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Department: ${result[0]?.department || 'N/A'}`, 20, 22);

    const sortedData = [...result].sort((a, b) => {
      const dayIndex = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };
      return dayIndex[a.day] - dayIndex[b.day] || a.period - b.period;
    });

    autoTable(doc, {
      startY: 40,
      head: [['Day', 'Period', 'Subject', 'Teacher', 'Time']],
      body: sortedData.map(item => [
        item.day,
        `P-${item.period}`,
        item.subject,
        item.teacherName,
        item.time,
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: primaryBlue,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: { fontSize: 10, halign: 'center', textColor: [40, 40, 40] },
      alternateRowStyles: { fillColor: accentBlue },
      margin: { left: 15, right: 15 },
    });

    const finalY = doc.lastAutoTable.finalY || 200;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by Shahid Cadet Academy Management System', 15, finalY + 10);
    doc.save(`School_Routine.pdf`);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <SecendLoader />
      </div>
    );

  return (
    <div className="bg-black min-h-screen p-3 md:p-8 rounded-xl text-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 p-6 bg-slate-900 rounded-2xl shadow-xl border-b-4 border-blue-600 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 md:p-4 rounded-xl shadow-lg shadow-blue-900/20 shrink-0">
              <HiAcademicCap className="text-white text-2xl md:text-3xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HiOutlineCalendar className="text-blue-400 text-[10px]" />
                <span className="text-blue-400 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                  Academic Management
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-none uppercase">
                Class <span className="text-blue-500">Routine</span>
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase border border-blue-800/50">
                  Dept: {findSingleStudent?.department || 'N/A'}
                </span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase border border-slate-700">
                  Class: {findSingleStudent?.class_name || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleDownload(routine)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 uppercase tracking-wider"
          >
            <HiOutlineDownload className="text-lg" />
            Download PDF
          </button>
        </div>

        {/* --- Mobile Version --- */}
        <div className="block lg:hidden space-y-6">
          {days.map(day => (
            <div
              key={day}
              className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800"
            >
              <div className="bg-black p-3 text-blue-500 font-black text-xs uppercase tracking-widest flex justify-between items-center border-b border-slate-800">
                <span>{day}</span>
              </div>
              <div className="p-3 space-y-4">
                {periods.map(period => (
                  <div key={period} className="flex gap-3">
                    <div className="flex flex-col items-center justify-center bg-slate-800 border border-slate-700 rounded-lg w-12 shrink-0 py-2">
                      <span className="text-[8px] text-slate-500 font-bold uppercase">
                        Prd
                      </span>
                      <span className="text-sm font-black text-blue-400">
                        {period}
                      </span>
                    </div>
                    <div className="flex-1">{getClass(day, period)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- Desktop Version --- */}
        <div className="hidden lg:block overflow-hidden border border-slate-800 rounded-2xl shadow-2xl bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black">
                  <th className="p-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800 w-32">
                    Weekday
                  </th>
                  {periods.map(p => (
                    <th
                      key={p}
                      className="p-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[9px]">
                          Slot {p}
                        </span>
                        <span>Period 0{p}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {days.map(day => (
                  <tr
                    key={day}
                    className="group hover:bg-blue-900/10 transition-colors"
                  >
                    <td className="p-5 bg-slate-900/50 border-r border-slate-800 align-middle">
                      <span className="text-slate-300 font-black text-xs uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                        {day}
                      </span>
                    </td>
                    {periods.map(period => (
                      <td
                        key={period}
                        className="p-4 min-w-[200px] align-top border-r border-slate-800 last:border-r-0"
                      >
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Footer Info --- */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] font-medium uppercase tracking-widest text-center">
          <p>© {new Date().getFullYear()} SCA Academic System</p>
          <div className="flex gap-4">
            <p>
              Student:{' '}
              <span className="text-slate-400">
                {user?.displayName || 'N/A'}
              </span>
            </p>
            <p className="hidden md:block">|</p>
            <p>
              Status: <span className="text-green-500">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine;
