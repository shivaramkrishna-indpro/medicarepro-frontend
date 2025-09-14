import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: 'admin' | 'doctor' | 'receptionist') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock role assignment based on email
        const role = email.includes('admin') ? 'admin' : 
                    email.includes('doctor') ? 'doctor' : 'receptionist';
        
        toast({
          title: "Login Successful",
          description: `Welcome to MediCare Pro, ${role}!`,
        });
        onLogin(role);
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-elevated bg-gradient-card">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-medical">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MediCare Pro
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Healthcare Management System
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@medicare.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-medical transition-medical"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="text-center">Demo Credentials:</p>
              <div className="mt-2 space-y-1 text-xs">
                <p>• admin@medicare.com (Admin)</p>
                <p>• doctor@medicare.com (Doctor)</p>
                <p>• receptionist@medicare.com (Receptionist)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};