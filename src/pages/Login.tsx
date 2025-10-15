import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      signInSchema.parse(signInData);
      setErrors({});
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success("Welcome back! 👋");
        navigate("/app");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-br from-[#0F1114] to-[#151a23]">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-primary w-96 h-96 top-20 -left-20 animate-float" />
        <div className="blob blob-accent w-80 h-80 bottom-32 -right-10 animate-float-alt" style={{ animationDelay: '2s' }} />
        <div className="blob blob-primary w-64 h-64 top-1/2 left-1/3 animate-float" style={{ animationDelay: '4s' }} />
        <div className="blob blob-accent w-72 h-72 bottom-20 left-1/4 animate-float-alt" style={{ animationDelay: '6s' }} />
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-bounce-in">
          <img src={logo} alt="QueryBot Logo" className="w-12 h-12 rounded-xl" />
          <span className="text-3xl font-bold text-white">QueryBot</span>
        </div>
        
        {/* Login Card */}
        <Card className="border-2 border-white/10 rounded-[24px] shadow-elevated glass backdrop-blur-xl bg-white/5 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="space-y-2 pb-6 text-center">
            <CardTitle className="text-3xl text-white">Welcome Back</CardTitle>
            <p className="text-sm text-white/60">Sign in to access your dashboard</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="email" className="text-white/80">Work Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={signInData.email}
                  onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                  className={`rounded-2xl h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all focus:border-primary focus:shadow-[0_0_8px_hsl(220_81%_65%/0.5)] ${errors.email ? 'border-destructive' : ''}`}
                  required
                  autoFocus
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              
              <div className="space-y-2" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                  className={`rounded-2xl h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 transition-all focus:border-primary focus:shadow-[0_0_8px_hsl(220_81%_65%/0.5)] ${errors.password ? 'border-destructive' : ''}`}
                  required
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              
              <Button 
                type="submit"
                className="w-full h-12 text-base rounded-2xl bg-primary text-white hover:bg-accent transition-all duration-300 hover:shadow-[0_0_20px_hsl(250_100%_73%/0.6)] hover:scale-[1.03]"
                size="lg"
                disabled={isLoading}
                style={{ animationDelay: '0.4s' }}
              >
                {isLoading ? "Signing in..." : "Sign In to QueryBot"}
              </Button>
              
              <p className="text-sm text-white/60 text-center pt-2" style={{ animationDelay: '0.5s' }}>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-accent transition-colors hover:underline">
                  Create one here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
