import React, { useState } from 'react';
import { 
  BookOpen, ChevronDown, FileText, 
  Trophy, Clock, GraduationCap, ClipboardList, CalendarDays
} from 'lucide-react';

const MyCourse = () => {
  // স্কুল ভিত্তিক স্ট্যাটিক ডাটা (Class 9-10 Example)
  const academicData = {
    className: "Class 10",
    section: "A",
    group: "Science",
    subjects: [
      {
        id: 1,
        name: "Physics",
        code: "PHY-101",
        teacher: "Mr. Zahid Hasan",
        progress: 75,
        syllabus: [
          { term: "Half Yearly", topics: ["Motion", "Force", "Energy"], status: "Completed" },
          { term: "Final Exam", topics: ["Light", "Sound", "Modern Physics"], status: "Pending" }
        ]
      },
      {
        id: 2,
        name: "Higher Mathematics",
        code: "HM-102",
        teacher: "Ms. Nasrin Akter",
        progress: 40,
        syllabus: [
          { term: "Half Yearly", topics: ["Set & Function", "Algebra", "Geometry"], status: "Completed" },
          { term: "Final Exam", topics: ["Trigonometry", "Probability"], status: "In Progress" }
        ]
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 text-slate-400">
      
      {/* ─── SCHOOL HEADER ─── */}
      <div className="mt-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
            <GraduationCap size={16} /> SCA Academic Portal
          </div>
          <h1 className="text-3xl font-black text-slate-200 tracking-tight">
            My Curriculum
          </h1>
          <p className="text-slate-500 text-sm">Academic Year: 2026 | Term: Final</p>
        </div>

        {/* User Class Info Badge */}
        <div className="flex gap-3">
          <HeaderBadge label="Class" value={academicData.className} />
          <HeaderBadge label="Section" value={academicData.section} />
          <HeaderBadge label="Group" value={academicData.group} />
        </div>
      </div>

      {/* ─── SUBJECTS GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {academicData.subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

// Header Small Badges
const HeaderBadge = ({ label, value }) => (
  <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
    <p className="text-[9px] font-black text-slate-600 uppercase leading-none mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-300">{value}</p>
  </div>
);

// Subject Card Component
const SubjectCard = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-slate-700/50 transition-all duration-300 group">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest">{subject.code}</span>
            <h2 className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">{subject.name}</h2>
            <p className="text-sm text-slate-500 font-medium">Instructor: {subject.teacher}</p>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-4 rounded-2xl transition-all ${isOpen ? 'bg-slate-800 text-white' : 'bg-slate-950 text-slate-600 hover:text-slate-400'}`}
          >
            <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-600">
            <span>Syllabus Covered</span>
            <span>{subject.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
            <div 
              className="h-full bg-slate-700 rounded-full transition-all duration-1000" 
              style={{ width: `${subject.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Syllabus Details */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-250 border-t border-slate-800/30' : 'max-h-0'}`}>
        <div className="p-8 bg-slate-950/20 space-y-6">
          {subject.syllabus.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CalendarDays size={14} className="text-slate-600" /> {item.term}
                </h4>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  item.status === 'Completed' ? 'border-emerald-500/20 text-emerald-500/60 bg-emerald-500/5' : 'border-slate-700 text-slate-600'
                }`}>
                  {item.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {item.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-3 p-3 bg-slate-900/50 border border-slate-800/40 rounded-xl text-sm text-slate-400">
                    <ClipboardList size={14} className="text-slate-700" />
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button className="w-full py-4 bg-slate-800/40 hover:bg-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-slate-800 flex items-center justify-center gap-2">
            <FileText size={14} /> View Material
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;