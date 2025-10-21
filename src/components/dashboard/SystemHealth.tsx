import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Cpu, Network, Database, Brain } from "lucide-react";

interface SystemComponent {
  component: string;
  status: "healthy" | "warning" | "critical";
  uptime_percentage: number;
  response_time_ms: number;
  metrics: any;
}

const componentIcons = {
  server: Cpu,
  network: Network,
  database: Database,
  ai_engine: Brain,
};

const componentLabels = {
  server: "Server",
  network: "Network",
  database: "Database",
  ai_engine: "AI Engine",
};

export const SystemHealth = () => {
  const [components, setComponents] = useState<SystemComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemHealth = async () => {
      try {
        const { data, error } = await supabase
          .from("system_health")
          .select("*")
          .order("last_check", { ascending: false });

        if (error) throw error;

        // Get latest status for each component
        const latestByComponent: Record<string, SystemComponent> = {};
        data?.forEach((item: any) => {
          if (!latestByComponent[item.component]) {
            latestByComponent[item.component] = item;
          }
        });

        setComponents(Object.values(latestByComponent));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching system health:", error);
        setLoading(false);
      }
    };

    fetchSystemHealth();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "#00D1FF";
      case "warning":
        return "#FFB800";
      case "critical":
        return "#FF6FD8";
      default:
        return "#A37BFF";
    }
  };

  const generateSparklineData = (uptime: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
      value: uptime - Math.random() * 5 + i * 0.3,
    }));
  };

  return (
    <Card className="bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">System Health Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[150px] bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["server", "network", "database", "ai_engine"].map((comp, index) => {
              const component = components.find((c) => c.component === comp);
              const Icon = componentIcons[comp as keyof typeof componentIcons];
              const sparklineData = component ? generateSparklineData(component.uptime_percentage) : [];

              return (
                <div
                  key={comp}
                  className="bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-2xl border border-white/10 hover:from-white/10 hover:to-white/15 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-6 h-6 text-[#A37BFF]" />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: component ? getStatusColor(component.status) : "#A37BFF",
                      }}
                    />
                  </div>

                  <div className="text-lg font-semibold text-white mb-1">
                    {componentLabels[comp as keyof typeof componentLabels]}
                  </div>

                  {component ? (
                    <>
                      <div className="text-2xl font-bold text-[#A37BFF] mb-2">
                        {component.uptime_percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-white/60 mb-2">
                        {component.response_time_ms?.toFixed(0)}ms response
                      </div>

                      {/* Sparkline Chart */}
                      <ResponsiveContainer width="100%" height={40}>
                        <LineChart data={sparklineData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#A37BFF"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>

                      <div className="text-xs text-white/50 capitalize mt-2">{component.status}</div>
                    </>
                  ) : (
                    <div className="text-sm text-white/50">No data available</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
