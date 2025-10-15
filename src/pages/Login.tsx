import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  password: z.string().min(1, "Password is required")
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    
    // Validate form
    try {
      loginSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        const form = e.currentTarget as HTMLFormElement;
        form.classList.add('animate-shake');
        setTimeout(() => form.classList.remove('animate-shake'), 300);
        return;
      }
    }

    // Authenticate with Supabase
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setAuthError("Invalid email or password. Please try again.");
        const form = e.currentTarget as HTMLFormElement;
        form.classList.add('animate-shake');
        setTimeout(() => form.classList.remove('animate-shake'), 300);
      } else if (data.user) {
        toast({
          title: "Welcome back 👋",
          description: "You've successfully signed in.",
        });
        navigate('/app');
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.1),transparent_60%)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 group rounded-2xl hover-glow"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Button>
        
        <Card className="border-2 rounded-3xl shadow-elevated glass">
          <CardHeader className="space-y-3 pb-8">
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="QueryBot Logo" className="w-10 h-10" />
              <span className="text-2xl font-bold">QueryBot</span>
            </div>
            <CardTitle className="text-3xl">Sign in to your account</CardTitle>
            <CardDescription className="text-base">
              Welcome back! Enter your credentials to continue.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {authError && (
                <Alert variant="destructive" className="rounded-2xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="input_email">Work Email</Label>
                <Input 
                  id="input_email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`rounded-2xl h-12 glass transition-all ${errors.email ? 'border-destructive animate-shake' : ''}`}
                  required
                  autoFocus
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="input_password">Password</Label>
                <Input 
                  id="input_password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`rounded-2xl h-12 glass transition-all ${errors.password ? 'border-destructive animate-shake' : ''}`}
                  required
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              
              <Button 
                id="btn_login"
                type="submit"
                className="w-full h-12 text-base rounded-2xl shadow-elevated hover-glow"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to QueryBot"}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
