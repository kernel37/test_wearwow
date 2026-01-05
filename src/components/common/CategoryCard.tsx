import { motion } from 'framer-motion';
import { Category } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => navigate(`/categories/${category.id}`)}
      className="cursor-pointer group"
    >
      <div className="relative w-20 h-20 mx-auto mb-2">
        <div className="absolute inset-0 gradient-primary rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-[2px] bg-card rounded-[14px] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-2xl">
            {category.icon}
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </p>
    </motion.div>
  );
};
