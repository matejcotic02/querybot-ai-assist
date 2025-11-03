import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", performance: 85, prediction: 82 },
  { day: "Tue", performance: 88, prediction: 86 },
  { day: "Wed", performance: 92, prediction: 90 },
  { day: "Thu", performance: 89, prediction: 91 },
  { day: "Fri", performance: 94, prediction: 93 },
  { day: "Sat", performance: 91, prediction: 92 },
  { day: "Sun", performance: 96, prediction: 94 }
];

const monthlyData = [
  { day: "Week 1", performance: 87, prediction: 85 },
  { day: "Week 2", performance: 90, prediction: 88 },
  { day: "Week 3", performance: 92, prediction: 91 },
  { day: "Week 4", performance: 95, prediction: 93 }
];

export const AIPerformanceChart = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const data = period === "weekly" ? weeklyData : monthlyData;

  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)] h-[320px]"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15)'
          }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">AI Performance Trends</CardTitle>
            <CardDescription>Real-time system metrics overview</CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod("weekly")}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                period === "weekly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                period === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A37BFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#A37BFF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,123,255,0.1)" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid rgba(163,123,255,0.25)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="performance"
              stroke="#A37BFF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPerformance)"
              name="Performance"
            />
            <Area
              type="monotone"
              dataKey="prediction"
              stroke="#7D5CFF"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={0}
              name="Prediction"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
