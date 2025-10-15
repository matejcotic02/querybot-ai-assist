import { Home, Ticket, MessageSquare, BarChart3, BookOpen, Settings, Sparkles } from "lucide-react";
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
  { title: "Dashboard", url: "/app", icon: Home },
  { title: "Tickets", url: "/app/tickets", icon: Ticket },
  { title: "AI Chat", url: "/app/chat", icon: MessageSquare },
  { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
  { title: "Knowledge Base", url: "/app/knowledge", icon: BookOpen },
  { title: "Settings", url: "/app/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/app"}
                      className={({ isActive }) =>
                        isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="px-3 pb-4 mt-auto">
            <Card className="glass border-primary/20 overflow-hidden">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold text-sm">Upgrade Pro</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Unlock advanced AI features and unlimited tickets
                </p>
                <Button size="sm" className="w-full rounded-2xl shadow-glow-sm">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
