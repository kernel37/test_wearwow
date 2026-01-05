import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingBag, Star, Minus, Plus, Check } from 'lucide-react';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, cartCount } = useApp();
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    toast.success('Added to cart! 🛒');
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist! ❤️');
    }
  };

  // Generate gallery images (using same image with slight variations for demo)
  const galleryImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-soft">
            <Share2 size={20} />
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="relative w-10 h-10 rounded-full glass flex items-center justify-center shadow-soft"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Image Gallery */}
      <div className="relative h-[55vh] overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentImage * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name}
              className="min-w-full h-full object-cover"
            />
          ))}
        </motion.div>

        {/* Image Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentImage
                  ? 'bg-primary w-6'
                  : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Badges */}
        <div className="absolute top-20 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 gradient-secondary text-secondary-foreground font-bold text-xs rounded-full">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 gradient-primary text-primary-foreground font-bold text-xs rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative -mt-8 bg-card rounded-t-3xl p-6"
      >
        {/* Title & Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold mb-1">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-wearwow-yellow fill-wearwow-yellow" />
                <span className="font-bold text-sm">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
            </div>
          </div>
          <button
            onClick={handleToggleWishlist}
            className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
          >
            <Heart
              size={24}
              className={inWishlist ? 'text-primary fill-primary' : 'text-muted-foreground'}
            />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-extrabold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6">{product.description}</p>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Color</h3>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-primary scale-110'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <Check size={16} className="absolute inset-0 m-auto text-primary-foreground drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Size</h3>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[50px] h-10 px-4 rounded-xl font-bold text-sm transition-all ${
                  selectedSize === size
                    ? 'gradient-primary text-primary-foreground shadow-button'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Quantity</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-xl w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Total Price</p>
            <p className="text-xl font-extrabold">
              ${(product.price * quantity).toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 h-14 text-base font-bold gradient-primary shadow-button"
          >
            <ShoppingBag className="mr-2" size={20} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
