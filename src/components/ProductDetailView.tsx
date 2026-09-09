import React, { useState, useEffect } from 'react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Check,
  Ruler,
  Share2,
  Package,
  Leaf,
  Plus
} from 'lucide-react';
import { trackViewItem, trackAddToCart, trackAddToWishlist } from '../services/analytics';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string, quantity?: number) => void;
  onInstantCheckout: (product: Product, color: ProductColor, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onInstantCheckout,
  isWishlisted,
  onToggleWishlist,
  wishlistIds,
  onNavigateHome,
  onNavigateCatalog
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'story' | 'materials' | 'reviews'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Emit GA4 view_item event on load
  useEffect(() => {
    trackViewItem(product);
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Related products from same collection or category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.collection === product.collection || p.category === product.category))
    .slice(0, 4);

  // "Complete the look" companion items
  const bundleItems = allProducts
    .filter(p => p.id !== product.id && p.collection === product.collection)
    .slice(0, 2);

  const handleAddBundle = () => {
    onAddToCart(product, selectedColor, selectedSize, 1);
    bundleItems.forEach(item => {
      onAddToCart(item, item.colors[0], item.sizes ? item.sizes[0] : undefined, 1);
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] py-8 text-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Row */}
        <nav className="flex items-center justify-between text-xs text-[#9AA0A6] font-medium mb-6">
          <div className="flex items-center gap-2 truncate">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={onNavigateCatalog} className="hover:text-white transition-colors cursor-pointer">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-white font-semibold truncate">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#17191C] border border-[#2A2E33] text-[#9AA0A6] hover:text-white text-xs font-semibold shadow-md cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </nav>

        {/* Main Product Two-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#111315] rounded-3xl p-6 sm:p-10 border border-[#2A2E33] shadow-2xl mb-12">
          {/* Left Column: Image Stage & Thumbnail Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
              {product.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                    selectedImage === imgUrl
                      ? 'border-[#4285F4] ring-2 ring-[#4285F4]/40 shadow-md'
                      : 'border-[#2A2E33] hover:border-stone-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 aspect-square rounded-2xl bg-white border border-[#2A2E33] p-8 flex items-center justify-center relative overflow-hidden group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge on main stage */}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#111315] text-white text-xs font-bold font-mono uppercase tracking-wider shadow-md border border-[#2A2E33]">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Information, Variant Pickers & CTA Actions */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand & Collection */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4285F4] font-mono">
                  {product.brand} • {product.collection}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#34A853]/15 text-[#81C995] border border-[#34A853]/30 font-mono">
                  {product.inStock ? `In Stock (${product.stockCount || 20} left)` : 'Backorder'}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center text-[#FBBC05]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-[#2A2E33]'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 font-bold text-white text-sm">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#2A2E33]">•</span>
                <span className="text-[#9AA0A6] underline cursor-pointer hover:text-white">
                  {product.reviewCount} verified buyer reviews
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9AA0A6] line-through font-mono">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#34A853] text-white">
                    SAVE ${(product.originalPrice - product.price).toFixed(0)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="space-y-2 pt-2 border-t border-[#2A2E33]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Color:</span>
                  <span className="text-[#9AA0A6] font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.image) setSelectedImage(color.image);
                      }}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-offset-2 ring-offset-[#111315] ring-[#4285F4] scale-110'
                          : 'border-[#2A2E33] opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector (If apparel) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#2A2E33]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Select Size:</span>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-[#4285F4] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#4285F4] text-white border-[#4285F4]'
                            : 'bg-[#17191C] text-[#9AA0A6] border-[#2A2E33] hover:border-[#4285F4] hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#2A2E33]">
                <span className="text-xs font-bold text-white">Quantity:</span>
                <div className="flex items-center border border-[#2A2E33] rounded-xl bg-[#17191C] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-[#9AA0A6] hover:text-white hover:bg-[#2A2E33] font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold font-mono text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-[#9AA0A6] hover:text-white hover:bg-[#2A2E33] font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs Row */}
            <div className="space-y-3 pt-6 border-t border-[#2A2E33]">
              <div className="flex items-center gap-3">
                <button
                  id="pdp-add-to-bag-btn"
                  onClick={handleAdd}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-sm sm:text-base shadow-md shadow-[#4285F4]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{addedToast ? 'Added to Bag!' : `Add to Bag • $${(product.price * quantity).toFixed(2)}`}</span>
                </button>

                <button
                  id="pdp-wishlist-toggle-btn"
                  onClick={() => {
                    if (!isWishlisted) trackAddToWishlist(product);
                    onToggleWishlist(product);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#EA4335] text-white border-[#EA4335]'
                      : 'bg-[#17191C] hover:bg-[#202428] text-[#9AA0A6] border-[#2A2E33] hover:text-[#EA4335]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Express 1-Click Checkout */}
              <button
                id="pdp-express-checkout-btn"
                onClick={() => onInstantCheckout(product, selectedColor, selectedSize)}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#34A853] hover:bg-[#2D9247] text-white font-bold text-sm shadow-md shadow-[#34A853]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current text-white" />
                <span>Instant 1-Click Checkout</span>
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-[#9AA0A6] font-medium">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Free US Ship $50+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4285F4]" />
                  <span>Official Google Store</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#FBBC05]" />
                  <span>30-Day Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Tabs: Details, Story, Materials, Customer Reviews */}
        <div className="bg-[#111315] rounded-3xl p-6 sm:p-10 border border-[#2A2E33] shadow-md mb-12">
          {/* Tab Header */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[#2A2E33] overflow-x-auto pb-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm font-bold pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'details'
                  ? 'text-[#4285F4] border-b-2 border-[#4285F4]'
                  : 'text-[#9AA0A6] hover:text-white'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`text-sm font-bold pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'story'
                  ? 'text-[#4285F4] border-b-2 border-[#4285F4]'
                  : 'text-[#9AA0A6] hover:text-white'
              }`}
            >
              Design Story & Archive
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`text-sm font-bold pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'materials'
                  ? 'text-[#4285F4] border-b-2 border-[#4285F4]'
                  : 'text-[#9AA0A6] hover:text-white'
              }`}
            >
              Materials & Sustainability
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#4285F4] border-b-2 border-[#4285F4]'
                  : 'text-[#9AA0A6] hover:text-white'
              }`}
            >
              Verified Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-bold text-white text-base font-display">Specifications & Features</h3>
                <ul className="space-y-2.5">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9AA0A6]">
                      <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-bold text-white text-base font-display">The Inspiration</h3>
                <p className="text-sm text-[#9AA0A6] leading-relaxed">
                  {product.story || product.description}
                </p>
                <div className="p-4 rounded-2xl bg-[#17191C] border border-[#2A2E33] flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#FBBC05] shrink-0" />
                  <p className="text-xs text-[#9AA0A6]">
                    Officially developed for the Google Merchandise Store in collaboration with campus design teams in Mountain View, California.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-bold text-white text-base font-display">Fabrics & Ecological Commitment</h3>
                <p className="text-sm text-[#9AA0A6]">
                  <strong className="font-bold text-white">Composition:</strong> {product.materials || 'Organic cotton and sustainably certified recycled polyester.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#2A2E33] flex items-center gap-2.5">
                    <Leaf className="w-4 h-4 text-[#34A853]" />
                    <span className="text-xs text-white font-semibold">100% Recyclable Packaging</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#2A2E33] flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-[#EA4335]" />
                    <span className="text-xs text-white font-semibold">Carbon-Neutral Freight Shipping</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2E33]">
                  <div>
                    <span className="text-3xl font-extrabold font-mono text-white">{product.rating.toFixed(1)}</span>
                    <span className="text-sm text-[#9AA0A6] ml-2">out of 5 stars based on {product.reviewCount} reviews</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#17191C] border border-[#2A2E33] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Marcus L. — Verified Buyer</span>
                      <span className="text-[#9AA0A6]">Mountain View, CA</span>
                    </div>
                    <div className="flex text-[#FBBC05]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#9AA0A6] pt-1">
                      &ldquo;The quality on this 1998 capsule is unbelievable. The embroidery and color precision match the archival photos perfectly. Highly recommend!&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#17191C] border border-[#2A2E33] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Elena R. — Software Engineer</span>
                      <span className="text-[#9AA0A6]">New York, NY</span>
                    </div>
                    <div className="flex text-[#FBBC05]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#9AA0A6] pt-1">
                      &ldquo;Shipped in 2 days from the Bay Area. Fits true to size and survived multiple machine washes with zero fading.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "Complete the Look" Bundle Widget */}
        {bundleItems.length > 0 && (
          <div className="bg-[#111315] text-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#2A2E33] mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <div className="text-xs font-mono uppercase font-bold text-[#FBBC05] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Style Bundle</span>
                </div>
                <h3 className="text-2xl font-bold font-display">
                  Complete the {product.collection} Look
                </h3>
                <p className="text-xs text-[#9AA0A6]">
                  Pair this with authentic companion pieces from the same collection and save on shipping.
                </p>
              </div>

              {/* Bundle Items Thumbnails + 1-Click CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#2A2E33]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <Plus className="w-4 h-4 text-[#9AA0A6]" />
                  {bundleItems.map(item => (
                    <div key={item.id} className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center border border-[#2A2E33]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>

                <button
                  id="bundle-add-all-btn"
                  onClick={handleAddBundle}
                  className="px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#4285F4]/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add All 3 Items • $
                    {(product.price + bundleItems.reduce((s, i) => s + i.price, 0)).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white font-display">
                You might also love
              </h2>
              <button
                onClick={onNavigateCatalog}
                className="text-xs font-bold text-[#4285F4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all merchandise</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds.has(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  listName="PDP Related Shelf"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111315] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-[#2A2E33] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2E33]">
              <h3 className="font-bold text-white text-lg font-display">Unisex Sizing Chart (Inches)</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-[#9AA0A6] hover:text-white cursor-pointer">
                ✕
              </button>
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#2A2E33] text-[#9AA0A6] font-mono uppercase">
                  <th className="py-2">Size</th>
                  <th className="py-2">Chest</th>
                  <th className="py-2">Length</th>
                  <th className="py-2">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E33] font-medium text-[#9AA0A6]">
                <tr><td className="py-2 font-bold text-white">XS</td><td>34 - 36</td><td>27</td><td>33.5</td></tr>
                <tr><td className="py-2 font-bold text-white">S</td><td>36 - 38</td><td>28</td><td>34.5</td></tr>
                <tr><td className="py-2 font-bold text-white">M</td><td>39 - 41</td><td>29</td><td>35.5</td></tr>
                <tr><td className="py-2 font-bold text-white">L</td><td>42 - 44</td><td>30</td><td>36.5</td></tr>
                <tr><td className="py-2 font-bold text-white">XL</td><td>45 - 48</td><td>31</td><td>37.5</td></tr>
                <tr><td className="py-2 font-bold text-white">2XL</td><td>49 - 52</td><td>32</td><td>38.5</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-3 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
