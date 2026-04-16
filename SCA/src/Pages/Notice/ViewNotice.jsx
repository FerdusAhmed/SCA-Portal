import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Calendar, Tag, AlertCircle, Megaphone, Clock } from 'lucide-react';
import SCALoader from '../../components/SCALoader/Nexusloader';

const ViewNotice = () => {
    const axiosSecure = useAxiosSecure();

    // data fetching with react-query
    const { data: notices = [], isLoading } = useQuery({
        queryKey: ['public-notices'],
        queryFn: async () => {
            const res = await axiosSecure.get('/notices');
            return res.data;
        }
    });

    if (isLoading) return <SCALoader />;

    return (
      <div className="max-w-5xl mx-auto p-4 md:p-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4">
            <Megaphone className="text-blue-500" size={32} />
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tight">
            Campus Announcements
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Stay informed with the latest updates from Shahid Cadet Academy
          </p>
        </div>

        {/* Notices Grid */}
        <div className="grid gap-6">
          {notices.length === 0 ? (
            <div className="text-center py-20 bg-[#1E293B] rounded-[3rem] border border-dashed border-slate-800">
              <p className="text-slate-500 font-bold">
                No announcements posted yet.
              </p>
            </div>
          ) : (
            notices.map(notice => (
              <div
                key={notice._id}
                className="group bg-[#1E293B] border border-slate-800 p-6 md:p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                {/* Priority Indicator Dot */}
                <div
                  className={`absolute top-8 right-8 w-3 h-3 rounded-full animate-pulse ${
                    notice.priority === 'Urgent'
                      ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                      : notice.priority === 'High'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                  }`}
                ></div>

                <div className="flex flex-col gap-4">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                    <span
                      className={`px-3 py-1 rounded-lg border ${
                        notice.category === 'Exam'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}
                    >
                      <Tag size={12} className="inline mr-1 mb-0.5" />{' '}
                      {notice.category}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock size={12} />{' '}
                      {new Date(notice?.startAt).toDateString()}
                    </span>
                    <span className="text-red-500 flex items-center gap-1">
                      <Clock size={12} />{' '}
                      {new Date(notice?.expiryDate).toDateString()}
                    </span>
                    
                  </div>

                  {/* Title & Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight">
                      {notice.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {notice.content}
                    </p>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold">
                      <AlertCircle size={14} />
                      <span>OFFICIAL NOTIFICATION</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
};

export default ViewNotice;