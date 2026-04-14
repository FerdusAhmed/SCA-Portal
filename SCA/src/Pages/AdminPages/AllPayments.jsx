import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { 
  CreditCard, 
  Layers, 
  Calendar, 
  DollarSign, 
  Trash2, 
  ExternalLink,
  Search,
  MoreHorizontal,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const AllPayments = ({allPayments, isLoading, refetch}) => {
    const axiosSecure = useAxiosSecure();
    const [selectedPayment, setSelectedPayment] = useState(null);

    

    if (isLoading) {
        return <div className="text-center py-20 text-blue-500 font-black animate-pulse uppercase tracking-widest">Fetching Data...</div>;
    }

    const handleView = (payment) => {
        setSelectedPayment(payment);
    };


    const handleDelete = async(id) => {
        const deleteRes = await axiosSecure.delete(`/payments/${id}/delete`);
        if (deleteRes.data.deletedCount) {
            refetch()
            toast.success("Deleted Succfully!")
        }

    }

    return (
        <div className="mt-10 md:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* --- HEADER & SEARCH --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 px-2 md:px-0">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Active Records</h2>
                    <p className="text-slate-500 text-[9px] md:text-xs uppercase tracking-[0.2em] mt-1 font-bold">Financial Management</p>
                </div>
                
                <div className="relative w-full md:w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={14} />
                    <input 
                        type="text" 
                        placeholder="Search records..." 
                        className="w-full bg-[#0F172A] border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-300 focus:border-blue-600 outline-none transition-all"
                    />
                </div>
            </div>

            {/* --- DESKTOP TABLE --- */}
            <div className="hidden md:block bg-[#0F172A] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                <th className="p-5">Payment Title</th>
                                <th className="p-5">Target Class</th>
                                <th className="p-5">Amount</th>
                                <th className="p-5">Deadline</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {allPayments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-blue-600/5 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400">
                                                <CreditCard size={16} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-200">{payment.payments_title}</p>
                                        </div>
                                    </td>
                                    <td className="p-5 text-xs font-black text-slate-400 uppercase">Class {payment.class_name}</td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-black italic">
                                            ৳ {Number(payment.amount).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="p-5 text-xs text-slate-400 font-medium">{payment.due_date}</td>
                                    <td className="p-5">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* ✅ FIX: handleView ekhane add kora hoyeche */}
                                            <button 
                                                onClick={() => handleView(payment)} 
                                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all"
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                            <button onClick={()=>handleDelete(payment._id)} className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-500 hover:text-rose-500 transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MOBILE CARD VIEW --- */}
            <div className="md:hidden space-y-4 px-2">
                {allPayments.map((payment) => (
                    <div key={payment._id} className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-lg active:scale-95 transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white leading-tight">{payment.payments_title}</h3>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">Class {payment.class_name}</span>
                                </div>
                            </div>
                            <button className="text-slate-600"><MoreHorizontal size={18} /></button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-800/50">
                            <div>
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Amount</p>
                                <p className="text-sm font-black text-emerald-500">৳ {Number(payment.amount).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Deadline</p>
                                <p className="text-xs font-bold text-slate-300">{payment.due_date}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800/50">
                            <button onClick={()=>handleView(payment)} className="flex-1 py-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-300 flex items-center justify-center gap-2">
                                <ExternalLink size={12} /> View
                            </button>
                            <button onClick={()=>handleDelete(payment._id)} className="flex-1 py-2.5 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl text-[10px] font-black uppercase text-rose-500 border border-rose-500/20 flex items-center justify-center gap-2">
                                <Trash2 size={12} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODAL SECTION --- */}
            {selectedPayment && (
                <div 
                    className="fixed inset-0 z- flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all"
                    onClick={() => setSelectedPayment(null)} // Background click korle bondho hobe
                >
                    <div 
                        className="bg-[#1E293B] border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()} // Content click korle bondho hobe na
                    >
                        {/* MODAL HEADER */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Payment Details</h2>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* MODAL BODY */}
                        <div className="space-y-4 text-sm">
                            <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Title</p>
                                <p className="text-slate-200 font-bold">{selectedPayment.payments_title}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
                                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Class</p>
                                    <p className="text-slate-200 font-bold">Class {selectedPayment.class_name}</p>
                                </div>
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
                                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Amount</p>
                                    <p className="text-emerald-500 font-black">৳ {Number(selectedPayment.amount).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800">
                                <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Deadline</p>
                                <p className="text-slate-200 font-bold">{selectedPayment.due_date}</p>
                            </div>
                        </div>

                        {/* CLOSE BUTTON */}
                        <button 
                            onClick={() => setSelectedPayment(null)}
                            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all shadow-lg shadow-blue-900/20"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}

            {/* --- EMPTY STATE --- */}
            {allPayments.length === 0 && (
                <div className="py-20 text-center bg-[#0F172A] rounded-[2rem] border border-slate-800">
                    <Layers size={32} className="mx-auto text-slate-700 mb-3" />
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No active records found</p>
                </div>
            )}
        </div>
    );
};

export default AllPayments;