import React from 'react';
import { FiHexagon, FiX, FiArrowRight } from 'react-icons/fi';
import { FaBook, FaUserTie } from 'react-icons/fa';

import { MdOutlineMessage } from 'react-icons/md';

const FeedbackModal = ({ setIsFeedback,feedbacks }) => {
  return (
    

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      {/* Modal Container with Animated Border Wrapper */}
      <div className="relative w-full max-w-md group">
        {/* The Neon Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 rounded-[24px] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

        <div className="relative bg-slate-900 rounded-[22px] overflow-hidden border border-slate-800 shadow-2xl">
          {/* Sticky Header Section */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <FiHexagon className="text-blue-400 animate-pulse" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Teacher Insights
                </h3>
                <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">
                  Feedback Stream
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsFeedback(false)}
              className="p-2 transition-all text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl active:scale-90"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {feedbacks.length > 0 ? (
              feedbacks.map(feedback => (
                <div
                  key={feedback._id}
                  className="relative pl-6 border-l-2 border-slate-800 hover:border-blue-500 transition-colors group/item"
                >
                  {/* Teacher Name & Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-800 text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                      <FaUserTie size={14} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-200 tracking-tight">
                      {feedback?.teacherName || 'Anonymous Instructor'}
                    </h4>
                  </div>

                  {/* Feedback Message */}
                  <div className="flex gap-3 bg-slate-800/30 p-4 rounded-2xl rounded-tl-none border border-slate-800 group-hover/item:bg-slate-800/50 transition-all">
                    <MdOutlineMessage
                      size={18}
                      className="text-blue-500 shrink-0 mt-1"
                    />
                    <p className="text-sm leading-relaxed text-slate-400">
                      {feedback?.feedback || 'No detailed commentary provided.'}
                    </p>
                  </div>

                  {/* Date/Time Placeholder (Dummy text for design completeness) */}
                  <p className="mt-2 text-[10px] text-slate-600 uppercase font-bold tracking-widest ml-1">
                    Verified Feedback • {new Date(feedback?.feedbackAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              /* Empty State Dummy Text */
              <div className="text-center py-10">
                <p className="text-slate-500 italic">
                  No feedback entries found for this student.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Decorative Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;