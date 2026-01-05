import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Check } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';

export const NotificationsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
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
        <h1 className="text-xl font-bold">Notifications</h1>
        <button className="ml-auto text-sm text-primary font-semibold">
          Mark all read
        </button>
      </motion.header>

      <div className="p-4">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card rounded-2xl p-4 shadow-soft ${
                  !notification.read ? 'border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      !notification.read
                        ? 'gradient-primary'
                        : 'bg-muted'
                    }`}
                  >
                    <Bell
                      size={18}
                      className={
                        !notification.read
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground'
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                  {notification.read && (
                    <Check size={18} className="text-green-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
