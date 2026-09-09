import React, { useState, useEffect } from 'react';
import { Product, ProductColor } from '../types';
import { X, Star, ShoppingBag, Eye, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackViewItem, trackAddToCart, trackAddToWishlist } from '../services/analytics';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      trackViewItem(product);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes ? product.sizes[0] : undefined);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product || !selectedColor) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleFullDetails = () => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div
      id="quick-view-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div
        id="quick-view-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E0D8] relative overflow-hidden flex flex-col md:flex-row gap-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white text-stone-400 hover:text-[#1A1A1A] transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Stage */}
        <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-white border border-[#E5E0D8] p-6 flex items-center justify-center relative">
          <img
            src={selectedColor.image || product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold font-mono uppercase shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details & Options */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>{product.brand}</span>
              <span className="font-mono text-[#C85A32] font-bold">{product.collection}</span>
            </div>

            <h3 className="font-bold text-[#1A1A1A] text-lg sm:text-xl font-display leading-snug">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-xs text-[#C99436]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-[#1A1A1A]">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-bold font-mono text-[#1A1A1A]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-mono">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-stone-700 mb-1.5">
                Color: <span className="font-normal text-stone-500">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-offset-1 ring-[#C85A32] scale-110'
                        : 'border-[#D4CECE] opacity-80'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="pt-2">
                <div className="text-[11px] font-bold text-stone-700 mb-1.5">Size:</div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-stone-700 border-[#E5E0D8] hover:border-[#C85A32]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-[#E5E0D8]">
            <div className="flex items-center gap-2">
              <button
                id="quick-view-add-to-cart-btn"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  justAdded
                    ? 'bg-[#4A6B53] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#C85A32] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (!isWishlisted) trackAddToWishlist(product);
                  onToggleWishlist(product);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted ? 'bg-[#C85A32] text-white border-[#C85A32]' : 'bg-white text-stone-700 border-[#E5E0D8] hover:text-[#C85A32]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleFullDetails}
              className="w-full text-center text-xs font-semibold text-[#C85A32] hover:underline flex items-center justify-center gap-1 py-1 cursor-pointer"
            >
              <span>View full product specs & reviews</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
