import React from 'react';
import { useForm } from 'react-hook-form'; 
import { PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Notice = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();

  // react-hook-form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // form submission handler
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/notices', data);
      console.log("Full Server Response:", res.data);

      // response check: insertedId or status 200
      if (res.data?.insertedId || res.status === 200) {
        if (refetch) refetch(); 
        reset();  

        Swal.fire({
          icon: 'success',
          title: 'Notice Published!',
          background: '#1E293B',
          color: '#fff',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // if response doesn't have expected success indicators
        throw new Error("Failed to get insertion confirmation");
      }
    } catch (err) {
      console.error("Post Error Details:", err);

      // eorror handling with fallback message
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: err.response?.data?.message || 'Check your internet or server connection',
        background: '#1E293B',
        color: '#fff',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  return (
    <aside className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl sticky top-10">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <PlusCircle size={20} className="text-blue-500" /> New Announcement
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Notice Title"
            className={`w-full bg-slate-900 border ${errors.title ? 'border-rose-500' : 'border-slate-800'} rounded-xl p-3 text-sm outline-none focus:border-blue-500 text-slate-200`}
          />
          {errors.title && (
            <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <textarea
            {...register('content', { required: 'Content cannot be empty' })}
            placeholder="Write details here..."
            rows="4"
            className={`w-full bg-slate-900 border ${errors.content ? 'border-rose-500' : 'border-slate-800'} rounded-xl p-3 text-sm outline-none focus:border-blue-500 text-slate-200 resize-none`}
          ></textarea>
          {errors.content && (
            <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-2 gap-3">
          <select
            {...register('category')}
            className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 outline-none "
          >
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Exam">Exam</option>
            <option value="Academic">Academic</option>
          </select>

          <select
            {...register('priority')}
            className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 outline-none "
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        {/*set date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className=" fieldset">
            <label className="label ml-2">Start Date</label>
            <input
              type="date"
              {...register('startAt', {
                required: 'start Date is required',
              })}
              placeholder="set start date"
              className={`w-full bg-slate-900 border input ${errors.title ? 'border-rose-500' : 'border-slate-800'} rounded-xl p-3 text-sm outline-none focus:border-blue-500 text-slate-200`}
            />
            {errors.title && (
              <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className=" fieldset">
            <label className="label ml-2">Expiry Date</label>
            <input
              type="date"
              {...register('expiryDate', {
                required: 'expiry Date is required',
              })}
              placeholder="set end date"
              className={`w-full bg-slate-900 border input ${errors.title ? 'border-rose-500' : 'border-slate-800'} rounded-xl p-3 text-sm outline-none focus:border-blue-500 text-slate-200`}
            />
            {errors.title && (
              <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
        >
          Publish Notice
        </button>
      </form>
    </aside>
  );
};

export default Notice;