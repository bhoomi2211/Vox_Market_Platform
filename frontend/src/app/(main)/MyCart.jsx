"use client";
import React, { useEffect } from "react";
import useCartContext from "@/context/CartContext";
import useVoiceContext from "@/context/VoiceContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX, FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

const CartPage = () => {
  const router = useRouter();

  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    setCartOpen,
    getCartTotal,
    getCartItemsCount,
  } = useCartContext();

  const { finalTranscript, voiceResponse, resetTranscript } = useVoiceContext();

  // ── Voice commands ──
  useEffect(() => {
    if (!finalTranscript) return;
    const t = finalTranscript.toLowerCase();
    if (t.includes("clear cart") || t.includes("clear card")) {
      voiceResponse("Cart cleared.");
      clearCart();
      resetTranscript();
    } else if (t.includes("check out")) {
      voiceResponse("Redirecting to checkout.");
      setCartOpen(false);
      router.push("/user/checkout");
      resetTranscript();
    } else if (t.includes("close cart") || t.includes("close card")) {
      voiceResponse("Closing cart.");
      setCartOpen(false);
      resetTranscript();
    }
  }, [finalTranscript]);

  const itemCount = getCartItemsCount();
  const total = getCartTotal();

  return (
    <div className="relative z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <div className="pointer-events-auto w-screen max-w-md flex flex-col bg-gray-50 shadow-2xl">

              {/* ── Header ── */}
              <div className="bg-[#1E2852] px-6 py-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <FiShoppingBag size={20} className="text-[#8C52FF]" />
                  <h2 id="cart-title" className="text-lg font-black text-white">
                    Your Cart
                    {itemCount > 0 && (
                      <span className="ml-2 text-sm font-bold bg-[#8C52FF] text-white px-2 py-0.5 rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* ── Items ── */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {itemCount === 0 ? (
                  // Empty state
                  <div className="flex flex-col items-center justify-center h-full gap-5 py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiShoppingBag size={32} className="text-gray-300" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-700 mb-1">Your cart is empty</p>
                      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                        Add some products to your cart before proceeding to checkout.
                      </p>
                    </div>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-3 bg-[#1E2852] hover:bg-[#2a3a70] text-white text-sm font-bold rounded-xl transition"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      onAdd={() => addItemToCart(item)}
                      onRemove={() => removeItemFromCart(item)}
                    />
                  ))
                )}
              </div>

              {/* ── Footer ── */}
              {itemCount > 0 && (
                <div className="bg-white border-t border-gray-200 px-5 py-5 shrink-0 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                    <span className="text-xl font-black text-gray-900">₹{total?.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-gray-400 -mt-2">Taxes and shipping calculated at checkout</p>

                  {/* CTA buttons */}
                  <Link
                    href="/user/checkout"
                    onClick={() => setCartOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1E2852] hover:bg-[#2a3a70] text-white text-sm font-bold rounded-xl transition shadow-md"
                  >
                    Proceed to Checkout
                    <FiArrowRight size={16} />
                  </Link>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { clearCart(); }}
                      className="flex items-center justify-center gap-1.5 flex-1 py-2.5 border-2 border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-xl transition"
                    >
                      <FiTrash2 size={14} />
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold rounded-xl transition"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Cart Item Card ─────────────────────────────────────────────────────────────

const CartItem = ({ item, onAdd, onRemove }) => {
  const imageUrl = item.images?.[0]
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/${item.images[0]}`
    : null;

  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.pname}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <FiShoppingBag size={24} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.pname}</p>
          {item.category && (
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.category}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <span className="text-sm font-black text-gray-900">
            ₹{(item.pprice * (item.quantity || 1)).toLocaleString("en-IN")}
          </span>

          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={onRemove}
              className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition"
            >
              <FiMinus size={11} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-gray-800">
              {item.quantity || 1}
            </span>
            <button
              onClick={onAdd}
              className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
            >
              <FiPlus size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
