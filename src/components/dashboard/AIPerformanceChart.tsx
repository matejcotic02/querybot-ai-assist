import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", created: 120, resolved: 95 },
  { day: "Tue", created: 138, resolved: 132 },
  { day: "Wed", created: 156, resolved: 151 },
  { day: "Thu", created: 142, resolved: 147 },
  { day: "Fri", created: 135, resolved: 128 },
  { day: "Sat", created: 98, resolved: 102 },
  { day: "Sun", created: 87, resolved: 90 }
];

const monthlyData = [
  { day: "Week 1", created: 520, resolved: 495 },
  { day: "Week 2", created: 538, resolved: 532 },
  { day: "Week 3", created: 556, resolved: 551 },
  { day: "Week 4", created: 542, resolved: 547 }
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
            <CardTitle className="text-xl">Support Ticket Volume Trends</CardTitle>
            <CardDescription>Tickets created vs resolved over time</CardDescription>
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
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A37BFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#A37BFF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
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
              dataKey="created"
              stroke="#A37BFF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCreated)"
              name="Created"
            />
            <Area
              type="monotone"
              dataKey="resolved"
              stroke="#14B8A6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorResolved)"
              name="Resolved"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
