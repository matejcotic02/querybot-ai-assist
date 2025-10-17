import { Home, Settings, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type DashboardView = "dashboard" | "settings" | "help-center";

const menuItems = [{
  title: "Dashboard",
  view: "dashboard" as DashboardView,
  icon: Home
}, {
  title: "Settings",
  view: "settings" as DashboardView,
  icon: Settings
}, {
  title: "Help Center",
  view: "help-center" as DashboardView,
  icon: BookOpen
}];

interface DashboardSidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-card border-r border-border flex flex-col items-center py-6 gap-3 z-50">
      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          
          return (
            <button
              key={item.title}
              onClick={() => onViewChange(item.view)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background hover:bg-accent text-muted-foreground hover:text-foreground"
              }`}
              title={item.title}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      
      {/* Theme Toggle at Bottom */}
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};