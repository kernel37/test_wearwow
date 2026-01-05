import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gradient-primary shadow-button">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
