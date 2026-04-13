import React, { useState } from "react";
import Container from "../../../Layouts/Container";
import { Mail, Phone, MapPin, Clock } from "lucide-react"; // 'lucide-react' icons use kora hoyeche
import toast from "react-hot-toast";

const Contact = () => {

  const [loading, setLoading] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
   
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Message sent successfully!");
    e.target.reset();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    
  }
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Let’s Get <span className="text-blue-600">Connected</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our school management platform or need
            assistance with the admission process? Get in touch with us, and our
            team will reach out to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email Us</h4>
                <p className="text-gray-600 text-sm">support@shahidcadetacademy.com</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Call Support</h4>
                <p className="text-gray-600 text-sm">+880 1234-567890</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Office Hours</h4>
                <p className="text-gray-600 text-sm">Sat - Thu: 9AM - 5PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white px-4 py-8 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  School Name
                </label>
                <input
                  type="text"
                  placeholder="Your School/College"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Message / Inquiry
                </label>
                <textarea
                  rows="4"
                  placeholder="Admission query or software issue details..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                ></textarea>
              </div>
              <button disabled={loading} className={`md:col-span-2 w-full py-4 cursor-pointer text-white font-bold rounded-lg  transform hover:-translate-y-1 transition duration-300 shadow-md ${loading ? 'bg-black/80' : 'bg-blue-600 hover:bg-blue-700'} `}>
                {loading ? <span>Loading... </span> : <span>Send Message</span> }
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
