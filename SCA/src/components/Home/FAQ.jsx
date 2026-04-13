import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can use this School Management Platform?",
      answer: "Our platform is designed for administrators, teachers, students, and parents with secure role-based access control.",
    },
    {
      question: "Is the platform secure?",
      answer: "Yes, we implement secure authentication and authorization mechanisms to ensure data privacy and protection.",
    },
    {
      question: "Can parents track student performance?",
      answer: "Parents can monitor attendance, exam results, assignments, and receive real-time academic updates.",
    },
    {
      question: "Does it support attendance and exam management?",
      answer: "Teachers can manage attendance, conduct exams, publish results, and track student academic performance efficiently.",
    },
    {
      question: "Is it mobile-friendly?",
      answer: "Yes, the platform is fully responsive and optimized for desktop, tablet, and mobile devices.",
    },
    {
      question: "Can reports be generated?",
      answer: "Yes, administrators and teachers can generate detailed academic and performance reports anytime.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-14 px-6 lg:px-20 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
            Support
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 leading-tight">
            Frequently Asked{" "}
          </h2>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-blue-600 leading-tight">Questions</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-[15px]">
            Everything you need to know about our School Management Platform.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-3 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === index
                  ? "bg-white border-red-200 shadow-lg shadow-red-500/5"
                  : "bg-white/70 border-[#ece9e4] hover:border-red-200/60"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-5 focus:outline-none"
              >
                <span
                  className={`text-[14px] font-bold leading-snug pr-4 transition-colors duration-200 ${
                    openIndex === index ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>

                <div
                  className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FiChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px w-full bg-gray-100 mb-4" />
                      <p className="text-[13.5px] text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;