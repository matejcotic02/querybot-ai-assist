import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Cpu, Wifi, HardDrive, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemComponent {
  component: string;
  status: "healthy" | "warning" | "critical";
  uptime_percentage: number;
  response_time_ms: number;
  trend: number[];
}

const MOCK_COMPONENTS: SystemComponent[] = [
  {
    component: "network",
    status: "healthy",
    uptime_percentage: 99.8,
    response_time_ms: 12,
    trend: [98.5, 99.1, 99.3, 99.6, 99.8, 99.7, 99.8],
  },
  {
    component: "servers",
    status: "healthy",
    uptime_percentage: 99.95,
    response_time_ms: 8,
    trend: [99.8, 99.85, 99.9, 99.92, 99.95, 99.93, 99.95],
  },
  {
    component: "devices",
    status: "warning",
    uptime_percentage: 97.2,
    response_time_ms: 45,
    trend: [98.1, 97.8, 97.5, 97.3, 97.0, 97.2, 97.2],
  },
  {
    component: "software",
    status: "healthy",
    uptime_percentage: 99.5,
    response_time_ms: 15,
    trend: [99.2, 99.3, 99.4, 99.5, 99.6, 99.5, 99.5],
  },
];

const componentIcons = {
  network: Wifi,
  servers: Cpu,
  devices: HardDrive,
  software: Box,
};

const componentLabels = {
  network: "Network",
  servers: "Servers",
  devices: "Devices",
  software: "Software",
};

export const SystemHealth = () => {
  const [components] = useState<SystemComponent[]>(MOCK_COMPONENTS);

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

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "critical":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card className="bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up transition-all duration-[600ms] ease-in-out" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">System Health Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((component, index) => {
            const Icon = componentIcons[component.component as keyof typeof componentIcons];
            const label = componentLabels[component.component as keyof typeof componentLabels];
            const sparklineData = component.trend.map(value => ({ value }));

            return (
              <div
                key={component.component}
                className="bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-2xl border border-white/10 hover:from-white/10 hover:to-white/15 hover:scale-105 transition-all duration-[600ms] ease-in-out animate-fade-in"
                style={{ 
                  animationDelay: `${0.5 + index * 0.1}s`,
                  animation: "fade-in 600ms ease-in-out forwards"
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-6 h-6 text-[#A37BFF]" />
                  <Badge 
                    variant={getStatusBadgeVariant(component.status)}
                    className="text-xs"
                    style={{
                      backgroundColor: getStatusColor(component.status) + "20",
                      color: getStatusColor(component.status),
                      borderColor: getStatusColor(component.status),
                    }}
                  >
                    {component.status}
                  </Badge>
                </div>

                <div className="text-lg font-semibold text-white mb-1">
                  {label}
                </div>

                <div className="text-2xl font-bold text-[#A37BFF] mb-2">
                  {component.uptime_percentage.toFixed(1)}%
                </div>
                <div className="text-xs text-white/60 mb-2">
                  Uptime
                </div>

                {/* Mini Line Chart */}
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={getStatusColor(component.status)}
                      strokeWidth={2}
                      dot={false}
                      animationDuration={600}
                      animationEasing="ease-in-out"
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="text-xs text-white/50 mt-2">
                  {component.response_time_ms}ms response
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
