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
  return;
};