import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useApp } from '@/context/AppContext';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const WishlistScreen = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.sizes[0], product.colors[0]);
      removeFromWishlist(productId);
      toast.success('Moved to cart! 🛒');
    }
  };

  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </motion.div>

        {wishlist.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save items you love to buy them later"
            actionLabel="Start Shopping"
            onAction={() => navigate('/')}
          />
        ) : (
          <div className="space-y-4">
            {wishlist.map((product, index) => {
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-4 shadow-soft flex gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="font-bold cursor-pointer hover:text-primary transition-colors"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-extrabold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-xs font-bold text-primary">-{discount}%</span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => handleMoveToCart(product.id)}
                        size="sm"
                        className="flex-1 h-9 text-sm font-bold gradient-primary"
                      >
                        <ShoppingBag size={16} className="mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => {
                          removeFromWishlist(product.id);
                          toast.success('Removed from wishlist');
                        }}
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
