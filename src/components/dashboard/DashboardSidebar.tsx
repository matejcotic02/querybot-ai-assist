import { Home, MessageSquare, BarChart3, Users, Grid3x3 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
const menuItems = [{
  title: "Dashboard",
  url: "/app",
  icon: Home
}, {
  title: "Chats",
  url: "/app/chats",
  icon: MessageSquare
}, {
  title: "Analytics",
  url: "/app/analytics",
  icon: BarChart3
}, {
  title: "Contacts",
  url: "/app/contacts",
  icon: Users
}, {
  title: "Apps",
  url: "/app/apps",
  icon: Grid3x3
}];
export const DashboardSidebar = () => {
  const location = useLocation();
  return <div className="fixed left-0 top-0 h-screen w-16 bg-card border-r border-border flex flex-col items-center py-6 gap-3 z-50">
      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-2 flex-1">
        {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.url;
        return;
      })}
      </div>
      
      {/* Theme Toggle at Bottom */}
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>;
};