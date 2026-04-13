import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Lock, Database, ShieldCheck, Server } from 'lucide-react';
import Container from '../../Layouts/Container';

const SecureCloudSystem = () => {
  const features = [
    {
      title: "Cloud Storage",
      icon: <Cloud size={32} />,
      desc: "Access school data anywhere with high-speed cloud infrastructure.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Data Encryption",
      icon: <Lock size={32} />,
      desc: "Bank-grade encryption ensures student and staff privacy at all times.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Secure Database",
      icon: <Database size={32} />,
      desc: "Reliable and structured records with automatic daily backups.",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "24/7 Protection",
      icon: <ShieldCheck size={32} />,
      desc: "Continuous monitoring to prevent unauthorized access and threats.",
      color: "text-rose-500",
      bg: "bg-rose-50"
    }
  ];

  return (
    <section className="py-10 bg-white relative overflow-hidden">
      {/* Decorative Tech Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-blue-600 font-black uppercase tracking-[3px] text-[10px] mb-4"
          >
            <Server size={14} /> Enterprise Infrastructure
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
            Secure Cloud <span className="text-blue-600">Ecosystem</span>
          </h2>

          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Shahid Cadet Academy utilizes cutting-edge cloud technology to guarantee 
            speed, reliability, and world-class data security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-4xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center"
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 mx-auto ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-10 group-hover:scale-110 shadow-inner`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>

              {/* Bottom Decorative Dash */}
              <div className="w-8 h-1 bg-slate-100 mx-auto mt-6 group-hover:w-16 group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SecureCloudSystem;