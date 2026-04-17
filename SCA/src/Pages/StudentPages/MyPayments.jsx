import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useStudent from "../../Hooks/useStudent";
import {
  CreditCard,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  ChevronRight,
  Wallet,
  CheckCircle,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const MyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { student } = useStudent();
  const { user } = useAuth();

  const { data: myPayments = [], isLoading } = useQuery({
    queryKey: ["my-payments", student?.class_name],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/my-payments?class_name=${student?.class_name}&email=${student?.email}`,
      );
      return res.data;
    },
    enabled: !!student?.class_name,
  });

 
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">
          Checking Records...
        </p>
      </div>
    );
  }

  const handlePayment = async (paymentInfo) => {
    paymentInfo.email = user?.email;
    paymentInfo.name = user.displayName;
    paymentInfo.student_id = student.student_id;

    axiosSecure
      .post("/payments/create-checkout-session", paymentInfo)
      .then((res) => {
        console.log(res);
        if (res?.data?.url) {
          window.location.assign(res?.data?.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-8 md:mt-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 px-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Pending Dues
          </h2>
          <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1 font-bold">
            Academic Year 2026 • Class {student?.class_name}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-2xl">
          <Wallet className="text-blue-500" size={20} />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase">
              Total Items
            </p>
            <p className="text-sm font-black text-white">
              {myPayments.length} Records
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {myPayments.length === 0 && (
        <div className="text-center py-24 bg-[#0F172A] rounded-[2.5rem] border border-slate-800 border-dashed">
          <AlertCircle size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400 font-bold">
            No pending payments found for your class.
          </p>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#0F172A] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 border-b border-slate-800">
            <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <th className="p-6">Purpose</th>
              <th className="p-6">Due Date</th>
              <th className="p-6">Amount</th>
              <th className="p-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {myPayments.map((payment) => (
              <tr
                key={payment._id}
                className="hover:bg-blue-600/5 transition-all group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-tight">
                        {payment.payments_title}
                      </p>
                      <p className="text-[10px] text-slate-500 line-clamp-1 max-w-[250px]">
                        {payment.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={14} className="text-blue-500" />
                    {payment.due_date}
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-lg font-black text-emerald-500 font-mono">
                    ৳{Number(payment.amount).toLocaleString()}
                  </span>
                </td>
                <td className="p-6 text-center">
                  {payment.paid ? (
                    <button
                      disabled
                      className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black rounded-xl flex items-center justify-center gap-2 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      PAID
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(payment)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      PAY NOW
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 px-1">
        {myPayments.map((payment) => (
          <div
            key={payment._id}
            className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl -z-0"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-500">
                  <Clock size={20} />
                </div>
                {payment.paid ? (
                  <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase italic">
                    Paid
                  </span>
                ) : (
                  <span className="text-xs font-black text-red-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase italic">
                    Unpaid
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-white leading-tight uppercase mb-1">
                {payment.payments_title}
              </h3>
              <p className="text-xs text-slate-500 mb-5 line-clamp-2">
                {payment.description}
              </p>

              <div className="flex justify-between items-end border-t border-slate-800/50 pt-5">
                <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl font-black text-white italic">
                    ৳{Number(payment.amount).toLocaleString()}
                  </p>
                </div>

                {payment?.paid ? (
                  <div className="p-3 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl">
                    <span className="text-xs font-black uppercase tracking-tight">
                      Paid
                    </span>
                    <CheckCircle size={18} className="opacity-80" />
                  </div>
                ) : (
                  <button
                    onClick={() => handlePayment(payment)}
                    className="p-3 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-900/30 active:scale-95 transition-all"
                  >
                    <span className="text-xs font-black uppercase tracking-tight">
                      Pay Now
                    </span>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-rose-400 bg-rose-400/5 py-2 px-3 rounded-lg w-fit">
                <Calendar size={12} />
                Deadline: {payment.due_date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPayments;
