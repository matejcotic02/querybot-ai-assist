import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { CustomerSatisfactionCard } from "@/components/dashboard/CustomerSatisfactionCard";
import { RecentChatPanel } from "@/components/dashboard/RecentChatPanel";

import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { HelpCenter } from "@/components/dashboard/HelpCenter";
import { AIReports } from "@/components/dashboard/AIReports";
import { DashboardKPICards } from "@/components/dashboard/DashboardKPICards";
import { AIPerformanceChart } from "@/components/dashboard/AIPerformanceChart";
import { AIResponseSpeed } from "@/components/dashboard/AIResponseSpeed";
import { ActivityTable } from "@/components/dashboard/ActivityTable";

type DashboardView = "dashboard" | "statistics" | "ai-reports" | "settings" | "help-center";
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<DashboardView>("dashboard");
  const [filterPeriod, setFilterPeriod] = useState<"today" | "week" | "month">("week");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Load saved theme for /app page or default to dark
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    
    // Check authentication on mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      // Remove dark mode when leaving /app page
      document.documentElement.classList.remove("dark");
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  return <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col min-h-screen ml-16">
        <DashboardHeader />
          
          <main className="flex-1 p-6" style={{ background: "var(--page-bg, hsl(var(--background)))" }}>
            {activeView === "dashboard" ? (
              <div className="grid gap-6">
                {/* Top Row - KPI Cards */}
                <DashboardKPICards />
                
                {/* Middle Row - Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <AIPerformanceChart />
                  </div>
                  <div className="lg:col-span-1">
                    <AIResponseSpeed />
                  </div>
                </div>
                
                {/* Bottom Row - Activity Table */}
                <ActivityTable />
              </div>
            ) : activeView === "statistics" ? (
              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
                <RevenueCard />
                <RecentChatPanel />
              </div>
            ) : activeView === "ai-reports" ? (
              <AIReports />
            ) : activeView === "settings" ? (
              <SettingsSection />
            ) : (
              <HelpCenter />
            )}
          </main>
        </div>
      </div>;
};
export default Dashboard;