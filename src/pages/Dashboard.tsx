import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { CustomerSatisfactionCard } from "@/components/dashboard/CustomerSatisfactionCard";
import { RecentChatPanel } from "@/components/dashboard/RecentChatPanel";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { HelpCenter } from "@/components/dashboard/HelpCenter";
import { IncidentMonitor } from "@/components/dashboard/IncidentMonitor";
import { AIDiagnostics } from "@/components/dashboard/AIDiagnostics";
import { TechnicianPerformance } from "@/components/dashboard/TechnicianPerformance";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
type DashboardView = "dashboard" | "settings" | "help-center";
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<DashboardView>("dashboard");
  const [filterPeriod, setFilterPeriod] = useState<"today" | "week" | "month">("week");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
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

    return () => subscription.unsubscribe();
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
          
          <main className="flex-1 p-8 space-y-6">
            {activeView === "dashboard" ? <>
                {/* Filters */}
                
                
                {/* Top Cards Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                  <RevenueCard />
                  <CustomerSatisfactionCard />
                </div>
                
                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                  <div className="lg:col-span-2">
                    <RecentChatPanel />
                  </div>
                  <div className="lg:col-span-1">
                    <AIInsightsPanel />
                  </div>
                </div>

                {/* New Advanced Dashboard Sections */}
                <div className="space-y-6 mt-8">
                  <IncidentMonitor />
                  <AIDiagnostics />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TechnicianPerformance />
                    <SystemHealth />
                  </div>
                </div>
              </> : activeView === "settings" ? <SettingsSection /> : <HelpCenter />}
          </main>
        </div>
      </div>;
};
export default Dashboard;