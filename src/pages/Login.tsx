import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to WebKech Dashboard.",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
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
              Welcome to <span className="text-gradient-primary">WebKech</span>
            </h1>
            <p className="text-muted-foreground">Sign in to your security dashboard</p>
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
                placeholder="admin@webkech.com"
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
                  placeholder="Enter your password"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </motion.div>
          </form>
        </Card>

        {/* Demo credentials info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground">
              Create a new account or try: demo@webkech.com / demo123
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;