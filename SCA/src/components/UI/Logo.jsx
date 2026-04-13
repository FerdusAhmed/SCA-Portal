import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
         <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <div className=" w-10 h-10 md:w-12 md:h-12 flex items-center justify-center  group-hover:scale-105 transition-all duration-300">
                  <img
                    src="/nexus-logo.png"
                    alt="Shahid Cadet Academy"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-[15px] font-extrabold tracking-tight leading-none text-slate-800">
                  Shahid Cadet<span className="text-[#4F6EF7]"> Academy</span>
                </span>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.12em] leading-none mt-0.5">
                  Learning Platform
                </p>
              </div>
            </Link>
    );
};

export default Logo;