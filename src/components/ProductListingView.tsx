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
      return 0; // featured default
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
    <div className="min-h-screen bg-[#F5F2ED] py-8 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-6">
          <button onClick={onNavigateHome} className="hover:text-[#1A1A1A] transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span>Catalog</span>
          {filters.collection && (
            <>
              <span>/</span>
              <span className="text-[#1A1A1A] font-semibold">{filters.collection}</span>
            </>
          )}
          {filters.category && (
            <>
              <span>/</span>
              <span className="text-[#1A1A1A] font-semibold">{filters.category}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E5E0D8] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#C85A32] mb-1">
              <span>Catalog & Discovery</span>
              <span>•</span>
              <span>{filteredProducts.length} Items</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
              {filters.collection
                ? filters.collection
                : filters.category
                ? filters.category
                : 'All Official Merchandise'}
            </h1>
            <p className="text-sm text-stone-600 max-w-xl mt-1">
              Official Google gear, retro capsules, Chrome Dino collectibles, and developer essentials.
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger, Column Toggles & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              id="mobile-filter-btn"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-xs font-bold text-stone-800 shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-stone-600" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E0D8]">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  columns === 3 ? 'bg-[#F5F2ED] text-[#1A1A1A]' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="3 columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  columns === 4 ? 'bg-[#F5F2ED] text-[#1A1A1A]' : 'text-stone-400 hover:text-stone-700'
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
                className="appearance-none bg-white border border-[#E5E0D8] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C85A32] shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-stone-400 uppercase font-mono mr-1">
              Active:
            </span>

            {filters.collection && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold">
                Collection: {filters.collection}
                <button onClick={() => setFilters(p => ({ ...p, collection: null }))} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B53]/10 text-[#4A6B53] text-xs font-bold">
                Category: {filters.category}
                <button onClick={() => setFilters(p => ({ ...p, category: null }))} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.colors.map(color => (
              <span key={color} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D8] text-stone-800 text-xs font-medium">
                {color}
                <button onClick={() => toggleColor(color)} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.sizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D8] text-stone-800 text-xs font-medium">
                Size: {size}
                <button onClick={() => toggleSize(size)} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A6B53]/15 text-[#4A6B53] text-xs font-semibold">
                In Stock Only
                <button onClick={() => setFilters(p => ({ ...p, inStockOnly: false }))} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-stone-500 hover:text-[#1A1A1A] underline ml-2 cursor-pointer"
            >
              Clear All ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* Main Content Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E5E0D8] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
                <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider font-mono">
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className="text-xs font-semibold text-[#C85A32] hover:underline cursor-pointer">
                    Reset
                  </button>
                )}
              </div>

              {/* Collections Filter */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase text-stone-400 font-mono tracking-wider">
                  Featured Collections
                </h4>
                <div className="space-y-1.5">
                  {COLLECTIONS.map(col => (
                    <button
                      key={col.id}
                      onClick={() => setFilters(prev => ({ ...prev, collection: prev.collection === col.id ? null : col.id }))}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        filters.collection === col.id
                          ? 'bg-[#1A1A1A] text-white'
                          : 'text-stone-600 hover:bg-white'
                      }`}
                    >
                      <span>{col.name}</span>
                      <span className={`text-[10px] font-mono ${filters.collection === col.id ? 'text-stone-300' : 'text-stone-400'}`}>
                        {col.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5 pt-4 border-t border-[#E5E0D8]">
                <h4 className="text-xs font-bold uppercase text-stone-400 font-mono tracking-wider">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat.id ? null : cat.id }))}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        filters.category === cat.id
                          ? 'bg-[#C85A32] text-white'
                          : 'text-stone-600 hover:bg-white'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono ${filters.category === cat.id ? 'text-white/80' : 'text-stone-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 pt-4 border-t border-[#E5E0D8]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase text-stone-400 font-mono tracking-wider">Max Price</span>
                  <span className="font-bold font-mono text-[#1A1A1A]">${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#C85A32] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>$10</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2.5 pt-4 border-t border-[#E5E0D8]">
                <h4 className="text-xs font-bold uppercase text-stone-400 font-mono tracking-wider">
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
                            ? 'ring-2 ring-[#C85A32] ring-offset-2 scale-110'
                            : 'border-[#D4CECE] opacity-85 hover:opacity-100'
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
              <div className="space-y-2.5 pt-4 border-t border-[#E5E0D8]">
                <h4 className="text-xs font-bold uppercase text-stone-400 font-mono tracking-wider">
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
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-stone-700 border-[#E5E0D8] hover:border-[#C85A32]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stock Toggle */}
              <div className="pt-4 border-t border-[#E5E0D8]">
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="rounded text-[#C85A32] focus:ring-[#C85A32] accent-[#C85A32]"
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
              <div className="py-16 px-4 text-center bg-[#FAF8F5] rounded-3xl border border-[#E5E0D8]">
                <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center text-stone-400 mb-4 border border-[#E5E0D8]">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] font-display">
                  No merchandise matched your filters
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  Try clearing some filter tags or selecting another collection like 1998 Retro or Gemini.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
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
