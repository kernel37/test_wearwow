import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, ShoppingBag, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ProductCard } from '@/components/common/ProductCard';
import { CategoryCard } from '@/components/common/CategoryCard';
import { ProductCardSkeleton, BannerSkeleton, CategorySkeleton } from '@/components/common/LoadingSkeleton';
import { useApp } from '@/context/AppContext';
import { products, categories, banners, mockNotifications } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo-wearwow.jpeg';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { cartCount, isAuthenticated } = useApp();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll banners
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredProducts = products.filter((p) => p.isTrending || p.isNew);
  const saleProducts = products.filter((p) => p.originalPrice);

  return (
    <MobileLayout>
      <div className="pb-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 glass p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="WearWow" className="w-10 h-10 rounded-xl" />
              <div>
                <h1 className="font-extrabold text-lg gradient-text">WearWow</h1>
                <p className="text-xs text-muted-foreground">Shop • Vibe • Slay!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/notifications')}
                className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <button
            onClick={() => navigate('/search')}
            className="mt-4 w-full h-12 px-4 rounded-xl bg-muted flex items-center gap-3"
          >
            <Search size={20} className="text-muted-foreground" />
            <span className="text-muted-foreground">Search for clothes, shoes...</span>
          </button>
        </motion.header>

        {/* Banner Carousel */}
        <section className="px-4 mt-4">
          {loading ? (
            <BannerSkeleton />
          ) : (
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{ x: `-${currentBanner * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`min-w-full h-48 relative bg-gradient-to-r ${banner.gradient} rounded-2xl overflow-hidden`}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h2 className="text-2xl font-extrabold text-primary-foreground mb-1">
                        {banner.title}
                      </h2>
                      <p className="text-primary-foreground/90 text-sm mb-3">
                        {banner.subtitle}
                      </p>
                      <button className="self-start px-5 py-2 bg-card text-foreground font-bold rounded-full text-sm shadow-soft">
                        {banner.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
              {/* Dots */}
              <div className="absolute bottom-3 right-3 flex gap-1">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentBanner
                        ? 'bg-card w-4'
                        : 'bg-card/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-lg font-extrabold">Categories</h2>
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-1 text-sm font-semibold text-primary"
            >
              See All
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide pb-2">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => <CategorySkeleton key={i} />)
              : categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold">Trending Now</h2>
              <Badge className="gradient-primary text-primary-foreground border-0">🔥</Badge>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary">
              See All
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts
                  .slice(0, 4)
                  .map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
          </div>
        </section>

        {/* Sale Products */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold">Flash Sale</h2>
              <Badge className="bg-wearwow-yellow text-secondary-foreground border-0">⚡</Badge>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary">
              See All
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide pb-2">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="min-w-[160px]">
                      <ProductCardSkeleton />
                    </div>
                  ))
              : saleProducts.map((product, index) => (
                  <div key={product.id} className="min-w-[160px]">
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold">New Arrivals</h2>
              <Badge className="bg-wearwow-cyan text-primary-foreground border-0">✨</Badge>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary">
              See All
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <ProductCardSkeleton key={i} />)
              : products
                  .filter((p) => p.isNew)
                  .slice(0, 4)
                  .map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};
