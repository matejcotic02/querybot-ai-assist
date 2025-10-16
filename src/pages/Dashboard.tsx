import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { RevenueCard } from "@/components/dashboard/RevenueCard";
import { CustomerSatisfactionCard } from "@/components/dashboard/CustomerSatisfactionCard";
import { RecentChatPanel } from "@/components/dashboard/RecentChatPanel";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [department, setDepartment] = useState("all");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          
          <main className="flex-1 p-8 space-y-6 animate-fade-in">
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueCard />
              <CustomerSatisfactionCard />
            </div>
            
            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentChatPanel />
              </div>
              <div className="lg:col-span-1">
                <AIInsightsPanel />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
