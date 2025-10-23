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
    <Card 
      className="rounded-[16px] border-border animate-fade-in-up transition-all duration-[600ms] ease-in-out" 
      style={{ 
        animationDelay: "0.4s",
        backgroundColor: "hsl(var(--dashboard-card-bg))",
        color: "hsl(var(--dashboard-card-text))",
        boxShadow: "var(--dashboard-card-shadow)"
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold" style={{ color: "hsl(var(--dashboard-card-text))" }}>System Health Overview</CardTitle>
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
                className="bg-gradient-to-br from-muted/30 to-muted/50 p-4 rounded-2xl border border-border hover:from-muted/50 hover:to-muted/70 hover:scale-105 transition-all duration-[600ms] ease-in-out animate-fade-in"
                style={{ 
                  animationDelay: `${0.5 + index * 0.1}s`,
                  animation: "fade-in 600ms ease-in-out forwards"
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-6 h-6 text-primary" />
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

                <div className="text-lg font-semibold mb-1" style={{ color: "hsl(var(--dashboard-card-text))" }}>
                  {label}
                </div>

                <div className="text-xl font-bold text-primary mb-2">
                  {component.uptime_percentage.toFixed(1)}%
                </div>
                <div className="text-xs opacity-60 mb-2" style={{ color: "hsl(var(--dashboard-card-text))" }}>
                  Uptime
                </div>

                {/* Mini Line Chart */}
                <div 
                  className="rounded-lg p-2 transition-all duration-[400ms] ease-in-out"
                  style={{
                    backgroundColor: 'hsl(var(--chart-container-bg))',
                    border: '1px solid hsl(var(--chart-container-border))',
                    backdropFilter: 'blur(18px)'
                  }}
                >
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={sparklineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--chart-line-stroke))"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={800}
                        animationEasing="ease-in-out"
                        style={{ filter: 'drop-shadow(0 0 8px hsl(var(--chart-line-stroke) / 0.5))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-xs opacity-50 mt-2" style={{ color: "hsl(var(--dashboard-card-text))" }}>
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
