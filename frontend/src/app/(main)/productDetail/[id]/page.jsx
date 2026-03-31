"use client";
import useCartContext from "@/context/CartContext";
import useVoiceContext from "@/context/VoiceContext";
import { IconShoppingCartCopy, IconHeart, IconShare, IconTruck, IconShieldCheck, IconArrowLeft, IconStar } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const StarDisplay = ({ rating = 0 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ─── Review Card ──────────────────────────────────────────────────────────────

const ReviewCard = ({ review }) => (
  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
          {review.user?.fname?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{review.user?.fname} {review.user?.lname}</p>
          <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1">
        <IconStar size={12} className="text-amber-400 fill-amber-400" />
        <span className="text-xs font-bold text-amber-600">{review.rating}</span>
      </div>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed">{review.review}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [currentUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("user")); } catch { return null; }
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishListed, setWishListed] = useState(false);
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reviewRef = useRef();

  const { addItemToCart, isInCart } = useCartContext();
  const { finalTranscript, resetTranscript, voiceResponse, triggerModal } = useVoiceContext();

  // ── Voice commands ──
  useEffect(() => {
    if (!finalTranscript || !productDetails) return;
    const t = finalTranscript.toLowerCase();
    if (t.includes("add to cart") || t.includes("add to card")) {
      addItemToCart(productDetails);
      voiceResponse(`${productDetails.pname} added to cart`);
      triggerModal("Product added to cart", `${productDetails.pname} added to cart`, true, <IconShoppingCartCopy size={50} />);
      resetTranscript();
    }
  }, [finalTranscript]);

  // ── Fetch product ──
  const fetchProductData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/product/getbyid/${id}`);
      const data = await res.json();
      console.log(data);
      
      setProductDetails(data);
      if (data.colors?.length) setSelectedColor(data.colors[0]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => { fetchProductData(); }, []);

  // ── Submit review ──
  const submitReview = async () => {
    if (!reviewRef.current?.value.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token,
        },
        body: JSON.stringify({
          product: productDetails._id,
          rating,
          review: reviewRef.current.value,
        }),
      });
      if (res.status === 200) {
        toast.success("Review added successfully");
        reviewRef.current.value = '';
        setRating(5);
        fetchProductData();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading state ──
  if (!productDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading product…</p>
        </div>
      </div>
    );
  }

  const inCart = isInCart(productDetails);
  const originalPrice = Math.round(productDetails.pprice * 1.3);
  const discount = Math.round(((originalPrice - productDetails.pprice) / originalPrice) * 100);
  const avgRating = productDetails.reviews?.length
    ? (productDetails.reviews.reduce((s, r) => s + r.rating, 0) / productDetails.reviews.length).toFixed(1)
    : null;
  const images = productDetails.images || [];
  const sizes = productDetails.sizes || ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{productDetails.pname}</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* ── Image Gallery ── */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 aspect-square shadow-sm">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${images[selectedImage]}`}
                alt={productDetails.pname}
                className="w-full h-full object-contain object-center p-6 transition-opacity duration-300"
              />
              {/* Badges */}
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {discount}% OFF
              </span>
              {/* Wishlist */}
              <button
                onClick={() => setWishListed(w => !w)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-sm
                  ${wishListed ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-red-400'}`}
              >
                <IconHeart size={18} className={wishListed ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all
                      ${selectedImage === i ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${img}`}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-6 py-2">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  {productDetails.category || 'Brand'}
                </span>
                {productDetails.seller && (
                  <span className="text-xs text-gray-400">
                    · by {productDetails.seller.fname} {productDetails.seller.lname}
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                {productDetails.pname}
              </h1>
            </div>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5">
                  <StarDisplay rating={parseFloat(avgRating)} />
                  <span className="text-sm font-bold text-amber-700">{avgRating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {productDetails.reviews?.length} review{productDetails.reviews?.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{productDetails.pdetail}</p>

            {/* Colors */}
            {productDetails.colors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Color: <span className="font-normal text-gray-500 capitalize">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {productDetails.colors.map((color) => (
                    <button
                      key={color}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'ring-2 ring-indigo-500 ring-offset-2 border-indigo-300' : 'border-gray-200 hover:border-gray-400'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-9 min-w-[2.5rem] px-3 rounded-xl text-sm font-semibold border-2 transition-all
                      ${selectedSize === size
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-gray-900">₹{productDetails.pprice?.toLocaleString('en-IN')}</span>
                <span className="text-lg text-gray-400 line-through mb-0.5">₹{originalPrice.toLocaleString('en-IN')}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full mb-0.5">
                  Save {discount}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes · Free shipping above ₹499</p>
            </div>

            {/* Delivery badges */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                <IconTruck size={15} className="text-indigo-500" />
                2–4 day delivery
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                <IconShieldCheck size={15} className="text-green-500" />
                1 year warranty
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                disabled={inCart}
                onClick={() => addItemToCart(productDetails)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all
                  ${inCart
                    ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-lg shadow-indigo-200'}`}
              >
                <IconShoppingCartCopy size={18} />
                {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <Link
                href="/user/checkout"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white shadow-lg shadow-gray-200 transition-all"
              >
                Buy Now
              </Link>
              <button
                className="w-12 h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all"
                onClick={() => { navigator.share?.({ title: productDetails.pname, url: window.location.href }); }}
              >
                <IconShare size={18} />
              </button>
            </div>

            {/* Features */}
            {productDetails.features?.length > 0 && (
              <div className="border-t border-gray-100 pt-5">
                <p className="text-sm font-bold text-gray-700 mb-3">Key Features</p>
                <ul className="space-y-2">
                  {productDetails.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span className="font-medium text-gray-700">{f}:</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── Reviews Section ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-black text-gray-900">Reviews</h2>
            {avgRating && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
                <StarDisplay rating={parseFloat(avgRating)} />
                <span className="text-sm font-bold text-amber-700">{avgRating}</span>
                <span className="text-xs text-gray-400">({productDetails.reviews?.length})</span>
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Existing reviews */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Customer Reviews</h3>
              {productDetails.reviews?.length > 0 ? (
                productDetails.reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))
              ) : (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                  <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>

            {/* Review form */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Write a Review</h3>
              {currentUser ? (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Your Rating</p>
                    <StarRatings
                      rating={rating}
                      starRatedColor="#f59e0b"
                      starHoverColor="#f59e0b"
                      changeRating={setRating}
                      numberOfStars={5}
                      starDimension="28px"
                      starSpacing="3px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Your Review</p>
                    <textarea
                      ref={reviewRef}
                      rows={4}
                      placeholder="Share your experience with this product…"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={submitReview}
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] shadow-md shadow-indigo-100"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                </div>
              ) : (
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 text-center">
                  <p className="text-sm text-indigo-700 font-medium mb-3">Log in to leave a review</p>
                  <Link
                    href="/login"
                    className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
