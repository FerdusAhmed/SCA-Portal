import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from '../../Layouts/Container';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Mr. Rahman',
      role: 'School Principal',
      image: 'https://i.pravatar.cc/150?img=12',
      review: 'This School Management Platform has completely transformed our administrative workflow. Everything is faster, safer, and more organized.',
    },
    {
      name: 'Mrs. Ahmed',
      role: 'Senior Teacher',
      image: 'https://i.pravatar.cc/150?img=32',
      review: 'Managing student records and attendance is now incredibly simple. The cloud system gives us peace of mind and incredible accessibility.',
    },
    {
      name: 'Imran Hossain',
      role: 'IT Coordinator',
      image: 'https://i.pravatar.cc/150?img=45',
      review: 'The security and performance of this platform are outstanding. It’s modern, reliable, and very easy to integrate with our existing systems.',
    },
    {
      name: 'Sarah Khan',
      role: 'Parent',
      image: 'https://i.pravatar.cc/150?img=26',
      review: 'The communication features are excellent. I can track my child’s progress and get notifications instantly. Truly a modern solution.',
    }
  ];

  return (
    <section className="py-10 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-200 to-transparent opacity-50" />
      
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-4"
          >
            Testimonials
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Voices of <span className="text-blue-600 italic">Trust.</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Trusted by schools and educators worldwide to deliver seamless administrative excellence.
          </p>
        </div>

        {/* Carousel implementation */}
        <div className="relative px-4 md:px-10 overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 overflow-visible!"
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex text-amber-400 gap-1">
                        {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                      </div>
                      <FaQuoteRight size={30} className="text-blue-50 group-hover:text-blue-100 transition-colors duration-500" />
                    </div>
                    
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">
                      "{item.review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-tight">{item.name}</h4>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">{item.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Custom Styles for Pagination */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;