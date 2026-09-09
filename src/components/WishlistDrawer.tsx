import React from 'react';
import { Product, ProductColor } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in"
    >
      <div
        id="wishlist-drawer-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E5E0D8]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5E0D8] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C85A32] fill-current" />
            <h2 className="font-bold text-[#1A1A1A] text-lg font-display">
              Saved Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF8F5] text-stone-400 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs"
              >
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl bg-[#FAF8F5] p-2 flex items-center justify-center shrink-0 cursor-pointer border border-[#EFECE6]"
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="font-semibold text-[#1A1A1A] text-xs sm:text-sm truncate cursor-pointer hover:text-[#C85A32]"
                  >
                    {product.name}
                  </h4>
                  <div className="text-xs font-bold text-[#1A1A1A] font-mono">
                    ${product.price.toFixed(2)}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onAddToCart(product, product.colors[0], product.sizes ? product.sizes[0] : undefined)}
                      className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-stone-400 hover:text-[#C85A32] transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E5E0D8] mx-auto flex items-center justify-center text-stone-400">
                <Heart className="w-6 h-6 text-[#C85A32]" />
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-base font-display">No saved favorites yet</h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Tap the heart icon on any product card or detail page to save items for later.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-[#E5E0D8] bg-white">
            <button
              onClick={() => {
                wishlistProducts.forEach(p => {
                  onAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined);
                });
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Add All to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
