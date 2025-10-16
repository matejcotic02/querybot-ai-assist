import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, MessageSquare, User, Sparkles, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileDialog } from "./ProfileDialog";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="flex h-16 items-center gap-6 px-8">
          {/* QueryBot Logo + Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="QueryBot" className="h-10 w-10 rounded-xl" />
            <span className="text-xl font-bold text-foreground">QueryBot</span>
          </div>
          
          {/* Center Search Bar */}
          <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for a message, contact, or task"
                className="pl-11 h-11 bg-muted/30 border-border rounded-xl"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-md"
            >
              <Sparkles className="h-4 w-4" />
              AI Agent
            </Button>
            
            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted/50">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-[10px]">
                4
              </Badge>
            </Button>

            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted/50">
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 rounded-xl hover:bg-muted/50 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg" onClick={() => setProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
};
