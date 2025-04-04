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


const Home = () => {
  return (
    <>

      <Navbar />

      <>
        <section>
          <div className="px-4 sm:px-6 lg:px-8 py-10">
            <div
              data-hs-carousel='{
"loadingClasses": "opacity-0"
    }'
              className="relative"
            >
              <div className="hs-carousel relative overflow-hidden w-full h-120 md:h-[calc(100vh-106px)]  bg-gray-100 rounded-2xl dark:bg-neutral-800">
                <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                  {/* Item */}
                  <div className="hs-carousel-slide">
                    <div className="h-120 md:h-[calc(100vh-106px)]  flex flex-col bg-[url('https://images.unsplash.com/photo-1615615228002-890bb61cac6e?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
                      <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                        <span className="block text-white">Nike React</span>
                        <span className="block text-white text-xl md:text-3xl">
                          Rewriting sport's playbook for billions of athletes
                        </span>
                        <div className="mt-5">
                          <a
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-transparent text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                          >
                            Read Case Studies
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Item */}
                  {/* Item */}
                  <div className="hs-carousel-slide">
                    <div className="h-120 md:h-[calc(100vh-106px)]  flex flex-col bg-[url('https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
                      <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                        <span className="block text-white">CoolApps</span>
                        <span className="block text-white text-xl md:text-3xl">
                          From mobile apps to gaming consoles
                        </span>
                        <div className="mt-5">
                          <a
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-transparent text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                          >
                            Read Case Studies
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Item */}
                  {/* Item */}
                  <div className="hs-carousel-slide">
                    <div className="h-120 md:h-[calc(100vh-106px)]  flex flex-col bg-[url('https://images.unsplash.com/photo-1629666451094-8908989cae90?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
                      <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
                        <span className="block text-white">Grumpy</span>
                        <span className="block text-white text-xl md:text-3xl">
                          Bringing Art to everything
                        </span>
                        <div className="mt-5">
                          <a
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-transparent text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                            href="#"
                          >
                            Read Case Studies
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Item */}
                </div>
              </div>
              {/* Arrows */}
              <button
                type="button"
                className="hs-carousel-prev hs-carousel-disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-12 h-full text-black hover:bg-white/20 rounded-s-2xl focus:outline-hidden focus:bg-white/20"
              >
                <span className="text-2xl" aria-hidden="true">
                  <svg
                    className="shrink-0 size-3.5 md:size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
                <span className="sr-only">Previous</span>
              </button>
              <button
                type="button"
                className="hs-carousel-next hs-carousel-disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-12 h-full text-black hover:bg-white/20 rounded-e-2xl focus:outline-hidden focus:bg-white/20"
              >
                <span className="sr-only">Next</span>
                <span className="text-2xl" aria-hidden="true">
                  <svg
                    className="shrink-0 size-3.5 md:size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </button>
              {/* End Arrows */}
            </div>
          </div>
          {/* <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}

            modules={[Autoplay, Pagination]}
            className="mySwiper h-[70vh] w-full "
          >
            <SwiperSlide style={{ backgroundSize: "cover" }} className="bg-[url('https://wallpaperaccess.com/full/1448067.jpg')]"></SwiperSlide>

            <SwiperSlide style={{ backgroundSize: "cover" }} className="bg-[url('https://cdn.thecoolist.com/wp-content/uploads/2021/05/Men-clothing-websites.jpg')]"></SwiperSlide>
            <SwiperSlide style={{ backgroundSize: "cover" }} className=" bg-[url('https://wallpaperaccess.com/full/5633830.jpg')]"></SwiperSlide>

          </Swiper> */}
        </section>

        <>

          {/* product-grid - start */}
          <div className="bg-[#1d232a] dark:text-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              {/* text - start */}
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
                  Selected
                </h2>
                <p className="mx-auto max-w-screen-md text-center md:text-lg">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real written
                  text but is random or otherwise generated.
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
          <div className="bg-[#1d232a] py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
                {/* content - start */}
                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
                  <h2 className="mb-4 text-xl font-bold text-white md:text-2xl lg:text-4xl">
                    Summer Sale
                    <br />
                    Up to 70% off.
                  </h2>
                  <p className="mb-8 max-w-md text-gray-400">
                    This is a section of some simple filler text, also known as
                    placeholder text. It shares some characteristics of a real written
                    text.
                  </p>
                  <div className="mt-auto">
                    <a
                      href="#"
                      className="inline-block rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                    >
                      Save now
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
          <div className="bg-[#1d232a] py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-8 text-center text-2xl font-bold text-white md:mb-12 lg:text-3xl">
                Collections
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {/* product - start */}
                <div>
                  <a
                    href="#"
                    className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Men</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Business Causual
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
                      src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by engin akyurt"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Women</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Summer Season
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
                      src="https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Men</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Streetwear
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
                      src="https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700"
                      loading="lazy"
                      alt="Photo by Austin Wade"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="relative flex w-full flex-col rounded-lg bg-[#1d232a] p-4 text-center">
                      <span className="text-gray-500">Women</span>
                      <span className="text-lg font-bold text-white lg:text-xl">
                        Sale
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
      </>
      <Footer />
    </>
  );
};

export default Home;
