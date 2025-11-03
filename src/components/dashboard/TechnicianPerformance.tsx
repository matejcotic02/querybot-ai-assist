import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface Technician {
  id: string;
  name: string;
  avatar_url: string | null;
  tickets_resolved: number;
  tickets_open: number;
  avg_resolution_time_hours: number;
  rating: number;
}
const MOCK_TECHNICIANS: Technician[] = [{
  id: "1",
  name: "Sarah Chen",
  avatar_url: null,
  tickets_resolved: 142,
  tickets_open: 8,
  avg_resolution_time_hours: 2.3,
  rating: 9.2
}, {
  id: "2",
  name: "Marcus Rodriguez",
  avatar_url: null,
  tickets_resolved: 128,
  tickets_open: 12,
  avg_resolution_time_hours: 3.1,
  rating: 8.8
}, {
  id: "3",
  name: "Emily Watson",
  avatar_url: null,
  tickets_resolved: 115,
  tickets_open: 6,
  avg_resolution_time_hours: 2.7,
  rating: 9.0
}, {
  id: "4",
  name: "David Kim",
  avatar_url: null,
  tickets_resolved: 98,
  tickets_open: 10,
  avg_resolution_time_hours: 3.5,
  rating: 8.5
}, {
  id: "5",
  name: "Lisa Thompson",
  avatar_url: null,
  tickets_resolved: 87,
  tickets_open: 5,
  avg_resolution_time_hours: 2.9,
  rating: 8.7
}];
export const TechnicianPerformance = () => {
  const [technicians] = useState<Technician[]>(MOCK_TECHNICIANS);
  const chartData = technicians.map(tech => ({
    name: tech.name.split(" ")[0],
    fullName: tech.name,
    resolved: tech.tickets_resolved,
    open: tech.tickets_open,
    avgTime: tech.avg_resolution_time_hours,
    rating: tech.rating,
    avatar: tech.avatar_url
  }));
  const topPerformer = chartData[0];
  const colors = chartData.map((_, index) => index === 0 ? "url(#gradient)" : "#00D1FF");
  return (
    <Card className="border-border rounded-2xl overflow-hidden bg-[var(--card-bg)]"
      style={{
        boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1)), 0 0 16px rgba(163, 123, 255, 0.12), inset 0 0 8px rgba(125, 92, 255, 0.08)",
        backdropFilter: "blur(14px)"
      }}>
      <CardHeader className="border-b p-6">
        <CardTitle className="flex items-center gap-2">
          Technician Performance
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger>
                <div className="ml-2 text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                  Top: {topPerformer?.fullName}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Highest tickets resolved</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7D5CFF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#A37BFF" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/95 backdrop-blur border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-medium mb-2">{data.fullName}</p>
                        <p className="text-sm text-muted-foreground">Resolved: {data.resolved}</p>
                        <p className="text-sm text-muted-foreground">Open: {data.open}</p>
                        <p className="text-sm text-muted-foreground">Avg Time: {data.avgTime}h</p>
                        <p className="text-sm text-primary">Rating: {data.rating}/10</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="resolved" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {chartData.slice(0, 3).map((tech, index) => (
            <div key={tech.fullName} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={tech.avatar || undefined} />
                <AvatarFallback>{tech.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{tech.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {tech.resolved} resolved • {tech.avgTime}h avg
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">{tech.rating}/10</div>
                {index === 0 && <div className="text-xs text-yellow-500">⭐ Top</div>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};