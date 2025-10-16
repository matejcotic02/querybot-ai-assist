import { Home, MessageSquare, BarChart3, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Home", url: "/app", icon: Home },
  { title: "Chats", url: "/app/chat", icon: MessageSquare },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Profile", url: "/app/profile", icon: User },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-20" : "w-20"} collapsible="icon">
      <SidebarContent className="flex flex-col items-center py-6 gap-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/app"}
                      className={({ isActive }) =>
                        `flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
