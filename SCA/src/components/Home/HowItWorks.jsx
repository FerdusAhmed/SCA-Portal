import React from 'react';
import { motion } from 'framer-motion';
import { School, Users, BookOpen, BarChart3 } from 'lucide-react';
import Container from '../../Layouts/Container';

const steps = [
  {
    id: "01",
    title: "Register School",
    description: "Admin registers the school and configures academic structure, departments, and sessions.",
    icon: School,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: "02",
    title: "Add Teachers & Students",
    description: "Securely onboard teachers, students, and staff with role-based access control.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    id: "03",
    title: "Manage Activities",
    description: "Handle attendance, assignments, exams, and results from a centralized dashboard.",
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    id: "04",
    title: "Track Performance",
    description: "Monitor performance analytics and generate detailed academic reports easily.",
    icon: BarChart3,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-gray-50/50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It <span className='text-blue-600'>Works</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our platform simplifies school management through a structured 
            and intelligent workflow designed for efficiency.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-gray-400">{step.id}</span>
                </div>

                {/* Icon Container */}
                <div className={`w-14 h-14 ${step.bg} ${step.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;