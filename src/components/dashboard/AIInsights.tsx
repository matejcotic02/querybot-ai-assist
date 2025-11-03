import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const insights = [
  {
    text: "AI detected latency drop by 12%",
    icon: TrendingDown,
    color: "#10B981",
    isPositive: true
  },
  {
    text: "Response accuracy improved 3% this week",
    icon: TrendingUp,
    color: "#10B981",
    isPositive: true
  },
  {
    text: "Server uptime steady at 99.8%",
    icon: Activity,
    color: "#A37BFF",
    isPositive: true
  },
  {
    text: "Automated 47% of support tickets",
    icon: TrendingUp,
    color: "#10B981",
    isPositive: true
  }
];

export const AIInsights = () => {
  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)] h-full"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15)'
          }}>
      <CardHeader>
        <CardTitle className="text-xl">AI Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-[14px] transition-all hover:scale-[1.02]"
                style={{
                  background: 'rgba(163,123,255,0.08)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(163,123,255,0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <p className="text-sm text-foreground leading-relaxed pt-2">
                  {insight.text}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
