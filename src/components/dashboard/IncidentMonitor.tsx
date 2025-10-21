import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IncidentStats {
  open: number;
  in_progress: number;
  resolved: number;
}

export const IncidentMonitor = () => {
  const [stats, setStats] = useState<IncidentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedPercentage, setResolvedPercentage] = useState(0);

  const fetchIncidentStats = async () => {
    try {
      const { data, error } = await supabase
        .from("incidents")
        .select("status");

      if (error) throw error;

      const statsCalc = {
        open: data.filter((i) => i.status === "open").length,
        in_progress: data.filter((i) => i.status === "in_progress").length,
        resolved: data.filter((i) => i.status === "resolved").length,
      };

      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? (statsCalc.resolved / total) * 100 : 0;

      setStats(statsCalc);
      setResolvedPercentage(Math.round(percentage));
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching incidents:", error);
      toast({
        title: "Error loading incidents",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentStats();
    const interval = setInterval(fetchIncidentStats, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const chartData = stats
    ? [
        { name: "Open", value: stats.open, fill: "#FF6FD8" },
        { name: "In Progress", value: stats.in_progress, fill: "#00D1FF" },
        { name: "Resolved", value: stats.resolved, fill: "#A37BFF" },
      ]
    : [];

  const getStatusIcon = () => {
    if (!stats) return "🟡";
    const total = stats.open + stats.in_progress + stats.resolved;
    if (total === 0) return "🟢";
    if (resolvedPercentage >= 80) return "🟢";
    if (resolvedPercentage >= 50) return "🟡";
    return "🔴";
  };

  return (
    <Card className="bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger>
                <span className="text-2xl">{getStatusIcon()}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{resolvedPercentage}% resolved</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
          Real-Time Incident Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full bg-white/5" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" stroke="#fff" opacity={0.5} />
              <YAxis type="category" dataKey="name" stroke="#fff" opacity={0.7} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
