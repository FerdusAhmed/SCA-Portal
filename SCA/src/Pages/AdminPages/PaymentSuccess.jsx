import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router"; // react-router-dom use kora bhalo
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CheckCircle2, ArrowRight, Download, Home, Loader2 } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [resInfo, SetResInfo] = useState({})
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post(`/payments/payment-success?session_id=${sessionId}`)
        .then((res) => {
            setStatus("success");
            SetResInfo(res.data)
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    }
  }, [axiosSecure, sessionId]);
    
    console.log(resInfo)

  // --- LOADING STATE ---
  if (status === "verifying") {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-black text-white uppercase tracking-widest">Verifying Payment</h2>
        <p className="text-slate-500 text-sm mt-2 font-medium">Please wait while we confirm your transaction...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (status === "error") {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mb-6">
          <CheckCircle2 size={40} className="rotate-180" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Verification Failed</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">We couldn't verify your payment session. Please contact support if the amount was deducted.</p>
        <Link to="/dashboard/my-payments" className="mt-8 px-8 py-3 bg-slate-800 text-white rounded-xl font-bold text-sm">Back to Payments</Link>
      </div>
    );
  }

  // --- SUCCESS STATE ---
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#0F172A] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[60px] z-0"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 animate-bounce duration-2000">
            <CheckCircle2 size={48} />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Payment Received!</h1>
          <p className="text-slate-400 text-sm font-medium mb-8">
            Your transaction was successful. A confirmation email and receipt have been generated.
          </p>

          <div className="space-y-3 mb-10">
            <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Session ID</span>
              <span className="text-xs font-mono text-blue-400">{resInfo?.data.transition_id}...</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</span>
              <span className="text-xs font-black text-emerald-500 uppercase italic">Completed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link 
              to="/dashboard/my-payments" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
            >
              Go to My Payments <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download Receipt
            </button>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] mt-8 transition-colors">
            <Home size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;