import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import Container from '../../Layouts/Container';

const stats = [
  { v: '10,000+', l: 'Students Enrolled', sub: 'Across Dhaka, Chattogram & Sylhet', icon: Users,        color: 'text-blue-600',   bg: 'bg-blue-50',   hover: 'group-hover:bg-blue-600' },
  { v: '500+',    l: 'Expert Educators',  sub: 'NCTB-aligned teaching staff',        icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', hover: 'group-hover:bg-indigo-600' },
  { v: '98%',     l: 'SSC/HSC Pass Rate', sub: 'Consistent over 5 years',            icon: Award,         color: 'text-blue-600',   bg: 'bg-blue-50',   hover: 'group-hover:bg-blue-600' },
  { v: '15 yrs',  l: 'Serving Bangladesh', sub: 'Founded in Dhaka, 2009',            icon: CalendarCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', hover: 'group-hover:bg-indigo-600' },
];

const affiliations = ['BANBEIS', 'NCTB', 'DSHE', 'EIIN Registered', 'BNQF Aligned', 'Secondary Board'];

// Ticker strip — blue accent dots
const Ticker = () => (
  <div className="relative overflow-hidden border-y border-slate-100 py-3 bg-slate-50">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 whitespace-nowrap w-max"
    >
      {[...affiliations, ...affiliations].map((a, i) => (
        <span key={i} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[2.5px] text-slate-400">
          <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
          {a}
        </span>
      ))}
    </motion.div>
  </div>
);

const StatRow = ({ item, index }) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-6 py-7 border-b border-slate-100 last:border-0 cursor-default"
    >
      <span className="text-[10px] font-black tabular-nums text-slate-300 w-5 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={`w-9 h-9 shrink-0 rounded-xl ${item.bg} flex items-center justify-center ${item.hover} transition-colors duration-300`}>
        <Icon size={16} className={`${item.color} group-hover:text-white transition-colors duration-300`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-black text-slate-800 uppercase tracking-wider leading-none">{item.l}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-1">{item.sub}</p>
      </div>

      <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums shrink-0">
        {item.v}
      </span>
    </motion.div>
  );
};

const SocialProof = () => (
  <section className="bg-white overflow-hidden">

    <Ticker />

    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-stretch py-10 lg:py-18">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between gap-12 lg:pr-8 lg:border-r border-slate-100 mb-14 lg:mb-0"
        >
          <div className="space-y-7">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={12} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">
                Verified Impact
              </span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-black text-slate-900 leading-[1.04] tracking-[-0.025em]">
              Numbers
              <br />
              that speak
              <br />
              <em className=" text-blue-600 italic font-black">for themselves.</em>
            </h2>

            <p className="text-[15px] text-slate-500 font-medium leading-[1.8] max-w-xs">
              Over a decade of trusted contribution to Bangladesh's education system — proven through results.
            </p>
          </div>
        </motion.div>

        {/* RIGHT */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-6 pb-4 border-b-2 border-slate-900 mb-1">
            <span className="w-5 shrink-0" />
            <span className="w-9 shrink-0" />
            <span className="flex-1 text-[9px] font-black uppercase tracking-[2.5px] text-slate-400">Metric</span>
            <span className="text-[9px] font-black uppercase tracking-[2.5px] text-slate-400 shrink-0">Value</span>
          </div>

          {stats.map((item, i) => (
            <StatRow key={item.l} item={item} index={i} />
          ))}
        </div>

      </div>
    </Container>
  </section>
);

export default SocialProof;