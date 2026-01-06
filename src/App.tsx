import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";

// Auth Screens
import { LoginScreen } from "./pages/auth/LoginScreen";
import { OTPScreen } from "./pages/auth/OTPScreen";
import { ForgotPasswordScreen } from "./pages/auth/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./pages/auth/ResetPasswordScreen";

// App Screens
import { HomeScreen } from "./pages/HomeScreen";
import { ProductDetailScreen } from "./pages/ProductDetailScreen";
import { WishlistScreen } from "./pages/WishlistScreen";
import { OrdersScreen } from "./pages/OrdersScreen";
import { OrderDetailScreen } from "./pages/OrderDetailScreen";
import { CategoriesScreen } from "./pages/CategoriesScreen";
import { CartScreen } from "./pages/CartScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { NotificationsScreen } from "./pages/NotificationsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useApp();

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginScreen />} />
      <Route path="/otp" element={<OTPScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />

      {/* Protected App Routes */}
      <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetailScreen /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><WishlistScreen /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersScreen /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailScreen /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><CategoriesScreen /></ProtectedRoute>} />
      <Route path="/categories/:categoryId" element={<ProtectedRoute><CategoriesScreen /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartScreen /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/test_wearwow">
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
