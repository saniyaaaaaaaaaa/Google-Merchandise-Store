import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { trackSelectItem, trackAddToWishlist } from '../services/analytics';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  listName?: string;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  listName = 'Product Grid',
  priority = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    trackSelectItem(product, listName);
    onSelectProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    onAddToCart(product, selectedColor, defaultSize);
    setJustAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setJustAdded(false), 1800);
    }, 400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isWishlisted) {
      trackAddToWishlist(product);
    }
    onToggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  // Badge background determination using Google Primary Palette
  const getBadgeStyle = () => {
    if (product.collection === '1998 Retro' || product.badge === '1998 RETRO') {
      return 'bg-[#EA4335] text-white border-transparent';
    }
    if (product.collection === 'Gemini') {
      return 'bg-[#4285F4] text-white border-transparent';
    }
    if (product.badge === 'LIMITED' || product.isLimited) {
      return 'bg-[#202124] text-white border-transparent';
    }
    if (product.isNewDrop || product.badge === 'NEW DROP' || product.badge === 'FRESH') {
      return 'bg-[#34A853] text-white border-transparent';
    }
    return 'bg-white text-[#202124] border-[#E8E4DC]';
  };

  const displayImage = isHovered && product.hoverImage
    ? product.hoverImage
    : (selectedColor.image || product.image);

  return (
    <motion.div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col bg-[#111315] rounded-2xl border border-[#2A2E33] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#4285F4]/15 hover:border-[#4285F4]/50 cursor-pointer"
    >
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {product.badge && (
            <span
              id={`badge-${product.id}`}
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md border ${getBadgeStyle()}`}
            >
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#34A853] text-white shadow-xs">
              SAVE ${(product.originalPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Wishlist Button with Micro-Interaction */}
        <motion.button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          whileTap={{ scale: 0.85 }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-200 backdrop-blur-md ${
            isWishlisted
              ? 'bg-[#EA4335] text-white shadow-md scale-105'
              : 'bg-[#0B0D0F]/75 hover:bg-[#0B0D0F] text-[#BDC1C6] hover:text-[#EA4335] shadow-sm border border-[#2A2E33]'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </motion.button>
      </div>

      {/* Product Image Stage: Crisp Light Background for Maximum Clarity */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-[#FFFFFF] to-[#F1F3F4] overflow-hidden flex items-center justify-center p-6 border-b border-[#2A2E33]">
        <img
          src={imgError ? product.image : displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md"
        />

        {/* Floating Quick Action Buttons on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-out pointer-events-auto">
          <button
            id={`quick-view-${product.id}`}
            onClick={handleQuickViewClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#17191C]/95 backdrop-blur-md text-xs font-semibold text-white shadow-lg hover:bg-[#202428] hover:text-[#4285F4] transition-colors border border-[#2A2E33]"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding || justAdded}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-lg transition-all ${
              justAdded
                ? 'bg-[#34A853] text-white'
                : 'bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-[#4285F4]/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section: Dark Background + White Typography */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-[#111315]">
        <div className="space-y-1.5">
          {/* Brand & Collection Label */}
          <div className="flex items-center justify-between text-xs text-[#9AA0A6] font-medium">
            <span className="font-medium text-[#BDC1C6]">{product.brand}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#17191C] text-[#E8EAED] font-mono border border-[#2A2E33]">
              {product.collection}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1 group-hover:text-[#4285F4] transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#9AA0A6]">
            <div className="flex items-center text-[#FBBC05]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-semibold text-[#E8EAED]">{product.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        {/* Color Swatches and Price Row */}
        <div className="pt-2.5 border-t border-[#2A2E33] flex items-center justify-between">
          {/* Color Indicators */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                id={`color-${product.id}-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-offset-1 ring-offset-[#111315] ring-[#4285F4] scale-110'
                    : 'border-[#3C4043] opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-[#80868B] line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-[#8AB4F8] text-base font-mono">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
