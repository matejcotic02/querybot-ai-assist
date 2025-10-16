import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { RevenueCardNew } from "@/components/dashboard/RevenueCardNew";
import { CustomerSatisfactionCardNew } from "@/components/dashboard/CustomerSatisfactionCardNew";
import { ChatAssistantCard } from "@/components/dashboard/ChatAssistantCard";
import { AIInsightsCardNew } from "@/components/dashboard/AIInsightsCardNew";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen ml-16">
        <DashboardHeader />
          
        <main className="flex-1 p-4 md:p-8 space-y-6 animate-fade-in">
          {/* Top Cards Row - Revenue & Customer Satisfaction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <RevenueCardNew />
            <CustomerSatisfactionCardNew />
          </div>
          
          {/* Bottom Section - Chat & AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <ChatAssistantCard />
            </div>
            <div className="lg:col-span-1">
              <AIInsightsCardNew />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
