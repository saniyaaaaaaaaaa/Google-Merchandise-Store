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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-[#202124]/8 hover:border-[#4285F4]/30 cursor-pointer"
    >
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {product.badge && (
            <span
              id={`badge-${product.id}`}
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs border ${getBadgeStyle()}`}
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
              : 'bg-white/95 hover:bg-white text-[#5F6368] hover:text-[#EA4335] shadow-xs border border-[#E5E0D8]'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`} />
        </motion.button>
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-[#F8F7F4] overflow-hidden flex items-center justify-center p-5 border-b border-[#EFECE6]">
        <img
          src={imgError ? product.image : displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
        />

        {/* Floating Quick Action Buttons on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-out pointer-events-auto">
          <button
            id={`quick-view-${product.id}`}
            onClick={handleQuickViewClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md text-xs font-semibold text-[#202124] shadow-md hover:bg-white hover:text-[#4285F4] transition-colors border border-[#E5E0D8]"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding || justAdded}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold shadow-md transition-all ${
              justAdded
                ? 'bg-[#34A853] text-white'
                : 'bg-[#202124] hover:bg-[#4285F4] text-white'
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

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-white">
        <div className="space-y-1.5">
          {/* Brand & Collection Label */}
          <div className="flex items-center justify-between text-xs text-[#5F6368] font-medium">
            <span className="font-medium text-[#70757A]">{product.brand}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F1F3F4] text-[#3C4043] font-mono border border-[#DADCE0]">
              {product.collection}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-[#202124] text-sm md:text-base line-clamp-1 group-hover:text-[#4285F4] transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#5F6368]">
            <div className="flex items-center text-[#FBBC05]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-semibold text-[#202124]">{product.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        {/* Color Swatches and Price Row */}
        <div className="pt-2.5 border-t border-[#EFECE6] flex items-center justify-between">
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
                    ? 'ring-2 ring-offset-1 ring-[#4285F4] scale-110'
                    : 'border-stone-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-[#70757A] line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-[#202124] text-base font-mono">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
