import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsLoading(true);

    const result = await register(email, password);
    
    if (result.success) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to WebKech Dashboard. You're now logged in.",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: result.message,
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <Card className="glass-card p-8">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/webkech logo.svg" 
                alt="WebKech Logo" 
                className="w-16 h-16"
              />
            </div>
            <h1 className="heading-primary text-2xl mb-2">
              Join <span className="text-gradient-primary">WebKech</span>
            </h1>
            <p className="text-muted-foreground">Create your security dashboard account</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-background/50 border-border focus:border-primary"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border focus:border-primary pr-10"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${password.length >= 6 ? 'text-safe' : 'text-muted-foreground'}`} />
                  <span className={`text-xs ${password.length >= 6 ? 'text-safe' : 'text-muted-foreground'}`}>
                    At least 6 characters
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-background/50 border-border focus:border-primary pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${password === confirmPassword ? 'text-safe' : 'text-muted-foreground'}`} />
                  <span className={`text-xs ${password === confirmPassword ? 'text-safe' : 'text-muted-foreground'}`}>
                    Passwords match
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;