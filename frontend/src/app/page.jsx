"use client";
import Navbar from "./(main)/navbar";
import Footer from "./(main)/footer";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import VortexSection from "./VortexSection";
import VoiceCommandsCard from "./VoiceCommandCard";
import { FiArrowRight, FiMic, FiZap, FiShield, FiHeadphones } from "react-icons/fi";

// ─── Data ──────────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    tag: "New Arrivals",
    headline: "Shop with\nYour Voice",
    sub: "The first marketplace where you browse, search, and buy — completely hands-free.",
    cta: "Start Shopping",
    href: "/productView",
    accent: "#8C52FF",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&q=80&fit=crop&w=1200&h=600",
  },
  {
    tag: "Flash Sale",
    headline: "Up to 70%\nOff Today",
    sub: "Limited-time deals across electronics, fashion, and home categories.",
    cta: "View Deals",
    href: "/productView",
    accent: "#FF5C5C",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&q=80&fit=crop&w=1200&h=600",
  },
  {
    tag: "Trending",
    headline: "Top Picks\nThis Week",
    sub: "Handpicked by our editors. The best products from verified sellers.",
    cta: "Explore Now",
    href: "/productView",
    accent: "#00C9A7",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&q=80&fit=crop&w=1200&h=600",
  },
];

const featuredProducts = [
  {
    name: "Fancy Outfit",
    brand: "Fancy Brand",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    isNew: true,
    img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
  },
  {
    name: "Cool Outfit",
    brand: "Cool Brand",
    price: 2999,
    img: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
  },
  {
    name: "Nice Outfit",
    brand: "Nice Brand",
    price: 3500,
    img: "https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
  },
  {
    name: "Lavish Outfit",
    brand: "Lavish Brand",
    price: 4999,
    img: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
  },
];

const categories = [
  {
    label: "Electronics",
    sub: "Gadgets & Tech",
    href: "/productView?category=tech",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/CL/LC/NB/29238126/gadget-collage.jpeg",
    color: "#8C52FF",
  },
  {
    label: "Fashion",
    sub: "Trending Styles",
    href: "/productView?category=cloth",
    img: "https://assets.thehansindia.com/h-upload/2021/05/23/1077890-fashion.webp",
    color: "#FF5C5C",
  },
  {
    label: "Home & Living",
    sub: "Decor & Essentials",
    href: "/productView?category=home",
    img: "https://images.meesho.com/images/products/281909249/b84uh_512.webp",
    color: "#00C9A7",
  },
  {
    label: "Beauty & Care",
    sub: "Self Care",
    href: "/productView?category=beauty",
    img: "https://img.gcimagazine.com/files/base/allured/all/image/2020/04/gci.850x425-Stackline-top-100.png?auto=format%2Ccompress&q=70&w=700",
    color: "#FFB800",
  },
];

const features = [
  { icon: <FiMic size={22} />, title: "Voice Shopping", desc: "Browse and buy using natural voice commands — no typing required." },
  { icon: <FiZap size={22} />, title: "Instant Results", desc: "AI-powered search delivers accurate product results in milliseconds." },
  { icon: <FiShield size={22} />, title: "Secure Checkout", desc: "Your transactions are protected with end-to-end encryption." },
  { icon: <FiHeadphones size={22} />, title: "24/7 Support", desc: "Our support team is available round the clock to help you." },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const ProductCard = ({ product }) => (
  <div className="group">
    <Link
      href="/productView"
      className="relative block overflow-hidden rounded-2xl bg-gray-900 aspect-[3/4] mb-3 shadow-md"
    >
      <img
        src={product.img}
        loading="lazy"
        alt={product.name}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {product.discount && (
          <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#8C52FF] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      {/* Quick shop on hover */}
      <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-gray-900 text-xs font-black rounded-xl">
          Quick Shop <FiArrowRight size={12} />
        </span>
      </div>
    </Link>

    <div className="flex items-start justify-between gap-2 px-1">
      <div>
        <p className="font-bold text-white text-sm leading-snug">{product.name}</p>
        <p className="text-gray-500 text-xs mt-0.5">{product.brand}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-black text-white text-sm">₹{product.price.toLocaleString("en-IN")}</p>
        {product.originalPrice && (
          <p className="text-xs text-red-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</p>
        )}
      </div>
    </div>
  </div>
);

const CategoryCard = ({ cat }) => (
  <Link
    href={cat.href}
    className="group relative flex h-72 items-end overflow-hidden rounded-2xl p-4 shadow-md"
  >
    <img
      src={cat.img}
      loading="lazy"
      alt={cat.label}
      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
    />
    {/* Dark gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

    <div className="relative w-full">
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: cat.color }}>
        {cat.label}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-black text-white">{cat.sub}</p>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
          style={{ backgroundColor: cat.color }}
        >
          <FiArrowRight size={14} className="text-white" />
        </span>
      </div>
    </div>
  </Link>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const Home = () => {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <Navbar />

      {/* ── Hero Swiper ── */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden">
                {/* Background image */}
                <img
                  src={slide.img}
                  alt={slide.headline}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

                {/* Content */}
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
                  <div className="max-w-xl">
                    <span
                      className="inline-block text-xs font-black uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full border"
                      style={{ color: slide.accent, borderColor: `${slide.accent}40`, backgroundColor: `${slide.accent}15` }}
                    >
                      {slide.tag}
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 whitespace-pre-line">
                      {slide.headline}
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">
                      {slide.sub}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-wider rounded-2xl text-white transition-all hover:gap-5 shadow-lg"
                      style={{ backgroundColor: slide.accent }}
                    >
                      {slide.cta} <FiArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10 z-10">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-4 grid grid-cols-3 divide-x divide-white/10 text-center">
            {[
              { val: "10K+", label: "Products" },
              { val: "500+", label: "Sellers" },
              { val: "50K+", label: "Happy Buyers" },
            ].map((s) => (
              <div key={s.label} className="px-4">
                <p className="text-xl font-black text-white">{s.val}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vortex / Voice Section ── */}
      {/* <VortexSection /> */}

      {/* ── Featured Products ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#8C52FF] text-xs font-black uppercase tracking-[0.2em] mb-2">Handpicked</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">Featured Products</h2>
            </div>
            <Link
              href="/productView"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
            >
              View all <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:hidden">
            <Link
              href="/productView"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition"
            >
              View all products <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Flash Sale Banner ── */}
      <section className="py-6 sm:py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E2852] to-[#0d1530] border border-white/10 shadow-2xl">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8C52FF]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center">
              {/* Text */}
              <div className="flex flex-col p-8 sm:p-12 sm:w-1/2 lg:w-2/5">
                <span className="text-red-400 text-xs font-black uppercase tracking-[0.2em] mb-3">⚡ Limited Time</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Flash Sale!<br />
                  <span className="text-[#8C52FF]">Up to 70% off</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                  Incredible deals across all categories from verified sellers. Don't miss out.
                </p>
                <Link
                  href="/productView"
                  className="inline-flex items-center gap-3 self-start px-8 py-4 bg-[#8C52FF] hover:bg-[#7a3ff0] text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all hover:gap-5 shadow-lg shadow-purple-900/30"
                >
                  Shop Now <FiArrowRight size={16} />
                </Link>
              </div>

              {/* Image */}
              <div className="sm:w-1/2 lg:w-3/5 h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&w=1000&h=500"
                  loading="lazy"
                  alt="Sale"
                  className="h-full w-full object-cover object-center sm:rounded-r-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8C52FF] text-xs font-black uppercase tracking-[0.2em] mb-2">Browse by</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Popular Categories</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.label} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features / Why VOX ── */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8C52FF] text-xs font-black uppercase tracking-[0.2em] mb-2">Why choose us</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Why VOX Market?</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8C52FF]/40 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8C52FF]/15 flex items-center justify-center text-[#8C52FF] mb-4 group-hover:bg-[#8C52FF]/25 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-sm font-black text-white mb-2">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voice Commands Card ── */}
      <VoiceCommandsCard />

      <Footer />
    </div>
  );
};

export default Home;
