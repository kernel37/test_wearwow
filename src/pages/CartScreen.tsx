import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export const CartScreen = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useApp();

  const shipping = 0; // Free shipping
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass p-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">My Cart</h1>
          <span className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </motion.header>

      <div className="p-4">
        {cart.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add items to get started"
            actionLabel="Start Shopping"
            onAction={() => navigate('/')}
          />
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-soft flex gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="font-bold cursor-pointer hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>Color:</span>
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-extrabold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-border p-4">
          <div className="max-w-md mx-auto">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-500 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full h-14 text-base font-bold gradient-primary shadow-button">
              Checkout
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
