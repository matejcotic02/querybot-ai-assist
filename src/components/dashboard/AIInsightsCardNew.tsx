import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

export const AIInsightsCardNew = () => {
  const [insights, setInsights] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data[0]) {
      setInsights(data[0]);
    }
  };

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Revenue Growth</span>
              <span className="font-bold">{insights?.revenue_growth || 0}%</span>
            </div>
            <Progress value={Number(insights?.revenue_growth || 0)} />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Customer Churn</span>
              <span className="font-bold">{insights?.customer_churn || 0}%</span>
            </div>
            <Progress value={Number(insights?.customer_churn || 0)} className="[&>div]:bg-destructive" />
          </div>

          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-1">Top Product</p>
            <p className="text-sm font-semibold">{insights?.top_product || "N/A"}</p>
          </div>

          <Button 
            onClick={() => setModalOpen(true)} 
            className="w-full gap-2"
            variant="outline"
          >
            <Sparkles className="h-4 w-4" />
            Try AI Insight
          </Button>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Insight Details</DialogTitle>
            <DialogDescription>
              {insights?.description || "No insights available"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
