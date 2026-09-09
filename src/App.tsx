import React, { useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, ViewMode } from './types';
import {
  PRODUCTS,
  HERO_PRODUCTS,
  TRENDING_PRODUCTS,
  RETRO_SECTION_PRODUCTS,
  FRESH_DROP_PRODUCTS
} from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { RetroFeature } from './components/RetroFeature';
import { FreshDrops } from './components/FreshDrops';
import { PersonalizedDiscovery } from './components/PersonalizedDiscovery';
import { CommunityLookbook } from './components/CommunityLookbook';
import { ProductListingView } from './components/ProductListingView';
import { ProductDetailView } from './components/ProductDetailView';
import { CampaignLandingView } from './components/CampaignLandingView';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { DataResearchHub } from './components/DataResearchHub';
import { Footer } from './components/Footer';
import { trackPageView, trackAddToCart, trackAddToWishlist } from './services/analytics';

export default function App() {
  // Navigation & View Mode
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDataHubOpen, setIsDataHubOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Track initial page view & view changes
  useEffect(() => {
    trackPageView(currentView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Handle Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    if (view === 'home') {
      setSelectedCategory(null);
      setSelectedCollection(null);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedCollection(null);
    setCurrentView('plp');
  };

  const handleSelectCollection = (collection: string) => {
    setSelectedCollection(collection);
    setSelectedCategory(null);
    if (collection === '1998 Retro') {
      setCurrentView('campaign');
    } else {
      setCurrentView('plp');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered.slice(0, 5)];
    });
    setCurrentView('pdp');
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size?: string,
    quantity: number = 1
  ) => {
    trackAddToCart(product, quantity, color.name, size);

    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor.name === color.name && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${color.name}-${size || 'default'}-${Date.now()}`,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          addedAt: Date.now()
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleInstantCheckout = (
    product: Product,
    color: ProductColor,
    size?: string
  ) => {
    handleAddToCart(product, color, size, 1);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from wishlist.`);
      } else {
        next.add(product.id);
        trackAddToWishlist(product);
        showToast(`Saved "${product.name}" to wishlist.`);
      }
      return next;
    });
  };

  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.has(p.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F1F3F4] font-sans flex flex-col selection:bg-[#4285F4] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#17191C] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#2A2E33] text-xs font-semibold flex items-center gap-3 animate-fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-[#34A853]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectCollection={handleSelectCollection}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenDataHub={() => setIsDataHubOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* 1. Hero Spotlight */}
            <Hero
              onExploreRetro={() => handleNavigate('campaign')}
              onShopBestsellers={() => handleSelectCategory('Apparel')}
              featuredProducts={HERO_PRODUCTS}
              onSelectProduct={handleSelectProduct}
            />

            {/* 2. Shop by Category & Visual Taxonomy */}
            <ShopByCategory
              onSelectCategory={handleSelectCategory}
              onSelectCollection={handleSelectCollection}
            />

            {/* 3. 1998 Retro High-Impact Campaign Banner & Feature */}
            <RetroFeature
              retroProducts={RETRO_SECTION_PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickView={setQuickViewProduct}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onExploreCampaign={() => handleNavigate('campaign')}
            />

            {/* 4. Fresh Limited Drops */}
            <FreshDrops
              newDropProducts={FRESH_DROP_PRODUCTS}
              onSelectProduct={handleSelectProduct}
            />

            {/* 7. Personalized Recommendations */}
            <PersonalizedDiscovery
              products={PRODUCTS}
              recentlyViewed={recentlyViewed}
              onSelectProduct={handleSelectProduct}
              onQuickView={setQuickViewProduct}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              excludeProductIds={new Set([
                ...HERO_PRODUCTS.map(p => p.id),
                ...TRENDING_PRODUCTS.map(p => p.id),
                ...RETRO_SECTION_PRODUCTS.map(p => p.id),
                ...FRESH_DROP_PRODUCTS.map(p => p.id)
              ])}
            />

            {/* 8. Community Lookbook */}
            <CommunityLookbook
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickView={setQuickViewProduct}
            />
          </div>
        )}

        {currentView === 'plp' && (
          <ProductListingView
            products={PRODUCTS}
            initialCategory={selectedCategory}
            initialCollection={selectedCollection}
            onSelectProduct={handleSelectProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            onInstantCheckout={handleInstantCheckout}
            isWishlisted={wishlistIds.has(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCatalog={() => handleNavigate('plp')}
          />
        )}

        {currentView === 'campaign' && (
          <CampaignLandingView
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onSelectProduct={handleSelectProduct}
        upsellProducts={PRODUCTS.filter(p => !cartItems.some(i => i.product.id === p.id)).slice(0, 3)}
        onQuickAddUpsell={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined, 1)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onSelectCollection={handleSelectCollection}
        onSelectCategory={handleSelectCategory}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
        onNavigateHome={() => handleNavigate('home')}
      />

      <DataResearchHub
        isOpen={isDataHubOpen}
        onClose={() => setIsDataHubOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onOpenResearchHub={() => setIsDataHubOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectCollection={handleSelectCollection}
        onNavigateHome={() => handleNavigate('home')}
        onNavigateCampaign={() => handleNavigate('campaign')}
      />
    </div>
  );
}
