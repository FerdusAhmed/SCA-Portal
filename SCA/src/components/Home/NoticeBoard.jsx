import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ArrowRight, Megaphone } from 'lucide-react';
import Container from '../../Layouts/Container';

const NoticeBoard = () => {
    const notices = [
        {
            title: "Annual Sports Day 2026",
            date: "15 March 2026",
            tag: "Event",
            color: "text-orange-600 bg-orange-50"
        },
        {
            title: "Mid-Term Exam Routine Published",
            date: "10 February 2026",
            tag: "Academic",
            color: "text-blue-600 bg-blue-50"
        },
        {
            title: "Admission Open for 2026 Session",
            date: "01 January 2026",
            tag: "Admission",
            color: "text-emerald-600 bg-emerald-50"
        }
    ];

    return (
        <section className="py-10 bg-slate-50 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-blue-100/30 blur-3xl -z-10" />

            <Container>
                {/* Centered Heading Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[11px] mb-3"
                    >
                        <Bell size={14} className="animate-bounce" /> Stay Updated
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
                        Latest <span className="text-blue-600">Announcements</span>
                    </h2>

                    <p className="text-slate-500 text-sm font-medium">
                        Stay informed with the latest news, events, and academic updates from 
                        the heart of Shahid Cadet Academy.
                    </p>
                </div>

                {/* Notices List */}
                <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                    {notices.map((notice, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex items-center justify-between cursor-pointer"
                        >
                            {/* Hover Accent Line */}
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                            <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${notice.color}`}>
                                    <Megaphone size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${notice.color}`}>
                                            {notice.tag}
                                        </span>
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <Calendar size={12} />
                                            <span className="text-[11px] font-bold">{notice.date}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {notice.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Simple Arrow indicator for interactivity */}
                            <div className="hidden sm:block text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                                <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default NoticeBoard;