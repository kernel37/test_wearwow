import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import logo from '@/assets/logo-wearwow.jpeg';

export const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    toast.success('Password reset successfully!');
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
        {!success ? (
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

            <h1 className="text-2xl font-extrabold mb-2">Create New Password</h1>
            <p className="text-muted-foreground mb-8">
              Your new password must be different from previously used passwords.
            </p>

            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
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

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-14 pl-12 pr-12 text-base rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleReset}
              disabled={loading}
              className="w-full h-14 text-base font-bold gradient-primary shadow-button mt-6"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6 animate-bounce-subtle">
              <CheckCircle size={48} className="text-primary-foreground" />
            </div>

            <h1 className="text-2xl font-extrabold mb-2">Password Reset!</h1>
            <p className="text-muted-foreground mb-8">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <Button
              onClick={() => navigate('/login')}
              className="w-full h-14 text-base font-bold gradient-primary shadow-button"
            >
              Back to Login
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
