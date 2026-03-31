// src/components/Footer.js
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/productView' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Seller Login', href: '/sellerLogin' },
  ];

  const socials = [
    { label: 'Instagram', href: '#', icon: <FiInstagram size={16} /> },
    { label: 'Facebook', href: '#', icon: <FiFacebook size={16} /> },
    { label: 'Twitter', href: '#', icon: <FiTwitter size={16} /> },
    { label: 'LinkedIn', href: '#', icon: <FiLinkedin size={16} /> },
  ];

  return (
    <footer className="bg-[#1E2852] text-gray-400">
      {/* ── Main footer content ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span className="text-2xl font-black text-[#8C52FF]">VOX</span>
              <span className="text-2xl font-black text-white">Market</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Your voice-powered shopping destination. Browse, search, and buy — all hands-free.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <FiMapPin size={14} className="text-[#8C52FF] shrink-0" />
                House No. 01, Lucknow, India
              </a>
              <a href="mailto:voxmarket47@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <FiMail size={14} className="text-[#8C52FF] shrink-0" />
                voxmarket47@gmail.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition-colors">
                <FiPhone size={14} className="text-[#8C52FF] shrink-0" />
                +91 12345 67890
              </a>
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm hover:text-white hover:gap-2.5 transition-all group"
                  >
                    <FiArrowRight size={12} className="text-[#8C52FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social ── */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Follow Us</h3>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#8C52FF] flex items-center justify-center transition-colors">
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Newsletter</h3>
            <p className="text-sm leading-relaxed mb-4">
              Get the latest deals and product updates straight to your inbox.
            </p>
            {subscribed ? (
              <div className="bg-[#8C52FF]/10 border border-[#8C52FF]/30 rounded-xl p-4 text-sm text-[#a97dff] font-semibold text-center">
                🎉 You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#8C52FF] hover:bg-[#7a3ff0] text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] shadow-md shadow-purple-900/30"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">VOX Market</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
