import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronDown, MoreHorizontal, Smile } from "lucide-react";
import { useState } from "react";
import { GlowOverlay } from "@/components/ui/glow-overlay";

const data = [
  { agent: "AS", rating: 7, color: "hsl(45, 97%, 69%)" },
  { agent: "HR", rating: 15, color: "hsl(338, 78%, 68%)" },
  { agent: "CS", rating: 9, color: "hsl(174, 58%, 74%)" },
  { agent: "HD", rating: 6, color: "hsl(174, 58%, 60%)" },
  { agent: "CS", rating: 12, color: "hsl(174, 58%, 74%)" },
  { agent: "SS", rating: 11, color: "hsl(45, 97%, 69%)" },
  { agent: "AA", rating: 8, color: "hsl(174, 58%, 60%)" },
  { agent: "BS", rating: 14, color: "hsl(249, 95%, 69%)" },
  { agent: "AS", rating: 10, color: "hsl(45, 97%, 69%)" },
  { agent: "CS", rating: 16, color: "hsl(174, 58%, 74%)" },
];

export const CustomerSatisfactionCard = () => {
  const [view, setView] = useState("Weekly");
  
  return (
    <Card className="shadow-elegant border-border rounded-3xl overflow-visible relative" style={{ backgroundColor: '#121217' }}>
      <GlowOverlay />
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Smile className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">Customer Satisfaction</CardTitle>
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
        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">10</span>
            <span className="text-sm text-muted-foreground">with AI Agent</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-xl">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Smile className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium">9/10</p>
              <p className="text-xs text-muted-foreground">Customer Happy</p>
            </div>
          </div>
          <span className="text-sm text-secondary font-medium ml-auto">+3 this week</span>
        </div>
        
        <div 
          className="rounded-[16px] p-4 transition-all duration-[400ms] ease-in-out hover:scale-[1.02]"
          style={{
            backgroundColor: 'hsl(var(--chart-container-bg))',
            border: '1px solid hsl(var(--chart-container-border))',
            boxShadow: 'var(--chart-container-shadow)',
            backdropFilter: 'blur(18px)',
            animation: 'fade-in 800ms ease-in-out'
          }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" vertical={false} />
              <XAxis 
                dataKey="agent" 
                stroke="hsl(var(--chart-text))" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--chart-text))" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--chart-tooltip-bg))",
                  border: "1px solid hsl(var(--chart-tooltip-border))",
                  borderRadius: "12px",
                  color: "hsl(var(--chart-tooltip-text))",
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Bar 
                dataKey="rating" 
                radius={[8, 8, 0, 0]}
                animationDuration={800}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(163, 123, 255, 0.3))' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
