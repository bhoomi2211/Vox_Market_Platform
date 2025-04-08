"use client";
import React, { useEffect, useState } from "react";
import { stringSimilarity } from "string-similarity-js";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import useCartContext from "@/context/CartContext";
import useVoiceContext from "@/context/VoiceContext";
import { IconFilter, IconMicrophone, IconShoppingCart } from "@tabler/icons-react";
import pluralize from "pluralize";
import { useRouter } from "next/navigation";
import VoiceCommandsCard from "@/app/VoiceCommandCard";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Cloth', href: '/cloth' },
  { name: 'Tech', href: '/TECH' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'color',
    options: [
      { value: 'white', label: 'White', checked: false, onchange: (e) => { filterByColor("white") } },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'category',
    options: [
      { value: 'cloth', label: 'ctoth', checked: false, onchange: (e) => { filterByCategory("cloth") } },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: false },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: false },
    ],
  },
]

const commands = [
  { command: "Hey VOX", description: "Wake up the assistant" },
  { command: "Browse products", description: "View all products" },
  { command: "Scroll up/down", description: "Navigate the page" },
  { command: "Move to top/bottom", description: "Jump to page extremes" },
  { command: "Search for [item]", description: "Search specific items" },
  { command: "Show categories", description: "View product categories" }
];

const ProductView = () => {

  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [masterList, setMasterList] = useState([]);

  const [uniqueFilters, setUniqueFilters] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { addItemToCart, isInCart } = useCartContext();

  const {
    transcript,
    resetTranscript,
    interpretVoiceCommand,
    fillInputUsingVoice,
    performActionUsingVoice,
    finalTranscript,
    voiceResponse,
    voices,
    triggerModal,
    checkExistenceInTranscript
  } = useVoiceContext();

  useEffect(() => {
    if (finalTranscript.includes('show me some ')) {
      const product = pluralize.singular(finalTranscript.split(' ').at(-1));
      // console.log((product), product);
      searchProduct(product);
      resetTranscript();
      voiceResponse(`Here are some ${product}s for you`);
      triggerModal(
        `Here are some ${product} for you`,
        'Please ask or select the product you want to buy',
        true,
        <IconShoppingCart size={50} />
      );
    }
    else if (finalTranscript.includes('search product') || finalTranscript.includes('browse product')) {
      const product = pluralize.singular(finalTranscript.split(' ').slice(2).join(' '));
      // console.log((product), product);
      searchProduct(product);
      resetTranscript();
      voiceResponse(`Here is your ${product}`);
      triggerModal(
        `Here is your ${product}`,
        'Please ask or select the product you want to buy',
        true,
        <IconShoppingCart size={50} />
      );
    } else if (finalTranscript.includes('filter by category')) {
      const category = pluralize.singular(finalTranscript.split(' ').at(-1));
      // console.log((product), product);
      filterByCategory(category);
      resetTranscript();
      voiceResponse(`Here are some ${category}s for you`);
      triggerModal(
        `Here are some ${category} for you`,
        '',
        true,
        <IconFilter size={50} />
      );
    }
    else if (finalTranscript.includes('View Product number '.toLowerCase()) || finalTranscript.includes('Open Product number '.toLowerCase())) {
      console.log(finalTranscript);
      const product = parseInt(finalTranscript.split(' ').at(-1));
      // console.log((product), product);
      resetTranscript();
      router.push(`/productDetail/${productList[product - 1]._id}`);
    }
    else if (finalTranscript.includes('price lower than'.toLowerCase())) {
      console.log(finalTranscript);
      const price = parseInt(finalTranscript.split(' ').at(-1));
      console.log(price);
      filterByMaxPrice(price);
      voiceResponse(`Here are some products with price less than ${price}`);
      resetTranscript();
    }
    else if (finalTranscript.includes('price greater than'.toLowerCase())) {
      console.log(finalTranscript);
      const price = parseInt(finalTranscript.split(' ').at(-1));
      console.log(price);
      filterByMinPrice(price);
      voiceResponse(`Here are some products with price greater than ${price}`);
      resetTranscript();
    }
    else if (finalTranscript.includes('clear search')) {
      setProductList(masterList);
      resetTranscript();
    }
  }, [finalTranscript])

  const sliceText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }


  const fetchProductData = () => {
    fetch("http://localhost:5000/product/getall")
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProductList(data);
        setMasterList(data);
        const filters = [...new Set(data.map(product => (
          product.features.map(feature => feature.name)
        )).flat())]
        console.log(filters);
        setUniqueFilters(
          data.map((product) => product.colors).flat().filter((value, index, self) => self.indexOf(value) === index)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProductData();
  }, []);


  const filterByCategory = (category) => {
    const filteredProduct = masterList.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
    setProductList(filteredProduct);
  }

  const filterByMaxPrice = (price) => {
    const filteredProduct = masterList.filter(product => product.pprice <= price);
    setProductList(filteredProduct);
  }

  const filterByMinPrice = (price) => {
    const filteredProduct = masterList.filter(product => product.pprice >= price);
    setProductList(filteredProduct);
  }

  const searchProduct = (query) => {
    const filteredProduct = masterList.filter(product => product.pname.toLowerCase().includes(query.toLowerCase()));
    setProductList(filteredProduct);
  }

  const displayProducts = () => {
    return <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* text - start */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Selected
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as placeholder
              text. It shares some characteristics of a real written text but is
              random or otherwise generated.
            </p>
          </div>
          {/* text - end */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productList.length > 0 ?
              productList.map((product, index) => (
                <div>
                  <Link
                    href={"/productDetail/" + product._id}
                    className="group relative block h-84 overflow-hidden rounded-t-lg bg-gray-100"
                  >
                    <img
                      loading="lazy"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${product.images[0]}`}
                      alt={product.pname}
                      className="h-64 w-full object-contain object-center transition duration-200 group-hover:scale-110"
                    />
                    <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                      Product No. {index + 1}
                    </span>
                  </Link>
                  <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                    <div className="flex flex-col">
                      <Link
                        href={"/productDetail/" + product._id}
                        className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg"
                      >
                        {product.pname}
                      </Link>
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 lg:text-base">
                        sold by {product.seller.fname} {product.seller.lname}
                      </span>
                      <button disabled={isInCart(product)} onClick={e => addItemToCart(product)} className="mt-5 block w-full rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                        <IconShoppingCart className="inline" /> {isInCart(product) ? 'Already Added' : 'Add to Cart'}
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-xl">₹{product.pprice}</span>
                      {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-3xl font-bold text-red-300 my-48">No Products Found</div>
              )
            }

          </div>
        </div>
      </div>

    </>
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} >
          <Dialog as="div" className="relative z-18 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child

              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child

                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-2 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-5 max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-5 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">


              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-6 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a onClick={e => {
                        e.preventDefault();
                        filterByCategory(category.name);
                      }} href={category.href}>{category.name}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#" onClick={e => {
                      e.preventDefault();
                      fetchProductData();
                    }}>Reset Filter</a>
                  </li>
                </ul>

                {/* {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} */}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{displayProducts()}</div>
            </div>
          </section>
        </main>
      </div>
      <VoiceCommandsCard commands={commands} />
    </div>
  );
};

export default ProductView;
