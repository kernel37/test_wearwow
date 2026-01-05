import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import logo from '@/assets/logo-wearwow.jpeg';

export const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendLink = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSent(true);
    toast.success('Reset link sent!');
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
        {!sent ? (
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

            <h1 className="text-2xl font-extrabold mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground mb-8">
              No worries! Enter your email and we'll send you a reset link.
            </p>

            <div className="relative mb-6">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 text-base rounded-xl"
              />
            </div>

            <Button
              onClick={handleSendLink}
              disabled={loading}
              className="w-full h-14 text-base font-bold gradient-primary shadow-button"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <button
              onClick={() => navigate('/login')}
              className="mt-6 text-primary font-semibold"
            >
              Back to Login
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-primary-foreground" />
            </div>

            <h1 className="text-2xl font-extrabold mb-2">Check Your Email!</h1>
            <p className="text-muted-foreground mb-2">
              We've sent a password reset link to
            </p>
            <p className="font-bold text-foreground mb-8">{email}</p>

            <Button
              onClick={() => navigate('/reset-password')}
              className="w-full h-14 text-base font-bold gradient-primary shadow-button mb-4"
            >
              Open Email App
            </Button>

            <p className="text-sm text-muted-foreground">
              Didn't receive the email?{' '}
              <button
                onClick={() => {
                  setSent(false);
                  handleSendLink();
                }}
                className="text-primary font-semibold"
              >
                Resend
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
