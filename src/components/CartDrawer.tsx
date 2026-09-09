import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { trackBeginCheckout, trackRemoveFromCart } from '../services/analytics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
  upsellProducts: Product[];
  onQuickAddUpsell: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onSelectProduct,
  upsellProducts,
  onQuickAddUpsell
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shippingThreshold = 50;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingAmount = subtotal > 0 ? (freeShipping ? 0 : 5.99) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingAmount);
  const progressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'RETRO1998') {
      setAppliedDiscount(15);
      setPromoMessage('15% 1998 Retro VIP discount applied!');
    } else if (cleanCode === 'GOOGLEAI') {
      setAppliedDiscount(10);
      setPromoMessage('10% Google AI Developer discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "RETRO1998"');
    }
  };

  const handleCheckoutClick = () => {
    trackBeginCheckout(
      cartItems.map(i => ({ product: i.product, quantity: i.quantity })),
      finalTotal
    );
    onClose();
    onProceedToCheckout();
  };

  return (
    <div
      id="cart-drawer-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in"
    >
      <div
        id="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E5E0D8]"
      >
        {/* Cart Header */}
        <div className="p-6 border-b border-[#E5E0D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
            <h2 className="font-bold text-[#1A1A1A] text-lg font-display">
              Your Shopping Bag ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF8F5] text-stone-400 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-white px-6 py-3 border-b border-[#E5E0D8] space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-stone-800">
              <Truck className="w-3.5 h-3.5 text-[#C85A32]" />
              {freeShipping ? (
                <span className="text-[#4A6B53] font-bold">You unlocked Free US Shipping!</span>
              ) : (
                <span>Add ${(shippingThreshold - subtotal).toFixed(2)} more for Free Shipping</span>
              )}
            </div>
            <span className="font-mono text-stone-500">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#E5E0D8] overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                freeShipping ? 'bg-[#4A6B53]' : 'bg-[#C85A32]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs"
              >
                <div
                  onClick={() => {
                    onSelectProduct(item.product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl bg-[#FAF8F5] p-2 flex items-center justify-center shrink-0 cursor-pointer border border-[#EFECE6]"
                >
                  <img
                    src={item.selectedColor.image || item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4
                    onClick={() => {
                      onSelectProduct(item.product);
                      onClose();
                    }}
                    className="font-semibold text-[#1A1A1A] text-xs sm:text-sm truncate cursor-pointer hover:text-[#C85A32]"
                  >
                    {item.product.name}
                  </h4>

                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                    <span>{item.selectedColor.name}</span>
                    {item.selectedSize && <span>• Size {item.selectedSize}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity modifier */}
                    <div className="flex items-center border border-[#E5E0D8] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white text-stone-600 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold font-mono text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white text-stone-600 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          trackRemoveFromCart(item.product, item.quantity);
                          onRemoveItem(item.id);
                        }}
                        className="text-stone-400 hover:text-[#C85A32] transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E5E0D8] mx-auto flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-6 h-6 text-[#C85A32]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base font-display">Your bag is empty</h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Explore our bestsellers or check out the 1998 Retro capsule drop.
              </p>
            </div>
          )}

          {/* Recommended Quick Add-ons */}
          {cartItems.length > 0 && upsellProducts.length > 0 && (
            <div className="pt-4 border-t border-[#E5E0D8] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#C99436]" />
                <span>You might also want</span>
              </div>
              <div className="space-y-2">
                {upsellProducts.slice(0, 2).map((up) => (
                  <div key={up.id} className="p-2.5 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] p-1 flex items-center justify-center shrink-0 border border-[#EFECE6]">
                        <img src={up.image} alt={up.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1A1A] truncate max-w-[150px]">{up.name}</div>
                        <div className="text-[11px] font-mono text-stone-500">${up.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onQuickAddUpsell(up)}
                      className="px-2.5 py-1 rounded-lg bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E5E0D8] bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (try RETRO1998)"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:bg-white text-[#1A1A1A]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className={`text-xs font-medium ${appliedDiscount > 0 ? 'text-[#4A6B53]' : 'text-[#C85A32]'}`}>
                {promoMessage}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#4A6B53] font-semibold">
                  <span>VIP Promo ({appliedDiscount}%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono">{freeShipping ? 'FREE' : `$${shippingAmount.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1A1A1A] pt-2 border-t border-[#E5E0D8]">
                <span>Total</span>
                <span className="font-mono text-base text-[#C85A32]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleCheckoutClick}
              className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
