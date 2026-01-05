import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid3X3, Heart, Package, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/categories', icon: Grid3X3, label: 'Categories' },
  { path: '/wishlist', icon: Heart, label: 'Wishlist' },
  { path: '/orders', icon: Package, label: 'Orders' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useApp();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            const showBadge = item.path === '/wishlist' && wishlist.length > 0;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300"
              >
                <div className="relative">
                  {active && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -inset-2 gradient-primary rounded-xl opacity-20"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <Icon
                    size={24}
                    className={`relative z-10 transition-all duration-300 ${
                      active
                        ? 'text-primary scale-110'
                        : 'text-muted-foreground'
                    }`}
                    fill={active && item.path === '/wishlist' ? 'currentColor' : 'none'}
                  />
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
