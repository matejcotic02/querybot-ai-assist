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

interface IncidentStats {
  open: number;
  in_progress: number;
  resolved: number;
}

interface Incident {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved";
  priority: "High" | "Medium" | "Low";
  time_opened: string;
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
  const [loading, setLoading] = useState(true);
  const [resolvedPercentage, setResolvedPercentage] = useState(0);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);

  const fetchIncidentStats = async () => {
    try {
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Use real data if available, otherwise use mock data
      let incidentsData: Incident[];
      if (data && data.length > 0) {
        // Transform Supabase data to match Incident interface
        incidentsData = data.map(incident => ({
          id: incident.id,
          title: incident.title,
          status: incident.status as "open" | "in_progress" | "resolved",
          priority: incident.severity as "High" | "Medium" | "Low",
          time_opened: incident.created_at,
        }));
      } else {
        incidentsData = MOCK_INCIDENTS;
      }

      setIncidents(incidentsData.slice(0, 3)); // Show only 3 most recent

      const statsCalc = {
        open: incidentsData.filter((i) => i.status === "open").length,
        in_progress: incidentsData.filter((i) => i.status === "in_progress").length,
        resolved: incidentsData.filter((i) => i.status === "resolved").length,
      };

      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? (statsCalc.resolved / total) * 100 : 0;

      setStats(statsCalc);
      setResolvedPercentage(Math.round(percentage));
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching incidents:", error);
      // Fallback to mock data on error
      const statsCalc = {
        open: MOCK_INCIDENTS.filter((i) => i.status === "open").length,
        in_progress: MOCK_INCIDENTS.filter((i) => i.status === "in_progress").length,
        resolved: MOCK_INCIDENTS.filter((i) => i.status === "resolved").length,
      };
      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? (statsCalc.resolved / total) * 100 : 0;
      
      setStats(statsCalc);
      setResolvedPercentage(Math.round(percentage));
      setIncidents(MOCK_INCIDENTS.slice(0, 3));
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
        { name: "Resolved", value: stats.resolved, fill: "#A37BFF" },
      ]
    : [];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: "Open", color: "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/30" },
      in_progress: { label: "In Progress", color: "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30" },
      resolved: { label: "Resolved", color: "bg-[#A37BFF]/20 text-[#A37BFF] border-[#A37BFF]/30" },
    };
    const config = statusMap[status as keyof typeof statusMap] || statusMap.open;
    return <Badge className={`${config.color} border`}>{config.label}</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: "text-red-400",
      Medium: "text-yellow-400",
      Low: "text-green-400",
    };
    return colors[priority as keyof typeof colors] || colors.Low;
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
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full bg-white/5" />
          </div>
        ) : (
          <>
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
                <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={600} animationEasing="ease-in-out" />
              </BarChart>
            </ResponsiveContainer>

            {/* Recent Incidents List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/70 mb-3">Recent Incidents</h3>
              {incidents.map((incident, index) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-white/50">{incident.id}</span>
                      <span className={`text-xs font-semibold ${getPriorityColor(incident.priority)}`}>
                        {incident.priority}
                      </span>
                    </div>
                    <p className="text-sm text-white font-medium">{incident.title}</p>
                  </div>
                  <div className="ml-3">
                    {getStatusBadge(incident.status)}
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
