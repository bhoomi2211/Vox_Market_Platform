"use client";
import useCartContext from "@/context/CartContext";
import useVoiceContext from "@/context/VoiceContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiUser, FiShoppingCart, FiMenu, FiX, FiMic } from "react-icons/fi";
import CartPage from "./MyCart";

const Navbar = () => {
  const { cartItems, cartOpen, setCartOpen } = useCartContext();
  const { finalTranscript, voiceResponse, resetTranscript, listening, startListening } = useVoiceContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Voice commands ──
  useEffect(() => {
    if (!finalTranscript) return;
    const t = finalTranscript.toLowerCase();
    if (t.includes('open cart') || t.includes('open card')) {
      voiceResponse('Opening cart page.');
      setCartOpen(true);
      resetTranscript();
    } else if (t.includes('close cart') || t.includes('close card')) {
      voiceResponse('Closing cart page.');
      setCartOpen(false);
      resetTranscript();
    }
  }, [finalTranscript]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/productView' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {cartOpen && <CartPage />}

      <header className={`sticky top-0 z-40 bg-[#1E2852] transition-shadow duration-200 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span className="text-2xl font-black text-[#8C52FF] tracking-tight">VOX</span>
              <span className="text-2xl font-black text-white tracking-tight">Market</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#8C52FF] group-hover:w-full transition-all duration-200 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Voice */}
              {typeof startListening === 'function' && (
                <button
                  onClick={startListening}
                  title="Voice command"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all
                    ${listening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'}`}
                >
                  <FiMic size={14} />
                  {listening ? 'Listening' : 'Voice'}
                </button>
              )}

              {/* Seller login */}
              <Link
                href="/sellerLogin"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiUser size={14} />
                Seller
              </Link>

              {/* User login */}
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Login
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#8C52FF] hover:bg-[#7a3ff0] text-white transition-all shadow-md shadow-purple-900/30"
              >
                <FiShoppingCart size={14} />
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* ── Mobile: cart + hamburger ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <FiShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(m => !m)}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 border-t border-white/10' : 'max-h-0'}`}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-2" />
            <Link href="/sellerLogin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl transition-all">
              <FiUser size={15} /> Seller Login
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              User Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
