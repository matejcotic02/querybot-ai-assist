import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-purple.png";

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  company: z.string().trim().min(2, "Company name required").max(100, "Company name too long"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password too long")
});

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    company: "",
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      signUpSchema.parse(signUpData);
      setErrors({});
      
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
          data: {
            full_name: signUpData.name,
            company_name: signUpData.company
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success("Account created! Check your email to verify.");
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-cover bg-center bg-fixed bg-no-repeat bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')] dark:bg-[url('https://images.unsplash.com/photo-1600334129128-8c6f3cfcfbde?q=80&w=2000&auto=format&fit=crop')] transition-[background-image] duration-400">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      
      {/* Mist Overlay */}
      <div className="absolute inset-0 bg-white/40 dark:bg-[rgb(15,10,25)]/70 bg-blend-overlay transition-colors duration-400" />
      
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
        
        <Card className="border-2 rounded-2xl shadow-[0_4px_40px_rgba(163,123,255,0.25)] backdrop-blur-lg bg-white/75 dark:bg-[rgb(20,10,40)]/75 transition-colors duration-400">
          <CardHeader className="space-y-3 pb-8">
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="QueryBot Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-2xl font-bold">QueryBot</span>
            </div>
            <CardTitle className="text-3xl">Welcome</CardTitle>
            <CardDescription className="text-base">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signin" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email"
                      type="email"
                      placeholder="john@company.com"
                      value={signInData.email}
                      onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.email ? 'border-destructive' : ''}`}
                      required
                      autoFocus
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.password ? 'border-destructive' : ''}`}
                      required
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full h-[50px] text-base rounded-xl font-semibold bg-gradient-to-br from-[#A37BFF] to-[#7D5CFF] text-white shadow-[0_4px_16px_rgba(163,123,255,0.4)] hover:shadow-[0_6px_20px_rgba(163,123,255,0.5)] hover:-translate-y-0.5 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(125,92,255,0.4)] transition-all duration-250"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In to QueryBot"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input 
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.name ? 'border-destructive' : ''}`}
                      required
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work Email</Label>
                    <Input 
                      id="signup-email"
                      type="email"
                      placeholder="john@company.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.email ? 'border-destructive' : ''}`}
                      required
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name</Label>
                    <Input 
                      id="signup-company"
                      type="text"
                      placeholder="Acme Inc."
                      value={signUpData.company}
                      onChange={(e) => setSignUpData({...signUpData, company: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.company ? 'border-destructive' : ''}`}
                      required
                    />
                    {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                      className={`rounded-2xl h-12 glass transition-all ${errors.password ? 'border-destructive' : ''}`}
                      required
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full h-[50px] text-base rounded-xl font-semibold bg-gradient-to-br from-[#A37BFF] to-[#7D5CFF] text-white shadow-[0_4px_16px_rgba(163,123,255,0.4)] hover:shadow-[0_6px_20px_rgba(163,123,255,0.5)] hover:-translate-y-0.5 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(125,92,255,0.4)] transition-all duration-250"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Start Free Trial"}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
