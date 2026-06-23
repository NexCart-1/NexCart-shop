import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import type { CartItem } from '../types';
import { categories } from '../data/products';

interface HeaderProps {
  cart: CartItem[];
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({
  cart,
  onCartClick,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange
}: HeaderProps) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src="https://i.ibb.co/35pvzZxL/file-00000000817071faa7e96f70ae0cd298.png"
              alt="NexCart Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                NexCart
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 -mt-1">COD Available • Best Prices • All Time Offers</p>
            </div>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>

          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 sm:p-3 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 h-5 sm:h-6 w-5 sm:w-6 flex items-center justify-center bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, categories..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        {/* Category pills */}
        <div className="pb-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'All'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
