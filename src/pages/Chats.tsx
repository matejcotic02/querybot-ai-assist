import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Chats = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-16">
        <DashboardHeader />
        <main className="p-6 pt-24">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Chats</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chat functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chats;
