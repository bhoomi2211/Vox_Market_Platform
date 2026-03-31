"use client";
import React, { useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import useCartContext from "@/context/CartContext";
import useVoiceContext from "@/context/VoiceContext";
import { IconMicrophone, IconShoppingCart, IconSearch, IconX, IconAdjustments } from "@tabler/icons-react";
import pluralize from "pluralize";
import { useRouter } from "next/navigation";
import VoiceCommandsCard from "@/app/VoiceCommandCard";

// ─── Static Data ──────────────────────────────────────────────────────────────

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
];

const subCategories = [
  { name: 'All', value: '' },
  { name: 'Clothing', value: 'fashion' },
  { name: 'Electronics', value: 'electronics' },
  { name: 'Travel Bags', value: 'travel' },
  { name: 'Accessories', value: 'accessories' },
  { name: 'Home & Kitchen', value: 'Home & Kitchen' },
];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L' },
      { value: '6l', label: '6L' },
      { value: '12l', label: '12L' },
      { value: '18l', label: '18L' },
      { value: '20l', label: '20L' },
      { value: '40l', label: '40L' },
    ],
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────

const StarRating = ({ rating = 5, count = 0 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-1 text-xs font-semibold text-gray-500">{rating.toFixed(1)}</span>
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

const ProductCard = ({ product, index, addItemToCart, isInCart }) => {
  const inCart = isInCart(product);
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/productDetail/${product._id}`} className="relative block overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_API_URL}/${product.images[0]}`}
          alt={product.pname}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 p-4"
        />
        {/* Badge */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          #{index + 1}
        </span>
        {/* Category pill */}
        {product.category && (
          <span className="absolute top-3 right-3 bg-white/80 backdrop-blur text-gray-600 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gray-200">
            {product.category}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/productDetail/${product._id}`} className="text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {product.pname}
          </Link>
          <span className="text-base font-black text-gray-900 whitespace-nowrap">₹{product.pprice?.toLocaleString('en-IN')}</span>
        </div>

        <StarRating rating={product.rating || 4.5} count={product.reviewCount || 0} />

        <p className="text-xs text-gray-400">
          Sold by <span className="text-gray-600 font-medium">{product.seller?.fname} {product.seller?.lname}</span>
        </p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex gap-1.5 items-center">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          disabled={inCart}
          onClick={() => addItemToCart(product)}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${inCart
              ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97] text-white shadow-sm shadow-indigo-200'
            }`}
        >
          <IconShoppingCart size={16} />
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const commands = [
  { command: "Hey VOX", description: "Wake up the assistant" },
  { command: "I want to buy something", description: "View all products" },
  { command: "Scroll up/down", description: "Navigate the page" },
  { command: "Move to top/bottom", description: "Jump to page extremes" },
  { command: "Search for [item]", description: "Search specific items" },
  { command:"Open sign up page", description:"Navigate sign up page"},
  { command:"Open login page", description: "Navigate log in page"}
  

];

const ProductView = () => {
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSortOption, setActiveSortOption] = useState('popular');
  const [activeFilters, setActiveFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { addItemToCart, isInCart } = useCartContext();

  const {
    resetTranscript,
    voiceResponse,
    finalTranscript,
    triggerModal,
    listening,
    startListening,
  } = useVoiceContext();

  // ── Voice command handler ──
  useEffect(() => {
    if (!finalTranscript) return;

    const t = finalTranscript.toLowerCase();

    if (t.includes('show me some ') || t.includes('search product') || t.includes('browse product')) {
      const words = t.split(' ');
      const product = pluralize.singular(words.at(-1));
      searchProduct(product);
      resetTranscript();
      voiceResponse(`Here are some ${product}s for you`);
      triggerModal(`Here are some ${product} for you`, 'Please ask or select the product you want to buy', true, <IconShoppingCart size={50} />);
    } else if (t.includes('filter by category')) {
      const category = t.split(' ').at(-1);
      applyCategory(category);
      resetTranscript();
      voiceResponse(`Filtering by ${category}`);
    } else if (t.includes('view product number') || t.includes('open product number')) {
      const num = parseInt(t.split(' ').at(-1));
      if (!isNaN(num) && productList[num - 1]) {
        router.push(`/productDetail/${productList[num - 1]._id}`);
      }
      resetTranscript();
    } else if (t.includes('price lower than')) {
      const price = parseInt(t.split(' ').at(-1));
      filterByMaxPrice(price);
      voiceResponse(`Showing products under ₹${price}`);
      resetTranscript();
    } else if (t.includes('price greater than')) {
      const price = parseInt(t.split(' ').at(-1));
      filterByMinPrice(price);
      voiceResponse(`Showing products above ₹${price}`);
      resetTranscript();
    } else if (t.includes('clear search') || t.includes('reset filter')) {
      setProductList(masterList);
      setSearchQuery('');
      setActiveCategory('');
      resetTranscript();
    }
  }, [finalTranscript]);

  // ── Fetch products ──
  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/product/getall`);
      const data = await res.json();
      setProductList(data);
      setMasterList(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProductData(); }, []);

  // ── Filter & sort helpers ──
  const applyCategory = (category) => {
    setActiveCategory(category);
    if (!category) {
      setProductList(masterList);
    } else {
      setProductList(masterList.filter(p => p.category?.toLowerCase().includes(category.toLowerCase())));
    }
  };

  const filterByMaxPrice = (price) => setProductList(masterList.filter(p => p.pprice <= price));
  const filterByMinPrice = (price) => setProductList(masterList.filter(p => p.pprice >= price));

  const searchProduct = (query) => {
    setSearchQuery(query);
    if (!query) { setProductList(masterList); return; }
    setProductList(masterList.filter(p => p.pname?.toLowerCase().includes(query.toLowerCase())));
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    searchProduct(q);
  };

  const toggleFilter = (sectionId, value) => {
    setActiveFilters(prev => {
      const existing = prev[sectionId] || [];
      const updated = existing.includes(value)
        ? existing.filter(v => v !== value)
        : [...existing, value];
      return { ...prev, [sectionId]: updated };
    });
  };

  const sortedProducts = [...productList].sort((a, b) => {
    if (activeSortOption === 'price_asc') return a.pprice - b.pprice;
    if (activeSortOption === 'price_desc') return b.pprice - a.pprice;
    if (activeSortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const activeFilterCount = Object.values(activeFilters).flat().length + (activeCategory ? 1 : 0);

  // ── Filter Sidebar ──
  const FilterSidebar = ({ mobile = false }) => (
    <div className={mobile ? '' : 'sticky top-24'}>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
          {searchQuery && (
            <button onClick={() => searchProduct('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</h3>
        <ul className="space-y-1">
          {subCategories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => applyCategory(cat.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${activeCategory === cat.value
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Attribute filters */}
      {filters.map((section) => (
        <Disclosure key={section.id} as="div" className="border-t border-gray-100 py-4" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors">
                <span>{section.name}</span>
                {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
              </Disclosure.Button>
              <Disclosure.Panel className="pt-3 space-y-2">
                {section.options.map((option) => {
                  const checked = (activeFilters[section.id] || []).includes(option.value);
                  return (
                    <label key={option.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(section.id, option.value)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                      />
                      {section.id === 'color' && (
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: option.value }} />
                      )}
                      <span className={`text-sm transition-colors ${checked ? 'text-indigo-700 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

      {/* Price filter */}
      <div className="border-t border-gray-100 py-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onBlur={(e) => e.target.value && filterByMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max ₹"
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onBlur={(e) => e.target.value && filterByMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => { fetchProductData(); setActiveCategory(''); setActiveFilters({}); setSearchQuery(''); }}
          className="mt-4 w-full text-center text-xs font-semibold text-red-500 hover:text-red-700 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  // ── Product Grid ──
  const ProductGrid = () => {
    if (isLoading) {
      return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-gray-100 aspect-[4/3]" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-10 bg-gray-100 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (sortedProducts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <IconSearch size={32} className="text-gray-300" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-700">No products found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
          <button
            onClick={() => { fetchProductData(); setActiveCategory(''); setActiveFilters({}); setSearchQuery(''); }}
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Reset filters
          </button>
        </div>
      );
    }

    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            index={index}
            addItemToCart={addItemToCart}
            isInCart={isInCart}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Mobile Filter Drawer ── */}
      <Transition.Root show={mobileFiltersOpen}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex h-full w-80 flex-col overflow-y-auto bg-white py-6 px-5 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <FilterSidebar mobile />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <h1 className="text-xl font-black text-gray-900 tracking-tight shrink-0">
              Products
              {!isLoading && (
                <span className="ml-2 text-sm font-normal text-gray-400">({sortedProducts.length})</span>
              )}
            </h1>

            {/* Sort + actions */}
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={activeSortOption}
                onChange={(e) => setActiveSortOption(e.target.value)}
                className="hidden sm:block text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.name}</option>
                ))}
              </select>

              {/* Voice button */}
              {typeof startListening === 'function' && (
                <button
                  onClick={startListening}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all
                    ${listening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  <IconMicrophone size={16} />
                  <span className="hidden sm:inline">{listening ? 'Listening…' : 'Voice'}</span>
                </button>
              )}

              {/* Mobile filter toggle */}
              <button
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <IconAdjustments size={16} />
                {activeFilterCount > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-200">
                    {activeCategory}
                    <button onClick={() => applyCategory('')} className="hover:text-indigo-900">
                      <IconX size={12} />
                    </button>
                  </span>
                )}
                {Object.entries(activeFilters).flatMap(([sectionId, values]) =>
                  values.map(v => (
                    <span key={`${sectionId}-${v}`} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-200">
                      {v}
                      <button onClick={() => toggleFilter(sectionId, v)} className="hover:text-indigo-900">
                        <IconX size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}

            <ProductGrid />
          </main>
        </div>
      </div>
      <VoiceCommandsCard commands={commands} />
    </div>
  );
};

export default ProductView;
