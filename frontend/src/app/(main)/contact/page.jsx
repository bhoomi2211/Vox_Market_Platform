'use client';
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMapPin, FiPhone, FiClock, FiMail, FiSend } from "react-icons/fi";

const contactSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().min(10, "Message too short").required("Message is required"),
});

const contactInfo = [
  {
    icon: <FiMapPin size={16} />,
    label: "Address",
    value: "House No. 01, Lucknow, India",
  },
  {
    icon: <FiPhone size={16} />,
    label: "Phone",
    value: "+91 70524 24405",
    href: "tel:+917052424405",
  },
  {
    icon: <FiMail size={16} />,
    label: "Email",
    value: "voxmarket47@gmail.com",
    href: "mailto:voxmarket47@gmail.com",
  },
  {
    icon: <FiClock size={16} />,
    label: "Support hours",
    value: "24 / 7",
  },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: { fname: "", lname: "", email: "", message: "", newsletter: false },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          toast.success("Message sent! We'll get back to you soon.");
          resetForm();
        } else {
          toast.error("Something went wrong");
        }
      } catch { toast.error("Network error"); }
      finally { setLoading(false); }
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#8C52FF] text-xs font-bold uppercase tracking-widest mb-2 block">Contact Us</span>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Get in Touch</h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Need help or have a question? We're here for you. Send us a message and we'll get back to you ASAP.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left info panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Contact info cards */}
            <div className="bg-[#1E2852] rounded-3xl p-8 text-white">
              <h2 className="text-lg font-black mb-6">Contact Information</h2>
              <div className="flex flex-col gap-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#8C52FF]/20 flex items-center justify-center text-[#8C52FF] shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-blue-300 font-semibold uppercase tracking-wide mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-white hover:text-[#8C52FF] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-52">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114340.36386990538!2d80.83648805!3d26.8466937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Send us a message</h2>

            <form onSubmit={form.handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider" htmlFor="fname">First Name</label>
                  <input
                    id="fname" name="fname" type="text" placeholder="Jane"
                    onChange={form.handleChange} value={form.values.fname}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition"
                  />
                  {form.touched.fname && form.errors.fname && <p className="text-xs text-red-500">{form.errors.fname}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider" htmlFor="lname">Last Name</label>
                  <input
                    id="lname" name="lname" type="text" placeholder="Doe"
                    onChange={form.handleChange} value={form.values.lname}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition"
                  />
                  {form.touched.lname && form.errors.lname && <p className="text-xs text-red-500">{form.errors.lname}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider" htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email" placeholder="you@example.com"
                  onChange={form.handleChange} value={form.values.email}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition"
                />
                {form.touched.email && form.errors.email && <p className="text-xs text-red-500">{form.errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider" htmlFor="message">Your Message</label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="How can we help you?"
                  onChange={form.handleChange} value={form.values.message}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition"
                />
                {form.touched.message && form.errors.message && <p className="text-xs text-red-500">{form.errors.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="newsletter"
                    onChange={form.handleChange}
                    checked={form.values.newsletter}
                    className="w-4 h-4 rounded border-gray-300 text-[#8C52FF] focus:ring-[#8C52FF] cursor-pointer"
                  />
                  Subscribe to newsletter
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1E2852] hover:bg-[#2a3a70] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition active:scale-[0.98] shadow-md"
                >
                  <FiSend size={14} />
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
