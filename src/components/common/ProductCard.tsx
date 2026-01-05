import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useApp();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative bg-card rounded-2xl overflow-hidden shadow-soft card-hover">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="gradient-secondary text-secondary-foreground font-bold text-xs px-2 py-1 border-0">
                NEW
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="gradient-primary text-primary-foreground font-bold text-xs px-2 py-1 border-0">
                -{discount}%
              </Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-wearwow-purple text-primary-foreground font-bold text-xs px-2 py-1 border-0">
                🔥 HOT
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft transition-all hover:scale-110"
          >
            <motion.div
              animate={inWishlist ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={20}
                className={inWishlist ? 'text-primary fill-primary' : 'text-muted-foreground'}
              />
            </motion.div>
          </button>

          {/* Color Options Preview */}
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-card shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold flex items-center justify-center">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-secondary">★</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-extrabold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
