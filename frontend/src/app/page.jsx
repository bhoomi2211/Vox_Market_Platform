"use client";
import Navbar from "./(main)/navbar";
import Footer from "./(main)/footer";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import "swiper/css/navigation";
import { Autoplay, Pagination } from 'swiper/modules';
import Link from "next/link";
import VortexSection from "./VortexSection";
import VoiceCommandsCard from "./VoiceCommandCard";

const commands = [
  { command: "Hey VOX", description: "Wake up the assistant" },
  { command: "Start Listening", description: "Wake up the assistant" },
  { command: "I want to buy something", description: "View all products" },
  { command: "Scroll up/down", description: "Navigate the page" },
  { command: "Move to top/bottom", description: "Jump to page extremes" },
  { command: "Search for [item]", description: "Search specific items" }
];

const Home = () => {
  return (
    <div className="bg-black">

      <Navbar />
        <VortexSection />
        <>
          {/* product-grid - start */}
          <div className="bg-black dark:text-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              {/* text - start */}
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
                  Featured Products
                </h2>
                <p className="mx-auto max-w-screen-md text-center text-gray-300 md:text-lg">
                  Explore our handpicked selection of top-rated products from trusted sellers. 
                  From electronics to fashion, find the best deals across all categories.
                </p>
              </div>
              {/* text - end */}
              <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-0 flex gap-2">
                      <span className="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                        -50%
                      </span>
                      <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-white">
                        New
                      </span>
                    </div>
                  </a>
                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-white transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        Fancy Outfit
                      </a>
                      <span className="text-gray-500">by Fancy Brand</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                      <span className="text-sm text-red-500 line-through">$39.99</span>
                    </div>
                  </div>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Nick Karvounis"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>
                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-white transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        Cool Outfit
                      </a>
                      <span className="text-gray-500">by Cool Brand</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">$29.99</span>
                    </div>
                  </div>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>
                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-white transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        Nice Outfit
                      </a>
                      <span className="text-gray-500">by Nice Brand</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">$35.00</span>
                    </div>
                  </div>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Vladimir Fedotov"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>
                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-white transition duration-100 hover:text-gray-500 lg:text-xl"
                      >
                        Lavish Outfit
                      </a>
                      <span className="text-gray-500">by Lavish Brand</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">$49.99</span>
                    </div>
                  </div>
                </div>
                {/* product - end */}
              </div>
            </div>
          </div>
          {/* product-grid - end */}
          {/* call to action - start */}
          <div className="bg-black py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
                {/* content - start */}
                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
                  <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">
                    Flash Sale!<br />
                    Up to 70% off
                  </h2>
                  <p className="mb-8 max-w-md text-gray-400">
                    Don't miss out on incredible deals across all categories. 
                    Limited time offers from our verified sellers. Shop now and save big!
                  </p>
                  <div className="mt-auto">
                    <a href="/flash-sale"
                      className="inline-block rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none hover:bg-blue-600">
                      View Deals
                    </a>
                  </div>
                </div>
                {/* content - end */}
                {/* image - start */}
                <div className="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
                  <img
                    src="https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?auto=format&q=75&fit=crop&crop=top&w=1000&h=500"
                    loading="lazy"
                    alt="Photo by Dom Hill"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                {/* image - end */}
              </div>
            </div>
          </div>
          {/* call to action - end */}
          {/* collections - start */}
          <div className="bg-black py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-8 text-center text-2xl font-bold text-white md:mb-12 lg:text-3xl">
                Popular Categories
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                  >
                    <img
                      src="https://5.imimg.com/data5/SELLER/Default/2021/4/CL/LC/NB/29238126/gadget-collage.jpeg"
                      loading="lazy"
                      alt="Electronics"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Electronics</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Gadgets & Tech
                      </span>
                    </div>
                  </a>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                  >
                    <img
                      src="https://assets.thehansindia.com/h-upload/2021/05/23/1077890-fashion.webp"
                      loading="lazy"
                      alt="Fashion"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Fashion</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Trending Styles
                      </span>
                    </div>
                  </a>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                  >
                    <img
                      src="https://images.meesho.com/images/products/281909249/b84uh_512.webp"
                      loading="lazy"
                      alt="Home & Living"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Home & Living</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Decor & Essentials
                      </span>
                    </div>
                  </a>
                </div>
                {/* product - end */}
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                  >
                    <img
                      src="https://img.gcimagazine.com/files/base/allured/all/image/2020/04/gci.850x425-Stackline-top-100.png?auto=format%2Ccompress&q=70&w=700"
                      loading="lazy"
                      alt="Beauty & Care"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Beauty & Care</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Self Care
                      </span>
                    </div>
                  </a>
                </div>
                {/* product - end */}
              </div>
            </div>
          </div>
          {/* collections - end */}
        </>
      <VoiceCommandsCard commands={commands} />
      <Footer />
    </div>
  );
};

export default Home;
