import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { mockUser } from '@/data/mockData';
import { toast } from 'sonner';
import logo from '@/assets/logo-wearwow.jpeg';

export const OTPScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useApp();
  const phone = location.state?.phone || '+1 234 567 8900';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock verification - any 6-digit code works
    setUser(mockUser);
    setIsAuthenticated(true);
    toast.success('Phone verified successfully! 🎉');
    navigate('/');
  };

  const handleResend = () => {
    toast.success('OTP sent again!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigate('/login')}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.img
            src={logo}
            alt="WearWow"
            className="w-24 h-24 mx-auto rounded-2xl shadow-card mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
          
          <h1 className="text-2xl font-extrabold mb-2">Verify Your Phone</h1>
          <p className="text-muted-foreground mb-8">
            We've sent a 6-digit code to
            <br />
            <span className="font-bold text-foreground">{phone}</span>
          </p>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-card"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || otp.some((d) => !d)}
            className="w-full h-14 text-base font-bold gradient-primary shadow-button mb-4"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Button>

          <button
            onClick={handleResend}
            className="flex items-center justify-center gap-2 mx-auto text-primary font-semibold"
          >
            <RefreshCw size={18} />
            Resend Code
          </button>

          <p className="text-xs text-muted-foreground mt-6">
            Didn't receive the code? Check your spam or try again in 30 seconds
          </p>
        </motion.div>
      </div>
    </div>
  );
};
