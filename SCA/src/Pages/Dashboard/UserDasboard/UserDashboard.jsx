import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  Send,
  CheckCircle,
  Users,
  HeartPulse,
} from 'lucide-react';

import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

// ১. FormField Component (User Friendly Dark Theme)
const FormField = ({
  label,
  defaultValue,
  readOnly,
  icon: Icon,
  id,
  type = 'text',
  placeholder,
  isTextArea,
  validation,
  register,
  errors,
}) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-[11px] font-bold text-blue-400/60 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative">
      <Icon
        size={16}
        className={`absolute left-4 top-3.5 transition-colors ${errors[id] ? 'text-rose-400' : 'text-blue-500/30 group-focus-within:text-blue-400'}`}
      />
      {isTextArea ? (
        <textarea
          {...register(id, validation)}
          rows="3"
          placeholder={placeholder}
          className={`w-full bg-slate-900/50 border ${errors[id] ? 'border-rose-500/50' : 'border-blue-900/30 focus:border-blue-500 focus:bg-slate-900'} text-blue-50 pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none placeholder:text-slate-600 shadow-sm`}
        />
      ) : (
        <input
          {...register(id, validation)}
          defaultValue={defaultValue}
          readOnly={readOnly}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-slate-900/50 border ${errors[id] ? 'border-rose-500/50' : 'border-blue-900/30 focus:border-blue-500 focus:bg-slate-900'} text-blue-50 pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600 shadow-sm`}
        />
      )}
    </div>
    {errors[id] && (
      <span className="text-[10px] font-bold text-rose-500 ml-2 italic animate-pulse">
        ⚠ {errors[id].message}
      </span>
    )}
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async formData => {
      const response = await axiosSecure.post('/admission', formData);
      return response.data;
    },
    onSuccess: data => {
      if (data.success) {
        toast.success('Application Received!', {
          style: {
            borderRadius: '12px',
            background: '#0f172a',
            color: '#60a5fa',
            border: '1px solid #1e40af',
          },
        });
        setSubmitted(true);
        reset();
      }
    },
    onError: error => {
      const errorMsg = error.response?.data?.message || 'Submission failed';
      toast.error(errorMsg);
    },
  });

  const onSubmit = data => {
    if (!user) {
      toast.error('Please login', {
        style: { background: '#0f172a', color: '#fff' },
      });
      return navigate('/login');
    }
    mutation.mutate(data);
  };

  if (submitted) return <SuccessState setSubmitted={setSubmitted} />;

  return (
    <div className="min-h-screen bg-[#020617] py-12 px-6 font-sans text-slate-300">
      <div className="max-w-4xl mx-auto">
        {/* Main Card: Glassy Midnight Blue */}
        <div className="bg-[#0b1120] border border-blue-900/20 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-blue-950/20">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-inner">
              <GraduationCap className="text-blue-500" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight mb-1">
                SCA <span className="text-blue-500">Admission</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Session 2026 • Secure Enrollment Portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                id="firstName"
                defaultValue={
                  user?.displayName ? user.displayName.split(' ')[0] : ''
                }
                label="First Name"
                icon={User}
                placeholder="John"
                register={register}
                errors={errors}
                validation={{ required: 'Required' }}
              />
              <FormField
                id="lastName"
                defaultValue={
                  user?.displayName
                    ? user.displayName.split(' ').slice(1).join(' ')
                    : ''
                }
                label="Last Name"
                icon={User}
                placeholder="Doe"
                register={register}
                errors={errors}
                validation={{ required: 'Required' }}
              />
              <FormField
                id="email"
                defaultValue={user?.email || ''}
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="john@example.com"
                register={register}
                errors={errors}
                validation={{ required: 'Valid email required' }}
              />
              <FormField
                id="phone"
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="017XXXXXXXX"
                register={register}
                errors={errors}
                validation={{ required: 'Required', minLength: 11 }}
              />
              <FormField
                id="dob"
                label="Date of Birth"
                icon={Calendar}
                type="date"
                register={register}
                errors={errors}
                validation={{ required: 'Required' }}
              />
              <FormField
                id="fatherName"
                label="Father's Name"
                icon={Users}
                placeholder="Mr. Smith"
                register={register}
                errors={errors}
                validation={{ required: 'Required' }}
              />

              {/* Select Fields */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-blue-400/60 uppercase tracking-widest ml-1">
                  Blood Group *
                </label>
                <div className="relative">
                  <HeartPulse
                    size={16}
                    className="absolute left-4 top-3.5 text-blue-500/30"
                  />
                  <select
                    {...register('bloodGroup', { required: 'Required' })}
                    className="w-full bg-slate-900/50 border border-blue-900/30 focus:border-blue-500 text-blue-50 pl-11 pr-4 py-3 rounded-2xl outline-none appearance-none cursor-pointer focus:bg-slate-900 transition-all"
                  >
                    <option value="" className="bg-[#0b1120]">
                      Select Group
                    </option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(
                      bg => (
                        <option key={bg} value={bg} className="bg-[#0b1120]">
                          {bg}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-blue-400/60 uppercase tracking-widest ml-1">
                  Applying Class *
                </label>
                <div className="relative">
                  <GraduationCap
                    size={16}
                    className="absolute left-4 top-3.5 text-blue-500/30"
                  />
                  <select
                    {...register('class_name', { required: 'Required' })}
                    className="w-full bg-slate-900/50 border border-blue-900/30 focus:border-blue-500 text-blue-50 pl-11 pr-4 py-3 rounded-2xl outline-none appearance-none cursor-pointer focus:bg-slate-900 transition-all"
                  >
                    <option value="" className="bg-[#0b1120]">
                      Select Class
                    </option>
                    {[6, 7, 8, 9, 10].map(c => (
                      <option key={c} value={c} className="bg-[#0b1120]">
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <FormField
              id="address"
              label="Residential Address"
              icon={MapPin}
              placeholder="Full address here..."
              isTextArea
              register={register}
              errors={errors}
              validation={{ required: 'Address is required' }}
            />

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 tracking-widest text-sm disabled:opacity-50"
            >
              {mutation.isPending ? (
                <span className="animate-pulse">PROCESSING APPLICATION...</span>
              ) : (
                <>
                  <Send size={18} /> SUBMIT APPLICATION
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SuccessState = ({ setSubmitted }) => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
    <div className="bg-[#0b1120] border border-blue-900/20 p-12 rounded-[3rem] shadow-2xl max-w-md">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} className="text-emerald-500" />
      </div>
      <h2 className="text-3xl font-black text-white mb-4">Received!</h2>
      <p className="text-slate-400 mb-8 text-sm leading-relaxed">
        Your admission application for 2026 has been successfully submitted to
        our database.
      </p>
      <button
        onClick={() => setSubmitted(false)}
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
      >
        Submit Another Form
      </button>
    </div>
  </div>
);

export default UserDashboard;
