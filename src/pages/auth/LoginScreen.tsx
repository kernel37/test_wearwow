import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { mockUser } from '@/data/mockData';
import { toast } from 'sonner';
import logo from '@/assets/logo-wearwow.jpeg';

type LoginMethod = 'email' | 'phone' | null;

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useApp();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUser(mockUser);
    setIsAuthenticated(true);
    toast.success('Welcome back! 🎉');
    navigate('/');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUser(mockUser);
    setIsAuthenticated(true);
    toast.success('Signed in with Google! 🎉');
    navigate('/');
  };

  const handlePhoneLogin = () => {
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }
    navigate('/otp', { state: { phone } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 gradient-hero flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]" />
        <motion.img
          src={logo}
          alt="WearWow"
          className="w-40 h-40 object-contain rounded-3xl shadow-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl shadow-card p-6"
        >
          <h1 className="text-2xl font-extrabold text-center mb-1">
            Welcome to <span className="gradient-text">WearWow!</span>
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Shop • Vibe • Slay!
          </p>

          {!loginMethod ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Button
                onClick={() => setLoginMethod('email')}
                className="w-full h-14 text-base font-bold gradient-primary shadow-button"
              >
                <Mail className="mr-2" size={20} />
                Continue with Email
              </Button>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                disabled={loading}
                className="w-full h-14 text-base font-bold border-2"
              >
                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                onClick={() => setLoginMethod('phone')}
                variant="outline"
                className="w-full h-14 text-base font-bold border-2"
              >
                <Phone className="mr-2" size={20} />
                Continue with Phone
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-4 text-sm text-muted-foreground">
                    New to WearWow?
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/signup')}
                variant="ghost"
                className="w-full h-12 text-base font-bold text-primary"
              >
                Create an Account
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          ) : loginMethod === 'email' ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <button
                onClick={() => setLoginMethod(null)}
                className="text-sm text-primary font-semibold mb-4"
              >
                ← Back
              </button>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 text-base rounded-xl"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 pr-12 text-base rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-primary font-semibold"
                >
                  Forgot Password?
                </button>

                <Button
                  onClick={handleEmailLogin}
                  disabled={loading}
                  className="w-full h-14 text-base font-bold gradient-primary shadow-button"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <button
                onClick={() => setLoginMethod(null)}
                className="text-sm text-primary font-semibold mb-4"
              >
                ← Back
              </button>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-14 pl-12 text-base rounded-xl"
                />
              </div>

              <Button
                onClick={handlePhoneLogin}
                className="w-full h-14 text-base font-bold gradient-primary shadow-button"
              >
                Send OTP
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
