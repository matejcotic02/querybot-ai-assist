import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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

export const TechnicianPerformance = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const { data, error } = await supabase
          .from("technicians")
          .select("*")
          .order("tickets_resolved", { ascending: false })
          .limit(5);

        if (error) throw error;

        setTechnicians(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching technicians:", error);
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const chartData = technicians.map((tech) => ({
    name: tech.name.split(" ")[0],
    fullName: tech.name,
    resolved: tech.tickets_resolved,
    open: tech.tickets_open,
    avgTime: tech.avg_resolution_time_hours,
    rating: tech.rating,
    avatar: tech.avatar_url,
  }));

  const colors = ["#A37BFF", "#00D1FF", "#FF6FD8", "#A37BFF", "#00D1FF"];

  return (
    <Card className="bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Technician Performance Board</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[250px] w-full bg-white/5" />
        ) : (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#fff" opacity={0.7} />
                <YAxis stroke="#fff" opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1a1a2e] p-3 rounded-lg border border-white/10">
                          <p className="font-semibold text-white mb-2">{data.fullName}</p>
                          <p className="text-sm text-[#A37BFF]">Resolved: {data.resolved}</p>
                          <p className="text-sm text-[#00D1FF]">Open: {data.open}</p>
                          <p className="text-sm text-white/70">Avg Time: {data.avgTime?.toFixed(1)}h</p>
                          <p className="text-sm text-white/70">Rating: {data.rating?.toFixed(1)}★</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="resolved" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Avatars Row */}
            <div className="flex items-center justify-around pt-2">
              <TooltipProvider>
                {technicians.map((tech) => (
                  <TooltipUI key={tech.id}>
                    <TooltipTrigger>
                      <Avatar className="w-12 h-12 border-2 border-[#A37BFF] hover:scale-110 transition-transform">
                        <AvatarImage src={tech.avatar_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-[#A37BFF] to-[#7D5CFF] text-white">
                          {tech.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p className="font-semibold">{tech.name}</p>
                        <p className="text-white/70">{tech.tickets_resolved} tickets resolved</p>
                      </div>
                    </TooltipContent>
                  </TooltipUI>
                ))}
              </TooltipProvider>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
