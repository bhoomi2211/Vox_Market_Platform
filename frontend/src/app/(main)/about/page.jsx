'use client';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { FiStar, FiMessageSquare } from "react-icons/fi";

const teamMembers = [
  { name: "Harshit Sahu", role: "MERN Stack Developer", img: "/WhatsApp Image 2024-01-23 at 18.44.34_569071c3.jpg" },
  { name: "Hemant Singh", role: "Frontend Developer", img: "/WhatsApp Image 2024-01-23 at 18.44.34_569071c3.jpg" },
];

const About = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/getall`);
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchFeedback(); }, []);

  const feedbackForm = useFormik({
    initialValues: { name: "", email: "", feedback: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      feedback: Yup.string().min(10, "Feedback too short").required("Feedback is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          toast.success("Thanks for your feedback!");
          resetForm();
          fetchFeedback();
        } else {
          toast.error("Something went wrong");
        }
      } catch { toast.error("Network error"); }
      finally { setLoading(false); }
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[#1E2852] text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 max-w-xl">
            <span className="text-[#8C52FF] text-xs font-bold uppercase tracking-widest mb-3 block">About VOX Market</span>
            <h1 className="text-4xl font-black leading-tight mb-4">
              Voice-activated shopping — intuitive &amp; effortless
            </h1>
            <p className="text-blue-200 leading-relaxed">
              Welcome to VOX Market, the innovative platform where you can explore and purchase a vast collection of products using just your voice.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://www.pngall.com/wp-content/uploads/8/Super-Market-PNG-Picture.png"
              alt="VOX Market"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Our Team</h2>
          <p className="text-gray-500 text-sm">The people building VOX Market</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-56 hover:shadow-md transition-shadow">
              <div className="bg-gray-100 aspect-square overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1E2852&color=fff&size=200`;
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-[#8C52FF] font-medium mt-0.5">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Customer Feedback ── */}
      {feedbackList.length > 0 && (
        <section className="bg-white border-y border-gray-100 py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Customer Feedback</h2>
              <p className="text-gray-500 text-sm">What our users say</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feedbackList.map((item) => (
                <div key={item._id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map(s => <FiStar key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{item.feedback}&rdquo;</p>
                  <p className="text-xs font-bold text-[#1E2852]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Feedback Form ── */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="text-[#8C52FF] text-xs font-bold uppercase tracking-widest mb-3 block">Share Your Thoughts</span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">Leave us a feedback!</h2>
            <p className="text-gray-500 leading-relaxed">
              Your feedback helps us improve. Let us know what you think about VOX Market and what we can do better.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-2 mb-6">
              <FiMessageSquare size={20} className="text-[#8C52FF]" />
              <h3 className="text-lg font-bold text-gray-900">Have a suggestion?</h3>
            </div>

            <form onSubmit={feedbackForm.handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</label>
                  <input
                    type="text" name="name"
                    onChange={feedbackForm.handleChange} value={feedbackForm.values.name}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] transition"
                  />
                  {feedbackForm.touched.name && feedbackForm.errors.name && (
                    <p className="text-xs text-red-500">{feedbackForm.errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</label>
                  <input
                    type="email" name="email"
                    onChange={feedbackForm.handleChange} value={feedbackForm.values.email}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] transition"
                  />
                  {feedbackForm.touched.email && feedbackForm.errors.email && (
                    <p className="text-xs text-red-500">{feedbackForm.errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</label>
                <textarea
                  name="feedback" rows={4} maxLength={300}
                  onChange={feedbackForm.handleChange} value={feedbackForm.values.feedback}
                  placeholder="Share your experience or suggestion…"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#8C52FF] transition"
                />
                <div className="flex justify-between items-center">
                  {feedbackForm.touched.feedback && feedbackForm.errors.feedback
                    ? <p className="text-xs text-red-500">{feedbackForm.errors.feedback}</p>
                    : <span />}
                  <span className="text-xs text-gray-400">{feedbackForm.values.feedback.length}/300</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1E2852] hover:bg-[#2a3a70] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition active:scale-[0.98]"
              >
                {loading ? 'Submitting…' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
