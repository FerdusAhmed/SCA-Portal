import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { User, Mail, Phone, GraduationCap, MapPin, Calendar, Send, CheckCircle, Users, HeartPulse } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";


// ১. FormField Component
const FormField = ({ label,defaultValue,readOnly, icon: Icon, id, type = "text", placeholder, isTextArea, validation, register, errors }) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative">
      <Icon size={16} className={`absolute left-4 top-3.5 transition-colors ${errors[id] ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} />
      {isTextArea ? (
        <textarea {...register(id, validation)} rows="3" placeholder={placeholder} className={`w-full bg-white border ${errors[id] ? 'border-rose-300 ring-rose-50' : 'border-slate-200 focus:border-indigo-500 ring-indigo-500/5'} text-slate-800 pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-4 transition-all resize-none placeholder:text-slate-300 shadow-sm`} />
      ) : (
        <input {...register(id, validation)} defaultValue={defaultValue} readOnly={readOnly} type={type} placeholder={placeholder} className={`w-full bg-white border ${errors[id] ? 'border-rose-300 ring-rose-50' : 'border-slate-200 focus:border-indigo-500 ring-indigo-500/5'} text-slate-800 pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-4 transition-all placeholder:text-slate-300 shadow-sm`} />
      )}
    </div>
    {errors[id] && <span className="text-[10px] font-bold text-rose-500 ml-2 italic animate-pulse">⚠ {errors[id].message}</span>}
  </div>
);

const AdmissionForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Navigation 
  const [submitted, setSubmitted] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // TanStack Mutation with axiosSecure
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post("/admission", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) { // এখন এটি true পাবে
        toast.success("Application Received! Status: Pending", {
          style: {
            borderRadius: '12px',
            background: '#334155', // Slate-700 (Eye Comfort)
            color: '#fff',
          }
        });
        setSubmitted(true);
        reset();
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Submission failed";
      toast.error(errorMsg);
    }
  });

  const onSubmit = (data) => {
    // Jodi user na thake, login page ba home a niye jabe
    if (!user) {
      toast.error("Please login to submit application", {
        icon: '🔒',
        style: { borderRadius: '10px', background: '#1e293b', color: '#fff' }
      });
      return navigate("/login"); // login redirect 
    }
    console.log(data, 'data form onsubmit')
    mutation.mutate(data);
  };

  if (submitted) return <SuccessState setSubmitted={setSubmitted} />;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-xl shadow-slate-200/50">
          <div className="mb-10 text-center md:text-left">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 mx-auto md:mx-0">
              <GraduationCap className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2 italic">SCA Admission 2026</h1>
            <p className="text-slate-500 text-sm">Fill in the official details to apply for enrollment.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField id="firstName" defaultValue={user?.displayName ? user.displayName.split(" ")[0] : ""} label="First Name" icon={User} placeholder="John" register={register} errors={errors} validation={{ required: "Required" }} />
              <FormField id="lastName" defaultValue={user?.displayName ? user.displayName.split(" ").slice(1).join(" ") : ""} label="Last Name" icon={User} placeholder="Doe" register={register} errors={errors} validation={{ required: "Required" }} />
              <FormField id="email" defaultValue={user?.email || ""} label="Email Address" icon={Mail} type="email" placeholder="john@example.com" register={register} errors={errors} validation={{ required: "Valid email required" }} />
              <FormField id="phone" label="Phone Number" icon={Phone} type="tel" placeholder="017XXXXXXXX" register={register} errors={errors} validation={{ required: "Required", minLength: 11 }} />
              <FormField id="dob" label="Date of Birth" icon={Calendar} type="date" register={register} errors={errors} validation={{ required: "Required" }} />

              <FormField id="fatherName" label="Father's Name" icon={Users} placeholder="Mr. Smith" register={register} errors={errors} validation={{ required: "Required" }} />

              {/* Blood Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Blood Group *</label>
                <div className="relative">
                  <HeartPulse size={16} className={`absolute left-4 top-3.5 ${errors.bloodGroup ? 'text-rose-400' : 'text-slate-400'}`} />
                  <select {...register("bloodGroup", { required: "Required" })} className={`w-full bg-white border ${errors.bloodGroup ? 'border-rose-300' : 'border-slate-200 focus:border-indigo-500'} text-slate-800 pl-11 pr-4 py-3 rounded-2xl outline-none appearance-none cursor-pointer shadow-sm`}>
                    <option value="">Select Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              {/* Class Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Applying Class *</label>
                <div className="relative">
                  <GraduationCap size={16} className={`absolute left-4 top-3.5 ${errors.class ? 'text-rose-400' : 'text-slate-400'}`} />
                  <select {...register("class_name", { required: "Required" })} className={`w-full bg-white border ${errors.class ? 'border-rose-300' : 'border-slate-200 focus:border-indigo-500'} text-slate-800 pl-11 pr-4 py-3 rounded-2xl outline-none appearance-none cursor-pointer shadow-sm`}>
                    <option value="">Select Class</option>
                    {[6, 7, 8, 9, 10].map(c => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <FormField id="address" label="Residential Address" icon={MapPin} placeholder="Full address..." isTextArea register={register} errors={errors} validation={{ required: "Address is required" }} />

           
            {/* protected if not user you must login */}
                <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 tracking-widest text-sm ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2 italic animate-pulse">Processing...</span>
              ) : (
                <><Send size={18} /> SUBMIT APPLICATION</>
              )}
            </button>
           
            
          </form>
        </div>
      </div>
    </div>
  );
};

const SuccessState = ({ setSubmitted }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center animate-in zoom-in duration-300">
    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-50 max-w-md">
      <CheckCircle size={50} className="text-emerald-500 mx-auto mb-6" />
      <h2 className="text-2xl font-black text-slate-900 mb-4">Success!</h2>
      <p className="text-slate-500 mb-8 text-sm">Your admission request has been recorded safely.</p>
      <button onClick={() => setSubmitted(false)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors">Apply for Another</button>
    </div>
  </div>
);

export default AdmissionForm;