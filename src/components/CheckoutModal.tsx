import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import { trackAddShippingInfo, trackAddPaymentInfo, trackPurchase } from '../services/analytics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
  onNavigateHome: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  onNavigateHome
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Shipping, 2: Delivery, 3: Payment, 4: Success
  const [shippingData, setShippingData] = useState({
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@google.com',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043'
  });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card' | 'apple'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'express' ? 12.00 : (subtotal >= 50 ? 0 : 5.99);
  const tax = Number((subtotal * 0.0825).toFixed(2));
  const total = subtotal + shippingFee + tax;

  const handleNextToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextToPayment = () => {
    trackAddShippingInfo(shippingMethod === 'express' ? 'Express Next Day' : 'Standard 2-3 Day', total);
    setStep(3);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    trackAddPaymentInfo(paymentMethod.toUpperCase(), total);

    setTimeout(() => {
      const generatedOrderId = `GMS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrderId);
      trackPurchase(
        generatedOrderId,
        cartItems.map(i => ({ product: i.product, quantity: i.quantity })),
        total
      );
      setIsProcessing(false);
      setStep(4);
      onClearCart();
    }, 1200);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div
        id="checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-[#E5E0D8] relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold font-mono text-sm">
              {step <= 3 ? step : '✓'}
            </div>
            <div>
              <h2 className="font-bold text-[#1A1A1A] text-lg font-display">
                {step === 1 && '1. Shipping Address'}
                {step === 2 && '2. Delivery Method'}
                {step === 3 && '3. Payment & Confirmation'}
                {step === 4 && 'Order Confirmed!'}
              </h2>
              <span className="text-xs text-stone-500 font-mono">
                {step <= 3 ? `Step ${step} of 3 • Secure SSL Encrypted` : `Receipt #${orderId}`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-stone-400 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Shipping Address Form */}
        {step === 1 && (
          <form onSubmit={handleNextToDelivery} className="py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={shippingData.firstName}
                  onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={shippingData.lastName}
                  onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={shippingData.email}
                onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={shippingData.address}
                onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shippingData.city}
                  onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">State</label>
                <input
                  type="text"
                  required
                  value={shippingData.state}
                  onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={shippingData.zip}
                  onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Delivery Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Delivery Options */}
        {step === 2 && (
          <div className="py-6 space-y-4">
            <div className="space-y-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-[#C85A32] bg-white ring-1 ring-[#C85A32]'
                    : 'border-[#E5E0D8] bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#C85A32]" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] text-sm block">Standard Delivery (2-3 Business Days)</span>
                    <span className="text-xs text-stone-500">Dispatches from Mountain View, CA Fulfillment Center</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-sm text-[#1A1A1A]">
                  {subtotal >= 50 ? 'FREE' : '$5.99'}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-[#C85A32] bg-white ring-1 ring-[#C85A32]'
                    : 'border-[#E5E0D8] bg-white hover:border-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C99436]" />
                  <div>
                    <span className="font-bold text-[#1A1A1A] text-sm block">Express Priority Overnight</span>
                    <span className="text-xs text-stone-500">Guaranteed next-day delivery by 10:30 AM</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-sm text-[#1A1A1A]">$12.00</span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-stone-600 hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Address</span>
              </button>

              <button
                onClick={handleNextToPayment}
                className="px-6 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment Method & Review */}
        {step === 3 && (
          <div className="py-6 space-y-6">
            {/* Payment Method Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 block uppercase font-mono tracking-wider">
                Select Express Payment
              </span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'gpay'
                      ? 'border-[#C85A32] bg-white text-[#C85A32] ring-1 ring-[#C85A32]'
                      : 'border-[#E5E0D8] bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>Google Pay</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#C85A32] bg-white text-[#C85A32] ring-1 ring-[#C85A32]'
                      : 'border-[#E5E0D8] bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'border-[#C85A32] bg-white text-[#C85A32] ring-1 ring-[#C85A32]'
                      : 'border-[#E5E0D8] bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            {/* Order Summary Recap */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E0D8] space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="font-mono font-bold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping ({shippingMethod})</span>
                <span className="font-mono text-[#1A1A1A]">${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax (CA 8.25%)</span>
                <span className="font-mono text-[#1A1A1A]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1A1A1A] pt-2 border-t border-[#E5E0D8]">
                <span>Total Due</span>
                <span className="font-mono text-base text-[#C85A32]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Purchase Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-stone-600 hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="px-8 py-4 rounded-2xl bg-[#4A6B53] hover:bg-[#3d5944] text-white text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'Authorizing Payment...' : `Place Order • $${total.toFixed(2)}`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Screen */}
        {step === 4 && (
          <div className="py-10 text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-[#4A6B53]/15 text-[#4A6B53] mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] font-display">
                Thank you for your order!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your order confirmation has been sent to <strong className="text-[#1A1A1A]">{shippingData.email}</strong>. Our Sunnyvale fulfillment team is preparing your package.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5E0D8] max-w-md mx-auto text-left text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-500">Order ID:</span>
                <span className="font-bold text-[#1A1A1A]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Destination:</span>
                <span className="text-[#1A1A1A]">{shippingData.city}, {shippingData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Est. Delivery:</span>
                <span className="text-[#4A6B53] font-bold">In 2 Business Days</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  onClose();
                  onNavigateHome();
                }}
                className="px-8 py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Continue Exploring Merchandise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
