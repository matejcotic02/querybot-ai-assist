import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { RecentChatPanel } from "@/components/dashboard/RecentChatPanel";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { AIAssistantFloat } from "@/components/dashboard/AIAssistantFloat";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [department, setDepartment] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6 animate-fade-in">
            <DashboardFilters 
              dateRange={dateRange}
              setDateRange={setDateRange}
              department={department}
              setDepartment={setDepartment}
            />
            
            <KPICards />
            
            <PerformanceCharts />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RecentChatPanel />
              </div>
              <div className="lg:col-span-2">
                <AIInsightsPanel />
              </div>
            </div>
          </main>
        </div>
        
        <AIAssistantFloat />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
