import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Technician {
  id: string;
  name: string;
  avatar_url: string | null;
  tickets_resolved: number;
  tickets_open: number;
  avg_resolution_time_hours: number;
  rating: number;
}

const MOCK_TECHNICIANS: Technician[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar_url: null,
    tickets_resolved: 142,
    tickets_open: 8,
    avg_resolution_time_hours: 2.3,
    rating: 9.2,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    avatar_url: null,
    tickets_resolved: 128,
    tickets_open: 12,
    avg_resolution_time_hours: 3.1,
    rating: 8.8,
  },
  {
    id: "3",
    name: "Emily Watson",
    avatar_url: null,
    tickets_resolved: 115,
    tickets_open: 6,
    avg_resolution_time_hours: 2.7,
    rating: 9.0,
  },
  {
    id: "4",
    name: "David Kim",
    avatar_url: null,
    tickets_resolved: 98,
    tickets_open: 10,
    avg_resolution_time_hours: 3.5,
    rating: 8.5,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar_url: null,
    tickets_resolved: 87,
    tickets_open: 5,
    avg_resolution_time_hours: 2.9,
    rating: 8.7,
  },
];

export const TechnicianPerformance = () => {
  const [technicians] = useState<Technician[]>(MOCK_TECHNICIANS);

  const chartData = technicians.map((tech) => ({
    name: tech.name.split(" ")[0],
    fullName: tech.name,
    resolved: tech.tickets_resolved,
    open: tech.tickets_open,
    avgTime: tech.avg_resolution_time_hours,
    rating: tech.rating,
    avatar: tech.avatar_url,
  }));

  const topPerformer = chartData[0];
  const colors = chartData.map((_, index) => 
    index === 0 ? "url(#gradient)" : "#00D1FF"
  );

  return (
    <Card 
      className="rounded-[16px] border-border animate-fade-in-up transition-all duration-[600ms] ease-in-out" 
      style={{ 
        animationDelay: "0.3s",
        backgroundColor: "hsl(var(--dashboard-card-bg))",
        color: "hsl(var(--dashboard-card-text))",
        boxShadow: "var(--dashboard-card-shadow)"
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold" style={{ color: "hsl(var(--dashboard-card-text))" }}>Technician Performance Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A37BFF" />
                  <stop offset="100%" stopColor="#7D5CFF" />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="currentColor" opacity={0.7} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card p-3 rounded-lg border border-border transition-all duration-[600ms] ease-in-out" style={{ color: "hsl(var(--dashboard-card-text))" }}>
                        <p className="font-semibold mb-2">{data.fullName}</p>
                        <p className="text-sm text-primary">Tickets Closed: {data.resolved}</p>
                        <p className="text-sm text-secondary">Open: {data.open}</p>
                        <p className="text-sm opacity-70">Avg Response: {data.avgTime?.toFixed(1)}h</p>
                        <p className="text-sm opacity-70">Rating: {data.rating?.toFixed(1)}/10</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="resolved" 
                radius={[8, 8, 0, 0]}
                className="transition-all duration-[600ms] ease-in-out"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index]} 
                    className="hover:opacity-80 transition-opacity duration-[600ms] ease-in-out cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Avatars with Stats */}
          <div className="flex items-center justify-around pt-2">
            <TooltipProvider>
              {technicians.map((tech, index) => (
                <TooltipUI key={tech.id}>
                  <TooltipTrigger>
                    <div className="flex flex-col items-center gap-2 group">
                      <Avatar className="w-12 h-12 border-2 border-primary hover:scale-110 transition-all duration-[600ms] ease-in-out">
                        <AvatarImage src={tech.avatar_url || undefined} />
                        <AvatarFallback className={`text-white ${index === 0 ? "bg-gradient-to-br from-primary to-primary/80" : "bg-secondary"}`}>
                          {tech.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-xs opacity-70" style={{ color: "hsl(var(--dashboard-card-text))" }}>{tech.avg_resolution_time_hours.toFixed(1)}h avg</p>
                        <p className="text-xs text-primary font-semibold">{tech.rating.toFixed(1)}/10</p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-semibold">{tech.name}</p>
                      <p className="opacity-70">{tech.tickets_resolved} tickets closed</p>
                    </div>
                  </TooltipContent>
                </TooltipUI>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
