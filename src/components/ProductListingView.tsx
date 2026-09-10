import React, { useState, useMemo } from 'react';
import { Product, ProductColor, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, Grid2X2, Sparkles, Flame, Check, RefreshCw } from 'lucide-react';
import { CATEGORIES, COLLECTIONS } from '../data/products';
import { trackPageView } from '../services/analytics';

interface ProductListingViewProps {
  products: Product[];
  initialCategory?: string | null;
  initialCollection?: string | null;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
}

export const ProductListingView: React.FC<ProductListingViewProps> = ({
  products,
  initialCategory = null,
  initialCollection = null,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    collection: initialCollection,
    minPrice: 0,
    maxPrice: 150,
    colors: [],
    sizes: [],
    inStockOnly: false,
    sortBy: 'featured',
    searchQuery: ''
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  // Available unique colors & sizes
  const allColors = useMemo(() => {
    const colorsMap = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => colorsMap.set(c.name, c.hex)));
    return Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (filters.category && p.category !== filters.category) return false;
      // Collection filter
      if (filters.collection && p.collection !== filters.collection) return false;
      // Price filter
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      // Color filter
      if (filters.colors.length > 0 && !p.colors.some(c => filters.colors.includes(c.name))) return false;
      // Size filter
      if (filters.sizes.length > 0 && (!p.sizes || !p.sizes.some(s => filters.sizes.some(fs => s.includes(fs))))) return false;
      // In-stock filter
      if (filters.inStockOnly && !p.inStock) return false;
      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const match = p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.tags.some(t => t.toLowerCase().includes(query));
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'bestselling') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
      // Data-driven featured merchandising priority: Men's/Unisex apparel, 1998 Retro, tech/developer merchandise
      const getMerchPriority = (item: Product) => {
        if (item.category === 'Apparel' && item.collection === '1998 Retro') return 4;
        if (item.category === 'Apparel') return 3;
        if (item.collection === '1998 Retro') return 2.5;
        if (item.collection === 'Gemini' || item.collection === 'Chrome Dino') return 2;
        return 1;
      };
      const diff = getMerchPriority(b) - getMerchPriority(a);
      if (diff !== 0) return diff;
      return 0; // featured default fallback
    });
  }, [products, filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.collection) count++;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (filters.inStockOnly) count++;
    if (filters.maxPrice < 150) count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      category: null,
      collection: null,
      minPrice: 0,
      maxPrice: 150,
      colors: [],
      sizes: [],
      inStockOnly: false,
      sortBy: 'featured',
      searchQuery: ''
    });
  };

  const toggleColor = (colorName: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] py-8 text-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#9AA0A6] font-medium mb-6">
          <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span>Catalog</span>
          {filters.collection && (
            <>
              <span>/</span>
              <span className="text-white font-semibold">{filters.collection}</span>
            </>
          )}
          {filters.category && (
            <>
              <span>/</span>
              <span className="text-white font-semibold">{filters.category}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#2A2E33] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#4285F4] mb-1">
              <span>Catalog & Discovery</span>
              <span>•</span>
              <span>{filteredProducts.length} Items</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {filters.collection
                ? filters.collection
                : filters.category
                ? filters.category
                : 'All Official Merchandise'}
            </h1>
            <p className="text-sm text-[#9AA0A6] max-w-xl mt-1">
              Official Google gear, retro capsules, Chrome Dino collectibles, and developer essentials.
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger, Column Toggles & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              id="mobile-filter-btn"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17191C] border border-[#2A2E33] text-xs font-bold text-white shadow-md cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#9AA0A6]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 bg-[#17191C] p-1 rounded-xl border border-[#2A2E33]">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  columns === 3 ? 'bg-[#2A2E33] text-white' : 'text-[#9AA0A6] hover:text-white'
                }`}
                title="3 columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  columns === 4 ? 'bg-[#2A2E33] text-white' : 'text-[#9AA0A6] hover:text-white'
                }`}
                title="4 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="appearance-none bg-[#17191C] border border-[#2A2E33] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#4285F4] shadow-md cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#9AA0A6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-[#9AA0A6] uppercase font-mono mr-1">
              Active:
            </span>

            {filters.collection && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/40 text-[#8AB4F8] text-xs font-bold">
                Collection: {filters.collection}
                <button onClick={() => setFilters(p => ({ ...p, collection: null }))} className="cursor-pointer hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34A853]/15 border border-[#34A853]/40 text-[#81C995] text-xs font-bold">
                Category: {filters.category}
                <button onClick={() => setFilters(p => ({ ...p, category: null }))} className="cursor-pointer hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.colors.map(color => (
              <span key={color} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17191C] border border-[#2A2E33] text-white text-xs font-medium">
                {color}
                <button onClick={() => toggleColor(color)} className="cursor-pointer hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.sizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17191C] border border-[#2A2E33] text-white text-xs font-medium">
                Size: {size}
                <button onClick={() => toggleSize(size)} className="cursor-pointer hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34A853]/15 border border-[#34A853]/40 text-[#81C995] text-xs font-semibold">
                In Stock Only
                <button onClick={() => setFilters(p => ({ ...p, inStockOnly: false }))} className="cursor-pointer hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#9AA0A6] hover:text-white underline ml-2 cursor-pointer"
            >
              Clear All ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#111315] rounded-2xl p-6 border border-[#2A2E33] shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2A2E33]">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className="text-xs font-semibold text-[#4285F4] hover:underline cursor-pointer">
                    Reset
                  </button>
                )}
              </div>

              {/* Collections Filter */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase text-[#9AA0A6] font-mono tracking-wider">
                  Featured Collections
                </h4>
                <div className="space-y-1.5">
                  {COLLECTIONS.map(col => (
                    <button
                      key={col.id}
                      onClick={() => setFilters(prev => ({ ...prev, collection: prev.collection === col.id ? null : col.id }))}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        filters.collection === col.id
                          ? 'bg-[#4285F4] text-white shadow-md'
                          : 'text-[#9AA0A6] hover:bg-[#17191C] hover:text-white'
                      }`}
                    >
                      <span>{col.name}</span>
                      <span className={`text-[10px] font-mono ${filters.collection === col.id ? 'text-white/90' : 'text-[#9AA0A6]'}`}>
                        {col.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5 pt-4 border-t border-[#2A2E33]">
                <h4 className="text-xs font-bold uppercase text-[#9AA0A6] font-mono tracking-wider">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat.id ? null : cat.id }))}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        filters.category === cat.id
                          ? 'bg-[#EA4335] text-white shadow-md'
                          : 'text-[#9AA0A6] hover:bg-[#17191C] hover:text-white'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono ${filters.category === cat.id ? 'text-white/90' : 'text-[#9AA0A6]'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 pt-4 border-t border-[#2A2E33]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase text-[#9AA0A6] font-mono tracking-wider">Max Price</span>
                  <span className="font-bold font-mono text-white">${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#4285F4] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#9AA0A6]">
                  <span>$10</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2.5 pt-4 border-t border-[#2A2E33]">
                <h4 className="text-xs font-bold uppercase text-[#9AA0A6] font-mono tracking-wider">
                  Colors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.slice(0, 10).map(({ name, hex }) => {
                    const isSelected = filters.colors.includes(name);
                    return (
                      <button
                        key={name}
                        onClick={() => toggleColor(name)}
                        title={name}
                        className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-[#4285F4] ring-offset-2 ring-offset-[#111315] scale-110'
                            : 'border-[#2A2E33] opacity-85 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: hex }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3] drop-shadow" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5 pt-4 border-t border-[#2A2E33]">
                <h4 className="text-xs font-bold uppercase text-[#9AA0A6] font-mono tracking-wider">
                  Apparel Size
                </h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {allSizes.map(size => {
                    const isSelected = filters.sizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#4285F4] text-white border-[#4285F4]'
                            : 'bg-[#17191C] text-[#9AA0A6] border-[#2A2E33] hover:border-[#4285F4] hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stock Toggle */}
              <div className="pt-4 border-t border-[#2A2E33]">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#9AA0A6] hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="rounded text-[#4285F4] focus:ring-[#4285F4] accent-[#4285F4]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-5 sm:gap-6`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlistIds.has(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    listName="PLP Catalog Grid"
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 px-4 text-center bg-[#111315] rounded-3xl border border-[#2A2E33]">
                <div className="w-16 h-16 rounded-full bg-[#17191C] mx-auto flex items-center justify-center text-[#9AA0A6] mb-4 border border-[#2A2E33]">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  No merchandise matched your filters
                </h3>
                <p className="text-xs text-[#9AA0A6] max-w-sm mx-auto mt-1 mb-6">
                  Try clearing some filter tags or selecting another collection like 1998 Retro or Gemini.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-[#4285F4]/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
