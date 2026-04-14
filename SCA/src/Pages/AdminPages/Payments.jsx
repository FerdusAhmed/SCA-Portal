import { 
  PlusCircle, 
  Layers, 
  FileText, 
  DollarSign, 
  Calendar, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import AllPayments from './AllPayments';
import { useQuery } from '@tanstack/react-query';

const PremiumField = ({ id, label, icon, register, isSelect, options, placeholder, type = "text", error, required }) => (
    <div className='w-full mb-4 md:mb-6'>
        <label htmlFor={id} className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        <div className="relative group">
            <div className={`flex items-center bg-[#111827] border-2 ${error ? 'border-rose-500/50' : 'border-slate-800'} rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 group-focus-within:border-blue-600 group-focus-within:shadow-[0_0_20px_rgba(37,99,235,0.15)]`}>
                
                <div className="pl-3 md:pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    {React.cloneElement(icon, { size: 18 })}
                </div>

                {isSelect ? (
                    <div className="relative w-full">
                        <select
                            id={id}
                            className="w-full bg-transparent p-3.5 md:p-4 text-slate-200 outline-none appearance-none cursor-pointer text-xs md:text-sm font-medium"
                            defaultValue=""
                            {...register(id, { required: required })}
                        >
                            <option value="" disabled className="bg-[#0F172A]">{placeholder}</option>
                            {options?.map((option, i) => (
                                <option key={i} value={option.value} className="bg-[#1F2937]">{option.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                ) : (
                    <input 
                        id={id}
                        type={type}
                        className="w-full bg-transparent p-3.5 md:p-4 text-slate-200 placeholder:text-slate-700 outline-none text-xs md:text-sm font-medium"
                        placeholder={placeholder}
                        {...register(id, { required: required })}
                    />
                )}
            </div>
            {error && <span className="text-[9px] md:text-[10px] font-bold text-rose-500 mt-1 ml-2 flex items-center gap-1">● {label} is required</span>}
        </div>
    </div>
);

const CreatePayment = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { data: allPayments = [], isLoading, refetch } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });
    
    const onSubmit = async(data) => {
        try {
            const paymentRes = await axiosSecure.post('/payments', data);
            if (paymentRes.data.insertedId) {
                
                toast.success("Payment Entry Created!");
                refetch();
                reset();
            }
        } catch (error) {
            toast.error("Failed to create payment.");
        }
    };

    return (
        <div className="min-h-screen border border-gray-600/10 md:border-gray-600/20 rounded-2xl text-slate-200 p-4 md:p-12 selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    <span>Finance</span> / <span className="text-blue-500">Create Entry</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">Generate Billing</h1>
                        <p className="text-slate-500 mt-2 text-xs md:text-sm font-medium">Configure and broadcast new payment requirements to classes.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">System Live</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                    <div className="bg-[#0F172A] border border-slate-800 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                            <div className="space-y-1">
                                <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div> Basic Info
                                </h3>
                                <PremiumField id="payments_title" label="Payment Title" placeholder='e.g. Monthly Tuition Fee' icon={<FileText />} register={register} error={errors.payments_title} required={true} />
                                <PremiumField id="amount" type="number" label="Amount (BDT)" placeholder='5000' icon={<DollarSign />} register={register} error={errors.amount} required={true} />
                            </div>
                            <div className="space-y-1 mt-6 md:mt-0">
                                <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-indigo-600 rounded-full"></div> Target & Timeline
                                </h3>
                                <PremiumField id="class_name" label="Target Class" isSelect placeholder="Choose Class" options={[{ label: 'Class 6', value: '6' }, { label: 'Class 7', value: '7' }, { label: 'Class 8', value: '8' }, { label: 'Class 9', value: '9' }, { label: 'Class 10', value: '10' }]} icon={<Layers />} register={register} error={errors.class_name} required={true} />
                                <PremiumField id="due_date" type="date" label="Deadline" icon={<Calendar />} register={register} error={errors.due_date} required={true} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
                                <ShieldCheck size={14} className="text-blue-500" /> Remarks
                            </label>
                            <textarea className="w-full bg-[#111827] border-2 border-slate-800 rounded-xl md:rounded-2xl p-4 text-slate-200 placeholder:text-slate-700 outline-none text-xs md:text-sm font-medium focus:border-blue-600 transition-all min-h-[100px]" placeholder="Add specific instructions..." {...register("description")}></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <button type="submit" className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl md:rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95">
                            <span>Generate Payment Entry</span>
                            <PlusCircle size={20} />
                        </button>
                    </div>
                </form>

                <AllPayments allPayments={allPayments} refetch={refetch} isLoading={isLoading} />

                <footer className="mt-20 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-700 text-[10px] font-bold uppercase tracking-widest">
                    <p>© 2026 Admin Management System</p>
                    <div className="flex gap-6">
                        <span className="hover:text-blue-500 cursor-pointer transition-colors">Support</span>
                        <span className="hover:text-blue-500 cursor-pointer transition-colors">Privacy</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CreatePayment;