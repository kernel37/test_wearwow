import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { useApp } from '@/context/AppContext';

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const MobileLayout = ({ children, showNav = true }: MobileLayoutProps) => {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        {children}
      </div>
      {showNav && isAuthenticated && <BottomNav />}
    </div>
  );
};
