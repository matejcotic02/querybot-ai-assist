import { Home, Ticket, MessageSquare, BarChart3, BookOpen, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const menuItems = [{
  title: "Dashboard",
  url: "/app",
  icon: Home
}, {
  title: "Tickets",
  url: "/app/tickets",
  icon: Ticket
}, {
  title: "AI Chat",
  url: "/app/chat",
  icon: MessageSquare
}, {
  title: "Analytics",
  url: "/app/analytics",
  icon: BarChart3
}, {
  title: "Knowledge Base",
  url: "/app/knowledge",
  icon: BookOpen
}, {
  title: "Settings",
  url: "/app/settings",
  icon: Settings
}];
export const DashboardSidebar = () => {
  const {
    state
  } = useSidebar();
  const collapsed = state === "collapsed";
  return;
};