import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Target, Clock, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const kpiData = {
  response_accuracy: "94%",
  automated_resolutions: 128,
  time_saved: "560 min",
  trend: [
    { value: 70 },
    { value: 75 },
    { value: 80 },
    { value: 88 },
    { value: 90 },
    { value: 92 },
    { value: 94 }
  ]
};

const kpiCards = [
  {
    label: "Average Response Accuracy",
    value: kpiData.response_accuracy,
    icon: Target,
    color: "hsl(249, 95%, 69%)"
  },
  {
    label: "Total Automated Resolutions",
    value: kpiData.automated_resolutions,
    icon: Zap,
    color: "hsl(142, 76%, 58%)"
  },
  {
    label: "Time Saved",
    value: kpiData.time_saved,
    icon: Clock,
    color: "hsl(45, 97%, 69%)"
  }
];

export const AIInsightsPanel = () => {
  return (
    <Card 
      className="border-border rounded-2xl overflow-hidden bg-[var(--card-bg)] lg:col-span-2"
      style={{
        boxShadow: "0 0 14px rgba(163, 123, 255, 0.15), inset 0 0 8px rgba(125, 92, 255, 0.08)"
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
            <CardDescription className="text-sm">Real-time performance and prediction overview</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiCards.map((kpi, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-border bg-background/50"
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${kpi.color}20` }}
                >
                  <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Trend Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">AI Improvement Trend</h4>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData.trend}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(249, 95%, 69%)" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(249, 95%, 69%)", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
