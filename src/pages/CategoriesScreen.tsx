import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ProductCard } from '@/components/common/ProductCard';
import { products, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colorOptions = ['#000000', '#FFFFFF', '#FF69B4', '#4169E1', '#FFD700', '#A855F7'];

export const CategoriesScreen = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const filteredProducts = products.filter((p) => {
    if (categoryId && p.category !== categoryId) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
    if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.includes(c))) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.isNew ? -1 : 1;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default:
        return b.rating - a.rating;
    }
  });

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const activeFiltersCount =
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length;

  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          {categoryId && (
            <button
              onClick={() => navigate('/categories')}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">
              {selectedCategory?.name || 'All Categories'}
            </h1>
            <p className="text-muted-foreground">
              {sortedProducts.length} products
            </p>
          </div>
        </motion.div>

        {/* Breadcrumb */}
        {categoryId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto scrollbar-hide"
          >
            <button onClick={() => navigate('/')} className="hover:text-primary">
              Home
            </button>
            <ChevronRight size={14} />
            <button
              onClick={() => navigate('/categories')}
              className="hover:text-primary"
            >
              Categories
            </button>
            <ChevronRight size={14} />
            <span className="text-foreground font-semibold whitespace-nowrap">
              {selectedCategory?.name}
            </span>
          </motion.div>
        )}

        {/* Category Grid (when no category selected) */}
        {!categoryId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/categories/${category.id}`)}
                className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-2xl mb-1">{category.icon}</span>
                  <p className="text-primary-foreground font-bold">{category.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 h-12 relative">
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-bold mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-bold mb-4">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`min-w-[50px] h-10 px-4 rounded-xl font-bold text-sm transition-all ${
                          selectedSizes.includes(size)
                            ? 'gradient-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="font-bold mb-4">Color</h3>
                  <div className="flex gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColors.includes(color)
                            ? 'border-primary scale-110'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full h-14 text-base font-bold gradient-primary shadow-button"
                >
                  Apply Filters ({sortedProducts.length} results)
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 h-12 px-4 rounded-xl bg-muted border-0 font-semibold"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {selectedSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
              >
                {size}
                <X size={14} />
              </button>
            ))}
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <X size={14} />
              </button>
            ))}
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-primary font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
