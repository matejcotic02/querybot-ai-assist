import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles } from "lucide-react";

const insights = [
  {
    label: "Ticket resolution rate",
    value: "94%",
    detail: "vs last week",
    progress: 94,
    color: "hsl(142, 76%, 58%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(142, 76%, 58%, 0.1) 10px, hsl(142, 76%, 58%, 0.1) 20px)"
  },
  {
    label: "Avg response time",
    value: "2.5 min",
    detail: "15% faster",
    progress: 85,
    color: "hsl(249, 95%, 69%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(249, 95%, 69%, 0.1) 10px, hsl(249, 95%, 69%, 0.1) 20px)"
  },
  {
    label: "System uptime",
    value: "99.8%",
    detail: "this month",
    progress: 99,
    color: "hsl(45, 97%, 69%)",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(45, 97%, 69%, 0.1) 10px, hsl(45, 97%, 69%, 0.1) 20px)"
  }
];

export const AIInsightsPanel = () => {
  return (
    <Card 
      className="border overflow-hidden h-[500px] flex flex-col transition-all duration-[400ms] ease-in-out hover:-translate-y-1"
      style={{
        backgroundColor: 'hsl(var(--section-card-bg))',
        border: '1px solid hsl(var(--section-card-border))',
        boxShadow: 'var(--section-card-shadow)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '24px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--section-card-hover-shadow)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--section-card-shadow)'}
    >
      <CardHeader className="pb-4 px-0"
        style={{ color: 'hsl(var(--dashboard-card-text))' }}
      >
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
