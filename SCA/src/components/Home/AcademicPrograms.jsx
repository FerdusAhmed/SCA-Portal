import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, GraduationCap, ArrowRight } from 'lucide-react';
import Container from '../../Layouts/Container';

const AcademicPrograms = () => {
    const programs = [
        {
            title: "Primary Section",
            range: "Class 1 - 5",
            icon: <BookOpen className="text-blue-600" size={28} />,
            description: "Building a strong foundation with interactive learning and moral values.",
            color: "bg-blue-50"
        },
        {
            title: "Secondary Section",
            range: "Class 6 - 10",
            icon: <Users className="text-emerald-600" size={28} />,
            description: "Empowering students through science, arts, and commerce specialization.",
            color: "bg-emerald-50"
        },
        {
            title: "Higher Secondary",
            range: "Class 11 - 12",
            icon: <GraduationCap className="text-purple-600" size={28} />,
            description: "Advanced curriculum with career guidance for university readiness.",
            color: "bg-purple-50"
        }
    ];

    return (
        <section className="py-10 bg-white relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-50" />

            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4 uppercase tracking-widest"
                    >
                        Our Curriculum
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Exceptional Academic <span className="text-blue-600">Programs</span>
                    </h2>
                    <p className="text-slate-600 font-medium">
                        We offer a diverse range of educational tracks designed to nurture 
                        talents and prepare students for global challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white border border-slate-100 p-5 rounded-4xl shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
                        >
                            {/* Icon Box */}
                            <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                {program.icon}
                            </div>

                            <div className="mb-4">
                                <span className="text-[13px] font-bold text-blue-500 uppercase tracking-[2px]">
                                    {program.range}
                                </span>
                                <h3 className="text-xl font-black text-slate-800 mt-1">
                                    {program.title}
                                </h3>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {program.description}
                            </p>

                            {/* <button className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                                Explore Details <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button> */}

                            {/* Decorative Bottom Line */}
                            <div className="absolute bottom-0 left-12 right-12 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AcademicPrograms;