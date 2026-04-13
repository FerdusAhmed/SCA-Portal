import React from "react";
import Container from "../../../Layouts/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router";
import { Sparkles, ArrowRight, GraduationCap, CheckCircle, Users } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Assets
import heroImg1 from "../../../assets/hero-1.webp";
import heroImg2 from "../../../assets/hero-2.webp";
import heroImg3 from "../../../assets/hero-3.webp";
import heroImg4 from "../../../assets/hero-4.webp";

const Hero = () => {
  const heroImgs = [
    { id: 1, img: heroImg1 },
    { id: 2, img: heroImg2 },
    { id: 3, img: heroImg3 },
    { id: 4, img: heroImg4 },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-slate-50 overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-20 z-0" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
              <Sparkles size={14} className="animate-pulse" /> Shahid Cadet Academy Management
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15]">
              Empowering Minds <br /> 
              <span className="text-blue-600 ">Digital Future.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
              A comprehensive solution to manage students, staff, and academics with effortless digital precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/admission">
                <button className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2">
                  Admission Now <ArrowRight size={18} />
                </button>
              </Link>

              <Link to="/result">
                <button className="px-7 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <GraduationCap size={18} className="text-blue-600" /> View Portal
                </button>
              </Link>
            </div>

            {/* Compact Stats */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-200 w-fit mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">10k+</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Students</p>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">★ ★ ★ ★ ★</div>
                <p className="text-xs font-bold text-slate-700">Top Rated</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content: Compact Slider */}
          <div className="relative max-w-xl mx-auto lg:mr-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-3xl p-2 bg-white shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="rounded-2xl overflow-hidden aspect-4/3 md:aspect-16/10">
                <Swiper
                  spaceBetween={0}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  effect={"fade"}
                  pagination={{ clickable: true }}
                  modules={[EffectFade, Navigation, Pagination, Autoplay]}
                  className="w-full h-full"
                >
                  {heroImgs.map((heroImg) => (
                    <SwiperSlide key={heroImg.id}>
                      <img className="w-full h-full object-cover" src={heroImg.img} alt="Shahid Cadet Academy" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>

            {/* Clean Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 bg-white border border-slate-100 p-3 rounded-2xl shadow-xl flex items-center gap-3  md:flex"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle size={18} />
              </div>
              <p className="text-[11px] font-black text-slate-800">Results Published!</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;