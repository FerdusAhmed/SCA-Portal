import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaPaperPlane,
  FaBook,
  FaPen,
  FaLayerGroup,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const FeedBack = ({ isOpen, setIsOpen, isStudent }) => {
  const { register, handleSubmit ,reset} = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    reset({ teacherName: user?.displayName });
  }, [user, reset]);
  
  
  const handleFeedBack = (feedback) => {
    const studentFeedBack = {
      ...feedback,
      studentEmail: isStudent.email,
      studentId: isStudent._id,
      teacherEmail: user.email,
      teacherName: user?.displayName,
      role:isStudent.role
      
      
    };

    axiosSecure.post('/studentFeedback/feedback', studentFeedBack)
      .then(res => {
        
        if (res.data?.message) {
          toast.info(res.data?.message)
        } else {
          toast.info('success-feedback');
        }
          reset();

        setIsOpen(false)

      }).catch(err => {
      console.log(err)
    })

  }
  return (
    <div>
      {isOpen && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div className="p-8 bg-black rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaPen className="text-blue-400 text-lg" /> Send Feedback
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit(handleFeedBack)}
              className="space-y-5 "
            >
              {/* Field 1: Subject */}
              <div>
                <label className="block text-xs font-semibold  uppercase mb-2 ml-1">
                  teacher Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    placeholder="teacher Name"
                    {...register('teacherName', { required: true })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Field 3: Feedback Message */}
              <div>
                <label className="block text-xs font-semibold  uppercase mb-2 ml-1">
                  Your Feedback
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us what you think..."
                  {...register('feedback', { required: true })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 mt-4 cursor-pointer"
              >
                <FaPaperPlane />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedBack;