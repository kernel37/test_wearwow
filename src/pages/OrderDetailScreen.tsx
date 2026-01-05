import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Package, Truck, Home, CheckCircle } from 'lucide-react';
import { mockOrders } from '@/data/mockData';

const statusSteps = [
  { key: 'placed', label: 'Order Placed', icon: Package, description: 'Your order has been confirmed' },
  { key: 'shipped', label: 'Shipped', icon: Package, description: 'Package is on its way' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, description: 'Arriving today' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Package delivered successfully' },
];

const statusIndex = {
  placed: 0,
  shipped: 1,
  out_for_delivery: 2,
  delivered: 3,
};

export const OrderDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  const currentStep = statusIndex[order.status];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass p-4 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold">{order.id}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </motion.header>

      <div className="p-4 space-y-6">
        {/* Order Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h2 className="font-bold mb-6">Order Status</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-muted" />
            <div
              className="absolute left-5 top-5 w-0.5 gradient-primary transition-all duration-500"
              style={{ height: `${(currentStep / 3) * 100}%` }}
            />

            {/* Steps */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'gradient-primary shadow-button'
                          : 'bg-muted'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} className="text-primary-foreground" />
                      ) : (
                        <Icon size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className={isCurrent ? 'animate-pulse' : ''}>
                      <p className={`font-bold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-wearwow-cyan/20 flex items-center justify-center">
              <MapPin size={20} className="text-wearwow-cyan" />
            </div>
            <h2 className="font-bold">Shipping Address</h2>
          </div>
          <p className="text-muted-foreground">
            123 Fashion Street, Apt 4B
            <br />
            New York, NY 10001
            <br />
            United States
          </p>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h2 className="font-bold mb-4">Order Items ({order.items.length})</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h2 className="font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-500 font-bold">FREE</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between text-base">
              <span className="font-bold">Total</span>
              <span className="font-extrabold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
