import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up with:", formData);
    // Handle sign up logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.1),transparent_60%)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 group"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Button>
        
        <Card className="border-2 rounded-3xl shadow-elevated">
          <CardHeader className="space-y-3 pb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent glow-primary" />
              <span className="text-2xl font-bold">QueryBot</span>
            </div>
            <CardTitle className="text-3xl">Start your free trial</CardTitle>
            <CardDescription className="text-base">
              No credit card required. Get started in 60 seconds.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-xl h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="rounded-xl h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="rounded-xl h-12"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full h-12 text-base rounded-xl shadow-elevated hover:glow-primary"
                size="lg"
              >
                Start Free Trial
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                By signing up, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
