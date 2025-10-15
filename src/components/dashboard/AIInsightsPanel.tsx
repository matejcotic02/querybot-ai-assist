import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Zap, Clock } from "lucide-react";

const insights = [
  {
    icon: AlertCircle,
    label: "Top Recurring Issue",
    value: "Email Access Problems",
    color: "text-destructive"
  },
  {
    icon: Zap,
    label: "Tickets Auto-Resolved",
    value: "73%",
    color: "text-primary"
  },
  {
    icon: Clock,
    label: "Average Response Time",
    value: "2.3 min",
    color: "text-emerald-500"
  }
];

export const AIInsightsPanel = () => {
  return (
    <Card className="glass border-0 shadow-elegant h-full">
      <CardHeader>
        <CardTitle className="text-lg">AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-accent/30 border-0">
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-xl bg-background ${insight.color}`}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">{insight.label}</p>
                <p className="text-lg font-semibold">{insight.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button className="w-full rounded-2xl mt-4" variant="outline">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  );
};
