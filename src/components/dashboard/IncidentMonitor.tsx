import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
const MOCK_INCIDENTS: Incident[] = [{
  id: "INC-101",
  title: "Email server latency",
  status: "open",
  priority: "High",
  time_opened: "2025-10-21T12:45:00Z"
}, {
  id: "INC-102",
  title: "VPN disconnects frequently",
  status: "in_progress",
  priority: "Medium",
  time_opened: "2025-10-21T10:20:00Z"
}, {
  id: "INC-103",
  title: "Printer offline on 2nd floor",
  status: "resolved",
  priority: "Low",
  time_opened: "2025-10-21T08:05:00Z"
}, {
  id: "INC-104",
  title: "Slow Wi-Fi in meeting room",
  status: "open",
  priority: "Low",
  time_opened: "2025-10-21T09:40:00Z"
}];
export const IncidentMonitor = () => {
  const [stats, setStats] = useState<IncidentStats | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvedPercentage, setResolvedPercentage] = useState(0);
  const fetchIncidentStats = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("incidents").select("*");
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
        open: incidentsData.filter(i => i.status === "open").length,
        in_progress: incidentsData.filter(i => i.status === "in_progress").length,
        resolved: incidentsData.filter(i => i.status === "resolved").length
      };
      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? statsCalc.resolved / total * 100 : 0;
      setStats(statsCalc);
      setIncidents(incidentsData.slice(0, 3)); // Show 3 most recent
      setResolvedPercentage(Math.round(percentage));
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching incidents:", error);
      // Fall back to mock data
      const statsCalc = {
        open: MOCK_INCIDENTS.filter(i => i.status === "open").length,
        in_progress: MOCK_INCIDENTS.filter(i => i.status === "in_progress").length,
        resolved: MOCK_INCIDENTS.filter(i => i.status === "resolved").length
      };
      const total = statsCalc.open + statsCalc.in_progress + statsCalc.resolved;
      const percentage = total > 0 ? statsCalc.resolved / total * 100 : 0;
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
  const chartData = stats ? [{
    name: "Open",
    value: stats.open,
    fill: "#00D1FF"
  }, {
    name: "In Progress",
    value: stats.in_progress,
    fill: "#FFD700"
  }, {
    name: "Resolved",
    value: stats.resolved,
    fill: "#7D5CFF"
  }] : [];
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
  return;
};