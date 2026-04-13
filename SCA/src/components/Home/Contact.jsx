import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react"; // 'lucide-react' icons use kora hoyeche
import toast from "react-hot-toast";
import Container from "../../Layouts/Container";

const Contact = () => {

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left Side: Contact Info Cards (এখানে কোনো পরিবর্তন করিনি) */}
          <div className="flex flex-col gap-4">
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

          {/* Right Side: Contact Form (বাম পাশের উচ্চতা অনুযায়ী অ্যাডজাস্ট করা হয়েছে) */}
          <div className="lg:col-span-2 bg-white px-6 py-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
            <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">School Name</label>
                  <input
                    type="text"
                    placeholder="Your School"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Message Area: flex-grow ensures it fills the exact remaining height */}
              <div className="space-y-1 flex-grow flex flex-col">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  placeholder="How can we help?"
                  className="w-full flex-grow px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none min-h-[80px]"
                ></textarea>
              </div>

              <button
                disabled={loading}
                className={`w-full py-3.5 text-white font-bold rounded-lg transition duration-300 shadow-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
