import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useApp } from '@/context/AppContext';
import { mockUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const menuItems = [
  { icon: Package, label: 'My Orders', path: '/orders', badge: '2' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: MapPin, label: 'Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payment' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
];

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser, wishlist } = useApp();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <MobileLayout>
      <div className="p-4 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold">Profile</h1>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold">{mockUser.name}</h2>
              <p className="text-muted-foreground">{mockUser.email}</p>
              <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 h-12"
          >
            Edit Profile
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div
            onClick={() => navigate('/orders')}
            className="bg-card rounded-2xl p-4 text-center shadow-soft cursor-pointer card-hover"
          >
            <Package size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-extrabold">3</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div
            onClick={() => navigate('/wishlist')}
            className="bg-card rounded-2xl p-4 text-center shadow-soft cursor-pointer card-hover"
          >
            <Heart size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-extrabold">{wishlist.length}</p>
            <p className="text-xs text-muted-foreground">Wishlist</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
            <CreditCard size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-extrabold">2</p>
            <p className="text-xs text-muted-foreground">Cards</p>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-soft overflow-hidden mb-6"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const badgeValue =
              item.label === 'Wishlist' ? wishlist.length : item.badge;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
                <span className="flex-1 font-semibold text-left">{item.label}</span>
                {badgeValue && Number(badgeValue) > 0 && (
                  <span className="px-2 py-0.5 gradient-primary text-primary-foreground text-xs font-bold rounded-full">
                    {badgeValue}
                  </span>
                )}
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-14 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut size={20} className="mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};
