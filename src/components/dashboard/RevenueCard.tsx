import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, MoreHorizontal, TrendingUp } from "lucide-react";
import { useState } from "react";

const data = [
  { day: "Thu", revenue: 8500 },
  { day: "Fri", revenue: 9200 },
  { day: "Sat", revenue: 9800 },
  { day: "Sun", revenue: 10980 },
];

export const RevenueCard = () => {
  const [view, setView] = useState("Weekly");
  
  return (
    <Card className="shadow-elegant border-border rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/20 rounded-xl">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl h-9 text-sm">
            {view}
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">$10,980</span>
          <span className="text-sm text-secondary font-medium">+$250 this week</span>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-soft)"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={3}
              fill="url(#revenueGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
