import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Incident {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved";
  priority: "High" | "Medium" | "Low";
  time_opened: string;
}

interface IncidentStats {
  open: number;
  in_progress: number;
  resolved: number;
}

const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-101",
    title: "Email server latency",
    status: "open",
    priority: "High",
    time_opened: "2025-10-21T12:45:00Z"
  },
  {
    id: "INC-102",
    title: "VPN disconnects frequently",
    status: "in_progress",
    priority: "Medium",
    time_opened: "2025-10-21T10:20:00Z"
  },
  {
    id: "INC-103",
    title: "Printer offline on 2nd floor",
    status: "resolved",
    priority: "Low",
    time_opened: "2025-10-21T08:05:00Z"
  },
  {
    id: "INC-104",
    title: "Slow Wi-Fi in meeting room",
    status: "open",
    priority: "Low",
    time_opened: "2025-10-21T09:40:00Z"
  }
];

export const IncidentMonitor = () => {
  const [stats, setStats] = useState<IncidentStats | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvedPercentage, setResolvedPercentage] = useState(0);

  const fetchIncidentStats = async () => {
    try {
      const { data, error } = await supabase
        .from("incidents")
        .select("*");

      let incidentsData: Incident[] = MOCK_INCIDENTS;
      
      // Use real data if available, otherwise use mock data
      if (!error && data && data.length > 0) {
        incidentsData = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          status: item.status,
          priority: item.severity || "Medium",
          time_opened: item.created_at
        }));
      }

      const statsCalc = {
        open: incidentsData.filter((i) => i.status === "open").length,
        in_progress: incidentsData.filter((i) => i.status === "in_progress").length,
        resolved: incidentsData.filter((i) => i.status === "resolved").length,
      };

      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? (statsCalc.resolved / total) * 100 : 0;

      setStats(statsCalc);
      setIncidents(incidentsData.slice(0, 3)); // Show 3 most recent
      setResolvedPercentage(Math.round(percentage));
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching incidents:", error);
      // Fall back to mock data
      const statsCalc = {
        open: MOCK_INCIDENTS.filter((i) => i.status === "open").length,
        in_progress: MOCK_INCIDENTS.filter((i) => i.status === "in_progress").length,
        resolved: MOCK_INCIDENTS.filter((i) => i.status === "resolved").length,
      };
      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? (statsCalc.resolved / total) * 100 : 0;
      
      setStats(statsCalc);
      setIncidents(MOCK_INCIDENTS.slice(0, 3));
      setResolvedPercentage(Math.round(percentage));
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
        { name: "Open", value: stats.open, fill: "#00D1FF" },
        { name: "In Progress", value: stats.in_progress, fill: "#FFD700" },
        { name: "Resolved", value: stats.resolved, fill: "#7D5CFF" },
      ]
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40";
      case "in_progress":
        return "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40";
      case "resolved":
        return "bg-[#7D5CFF]/20 text-[#7D5CFF] border-[#7D5CFF]/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const getStatusIcon = () => {
    if (!stats) return "🟡";
    const total = stats.open + stats.in_progress + stats.resolved;
    if (total === 0) return "🟢";
    if (resolvedPercentage >= 80) return "🟢";
    if (resolvedPercentage >= 50) return "🟡";
    return "🔴";
  };

  return (
    <Card className="bg-[#0E0E18] border-white/10 shadow-lg rounded-[16px] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#FFFFFF] flex items-center gap-2">
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
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full bg-white/5" />
            <Skeleton className="h-[120px] w-full bg-white/5" />
          </div>
        ) : (
          <>
            <div className="animate-fade-in" style={{ animation: "fade-in 600ms ease-in-out" }}>
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
                  <Bar 
                    dataKey="value" 
                    radius={[0, 8, 8, 0]}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Incidents List */}
            <div className="space-y-3 animate-fade-in" style={{ animation: "fade-in 600ms ease-in-out 200ms backwards" }}>
              <h4 className="text-sm font-semibold text-[#FFFFFF] opacity-70">Recent Incidents</h4>
              {incidents.map((incident, index) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ 
                    animation: `fade-in 600ms ease-in-out ${300 + index * 100}ms backwards`,
                  }}
                >
                  <div className="flex-1">
                    <p className="text-[#FFFFFF] text-sm font-medium">{incident.title}</p>
                    <p className="text-[#FFFFFF]/50 text-xs mt-1">{incident.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(incident.priority)}`}
                    >
                      {incident.priority}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs capitalize ${getStatusColor(incident.status)}`}
                    >
                      {incident.status === "in_progress" ? "In Progress" : incident.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
