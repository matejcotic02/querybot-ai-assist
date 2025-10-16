import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles } from "lucide-react";

const insights = [
  {
    label: "Revenue growth",
    value: "12%",
    detail: "vs last month",
    progress: 60,
    color: "hsl(249, 95%, 69%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(249, 95%, 69%, 0.1) 10px, hsl(249, 95%, 69%, 0.1) 20px)"
  },
  {
    label: "Top-selling product",
    value: "Summer Dress",
    detail: "",
    progress: 85,
    color: "hsl(142, 76%, 58%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(142, 76%, 58%, 0.1) 10px, hsl(142, 76%, 58%, 0.1) 20px)"
  },
  {
    label: "Customer churn",
    value: "8%",
    detail: "",
    progress: 40,
    color: "hsl(45, 97%, 69%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(45, 97%, 69%, 0.1) 10px, hsl(45, 97%, 69%, 0.1) 20px)"
  }
];

export const AIInsightsPanel = () => {
  return (
    <Card className="shadow-elegant border-border rounded-3xl overflow-hidden h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">AI Insight</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        {/* Insight Bars */}
        <div className="space-y-5 flex-1">
          {insights.map((insight, index) => (
            <div key={index} className="space-y-3">
              <div 
                className="h-16 rounded-2xl p-4 flex items-center justify-between"
                style={{ background: insight.pattern }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: insight.color }}
                  />
                  <span className="text-sm font-medium">{insight.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{insight.value}</p>
                  {insight.detail && (
                    <p className="text-xs text-muted-foreground">{insight.detail}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Try AI Insight Button */}
        <Button className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90 shadow-md gap-2 mt-auto">
          <Sparkles className="h-4 w-4" />
          Try AI Insight
        </Button>
      </CardContent>
    </Card>
  );
};
