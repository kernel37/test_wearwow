import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { mockOrders } from '@/data/mockData';
import { EmptyState } from '@/components/common/EmptyState';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  placed: { label: 'Placed', color: 'bg-wearwow-purple', step: 1 },
  shipped: { label: 'Shipped', color: 'bg-wearwow-cyan', step: 2 },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-wearwow-yellow', step: 3 },
  delivered: { label: 'Delivered', color: 'bg-green-500', step: 4 },
};

export const OrdersScreen = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </motion.div>

        {mockOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="Start shopping to see your orders here"
            actionLabel="Start Shopping"
            onAction={() => navigate('/')}
          />
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order, index) => {
              const status = statusConfig[order.status];
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="bg-card rounded-2xl p-4 shadow-soft cursor-pointer card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold">{order.id}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={14} />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={`${status.color} text-primary-foreground font-bold border-0`}>
                      {status.label}
                    </Badge>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex gap-2 mb-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between mb-2">
                      {['Placed', 'Shipped', 'Out for Delivery', 'Delivered'].map((label, i) => (
                        <span
                          key={label}
                          className={`text-[10px] font-semibold ${
                            i + 1 <= status.step
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {i + 1 <= status.step ? '●' : '○'}
                        </span>
                      ))}
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary transition-all duration-500"
                        style={{ width: `${(status.step / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-extrabold">${order.total.toFixed(2)}</p>
                    <ChevronRight size={20} className="text-muted-foreground" />
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
