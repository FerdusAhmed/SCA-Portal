import React, { useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdDeleteForever, MdAdd } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { HiOutlineClock, HiOutlineUser } from 'react-icons/hi2';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import SecendLoader from '../../components/SCALoader/SecendLoader';

const UpdateRoutine = () => {
  const [isRoutine, setIsRoutine] = useState('');
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [isUpdate, setIsUpdate] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isUpdate && Object.keys(isUpdate).length > 0) {
      reset(isUpdate);
    }
  }, [isUpdate, reset]);

  const {
    data: routine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['routine', isRoutine],
    queryFn: async () => {
      const res = await axiosSecure.get(`/routine?class_name=${isRoutine}`);
      return res.data;
    },
  });

  const handleUpdate = id => {
    const getRoutine = routine.find(r => r._id === id);
    setIsUpdate(getRoutine);
    modalRef.current.showModal();
  };

  const handleColse = e => {
    e.preventDefault();
    modalRef.current.close();
  };

  const handleUpdateRoutine = updatedData => {
    axiosSecure
      .patch(`routine/${isUpdate?._id}`, updatedData)
      .then(() => {
        toast.success('Routine updated successfully!');
        modalRef.current.close();
        refetch();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      background: '#0f172a',
      color: '#fff',
      iconColor: '#3b82f6',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/routine/${id}`).then(() => {
          Swal.fire({
            title: 'Deleted!',
            background: '#0f172a',
            color: '#fff',
            icon: 'success',
          });
          refetch();
        });
      }
    });
  };

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

  const getClass = (day, period) => {
    if (!Array.isArray(routine)) return null;
    const item = routine.filter(
      r => r.day === day && Number(r.period) === Number(period),
    );

    if (item.length === 0)
      return (
        <div className="h-20 md:h-24 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 group hover:border-blue-500/50 transition-all">
          <span className="text-[10px] uppercase tracking-tighter font-bold group-hover:text-blue-400">
            Empty
          </span>
        </div>
      );

    return item.map(r => (
      <div
        key={r._id}
        className="group relative mb-2 bg-slate-900 border border-slate-800 p-3 md:p-4 rounded-2xl shadow-xl hover:border-blue-500/50 transition-all duration-300"
      >
        <div className="space-y-1 md:space-y-2">
          <p className="font-black text-blue-400 text-xs md:text-sm truncate uppercase tracking-tighter">
            {r.subject}
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs">
            <HiOutlineUser className="text-blue-500" />
            <span className="truncate">{r.teacherName}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:py-1 bg-slate-950 rounded-lg text-blue-300 text-[9px] md:text-[10px] font-bold">
            <HiOutlineClock /> {r.time}
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-row md:flex-col gap-1 md:opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => handleUpdate(r._id)}
            className="p-1.5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition-colors"
          >
            <CiEdit size={14} />
          </button>
          <button
            onClick={() => handleDelete(r._id)}
            className="p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-400 transition-colors"
          >
            <MdDeleteForever size={14} />
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <SecendLoader />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 mb-6 md:mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>

          <div className="relative  flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/30">
                Administration
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Class <span className="text-blue-500">Routine</span>
              </h1>
              <p className="text-slate-400 max-w-md text-xs md:text-sm leading-relaxed">
                Management portal for institutional scheduling. Precision
                control over timing and faculty.
              </p>
              <Link
                to="/dashboard/create-routine"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
              >
                <MdAdd size={18} /> Create New Session
              </Link>
            </div>

            {/* --- Filter Section --- */}
            <div className="bg-slate-950/50 p-4 md:p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
              <label className="text-[10px] font-black uppercase text-slate-500 mb-4 block tracking-widest text-center lg:text-left">
                Select Grade Level
              </label>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {['6', '7', '8', '9', '10'].map(cls => (
                  <button
                    key={cls}
                    onClick={() => setIsRoutine(cls)}
                    className={`h-12 w-12 md:h-14 md:w-14 rounded-xl text-sm md:text-lg font-black transition-all flex items-center justify-center ${
                      isRoutine === cls
                        ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-110'
                        : 'bg-slate-900 text-slate-500 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Version: List View (Hidden on Desktop) --- */}
        <div className="block md:hidden space-y-6">
          {days.map(day => (
            <div key={day} className="space-y-3">
              <div className="flex items-center gap-3 px-1">
                <span className="text-blue-500 font-black text-lg uppercase tracking-tighter">
                  {day}
                </span>
                <div className="h-[1px] flex-1 bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {periods.map(period => (
                  <div key={period} className="flex gap-3">
                    <div className="w-10 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl">
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

        {/* --- Desktop Version: Grid View (Hidden on Mobile) --- */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-center">
                  <th className="sticky left-0 z-20 bg-slate-950 p-6 text-blue-500 font-black text-xs uppercase tracking-widest text-left shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
                    Timeline
                  </th>
                  {periods.map(p => (
                    <th
                      key={p}
                      className="p-6 text-slate-500 font-black text-xs uppercase tracking-widest"
                    >
                      Period <span className="text-blue-400">{p}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {days.map(day => (
                  <tr
                    key={day}
                    className="hover:bg-blue-600/[0.02] transition-colors"
                  >
                    <td className="sticky left-0 z-20 bg-slate-900 p-6 border-r border-slate-800/50 shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg">
                          {day.substring(0, 3)}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                          {day}
                        </span>
                      </div>
                    </td>
                    {periods.map(period => (
                      <td key={period} className="p-3 min-w-[220px]">
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Modal Configuration --- */}
        <dialog
          ref={modalRef}
          className="modal modal-bottom sm:modal-middle backdrop-blur-xl"
        >
          <div className="modal-box bg-slate-900 border border-slate-800 p-0 rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden max-w-2xl shadow-3xl">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-black">Edit Schedule</h3>
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-70">
                Configuration Panel
              </p>
            </div>
            <form
              onSubmit={handleSubmit(handleUpdateRoutine)}
              className="p-6 space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">
                    Subject Title
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                {['teacherName', 'class_name', 'day'].map(field => (
                  <div className="form-control" key={field}>
                    <label className="text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">
                      {field.replace('_', ' ')}
                    </label>
                    <input
                      type="text"
                      {...register(field)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                ))}
                <div className="form-control">
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">
                    Period
                  </label>
                  <input
                    type="number"
                    {...register('period')}
                    min={1}
                    max={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase mb-2 ml-1">
                    Exact Time
                  </label>
                  <input
                    type="time"
                    {...register('time')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/40"
                >
                  Apply Changes
                </button>
                <button
                  type="button"
                  onClick={handleColse}
                  className="w-full sm:w-32 py-4 bg-slate-800 text-slate-400 rounded-xl font-black hover:bg-slate-700 transition-all uppercase text-[10px] tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UpdateRoutine;
