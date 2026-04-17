import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import UpdateRoutine from './UpdateRoutine';
import { Link } from 'react-router';


const CreateRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const {handleSubmit,register} =useForm()
  

  const handleSubmitRoutine = (routines) => {
    axiosSecure.post('/routine', routines)
      .then(res => {
        console.log(res)
        if (res?.data?.message) {
          toast.info(res?.data?.message)
          
        } else {
           toast.info('success');
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  }

  return (
    <div  className=" mx-auto ">
      <div className=" flex justify-center font-sans">
        {/* Animated Border Wrapper - added responsive max-width and padding */}
        <div className="relative group p-[2px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden w-full max-w-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
          {/* The Rotating Neon Border */}
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#1e3a8a_50%,#0ea5e9_100%)] opacity-60" />

          {/* Inner Content Card - Adjusted padding for mobile */}
          <div className="relative bg-[#0f172a]/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[1.4rem] sm:rounded-[2.4rem] border border-blue-500/10">
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Routine <span className="text-blue-500 text-glow">Master</span>
              </h2>
              <p className="text-blue-300/60 text-xs sm:text-sm">
                ৭ দিনের রুটিন দ্রুত তৈরি করার জন্য নিচের তথ্যগুলো দিন
              </p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitRoutine)}>
              {/* Form Grid: Mobile-এ 1 column, Medium স্ক্রিনে 2 column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                {/* Class Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                    Class Name
                  </label>
                  <select
                    {...register('class_name', { required: true })}
                    className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d] "
                  >
                    <option>Select Class</option>
                    <option value={'6'}>Class 6</option>
                    <option value={'7'}>Class 7</option>
                    <option value={'8'}>Class 8</option>
                    <option value={'9'}>Class 9</option>
                    <option value={'10'}>Class 10</option>
                  </select>
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                    Subject Name
                  </label>
                  <select
                    {...register('subject', { required: true })}
                    className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d]"
                  >
                    <option>Select Subject</option>
                    <option value={'Mathematics'}>Mathematics</option>
                    <option value={'English'}>English</option>
                    <option value={'Bangla'}>Bangla</option>
                    <option value={'Physics'}>Physics</option>
                    <option value={'ICT'}>ICT</option>
                  </select>
                </div>

                {/* Day Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                    Select Day
                  </label>
                  <select
                    {...register('day', { required: true })}
                    className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d]"
                  >
                    <option value={'Saturday'}>Saturday</option>
                    <option value={'Sunday'}>Sunday</option>
                    <option value={'Monday'}>Monday</option>
                    <option value={'Tuesday'}>Tuesday</option>
                    <option value={'Wednesday'}>Wednesday</option>
                    <option value={'Thursday'}>Thursday</option>
                    <option value={'Friday'}>Friday</option>
                  </select>
                </div>

                {/* Teacher Name */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    {...register('teacherName', { required: true })}
                    placeholder="e.g. Mr. Kabir"
                    className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 hover:bg-[#26334d]"
                  />
                </div>

                {/* Time Picker - Fully Responsive for Mobile */}
                <div className="space-y-2 md:col-span-2">
                  <div className="w-full space-y-3 ">
                    <select
                      {...register('period', { required: true })}
                      className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d]"
                    >
                      <option value={''}>select-period</option>
                      <option value={1}>period-1</option>
                      <option value={2}>period-2</option>
                      <option value={3}>period-3</option>
                    </select>
                    <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1 text-center block">
                      Schedule Time
                    </label>
                    <input
                      type="time"
                      {...register('time', { required: true })}
                      className="w-full  bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons Section - Mobile-এ stack হয়ে যাবে */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
                
                <Link to={'/dashboard/check-routine'} className="flex-1 text-center cursor-pointer bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/50 transition-all active:scale-95 text-sm sm:text-base">
                  Check Routine
                </Link>
                <button className="flex-1 cursor-pointer bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/50 transition-all active:scale-95 text-sm sm:text-base">
                  Publish Routine 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
    </div>
  );
};;

export default CreateRoutine;