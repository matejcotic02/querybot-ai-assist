import { Home, MessageSquare, Settings, BookOpen, TrendingUp } from "lucide-react";

type DashboardView = "dashboard" | "statistics" | "ai-reports" | "settings" | "help-center";

const menuItems = [{
  title: "Dashboard",
  view: "dashboard" as DashboardView,
  icon: Home
}, {
  title: "Support Chat",
  view: "statistics" as DashboardView,
  icon: MessageSquare
}, {
  title: "AI Analytics",
  view: "ai-reports" as DashboardView,
  icon: TrendingUp
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
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-[rgba(163,123,255,0.08)] text-[hsl(249,95%,69%)] shadow-[0_8px_16px_rgba(163,123,255,0.4)] scale-105"
                  : "bg-background hover:bg-accent hover:shadow-[0_0_20px_rgba(163,123,255,0.3)] text-muted-foreground hover:text-foreground"
              }`}
              title={item.title}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};