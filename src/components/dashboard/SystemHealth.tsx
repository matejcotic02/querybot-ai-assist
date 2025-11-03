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
const MOCK_COMPONENTS: SystemComponent[] = [{
  component: "network",
  status: "healthy",
  uptime_percentage: 99.8,
  response_time_ms: 12,
  trend: [98.5, 99.1, 99.3, 99.6, 99.8, 99.7, 99.8]
}, {
  component: "servers",
  status: "healthy",
  uptime_percentage: 99.95,
  response_time_ms: 8,
  trend: [99.8, 99.85, 99.9, 99.92, 99.95, 99.93, 99.95]
}, {
  component: "devices",
  status: "warning",
  uptime_percentage: 97.2,
  response_time_ms: 45,
  trend: [98.1, 97.8, 97.5, 97.3, 97.0, 97.2, 97.2]
}, {
  component: "software",
  status: "healthy",
  uptime_percentage: 99.5,
  response_time_ms: 15,
  trend: [99.2, 99.3, 99.4, 99.5, 99.6, 99.5, 99.5]
}];
const componentIcons = {
  network: Wifi,
  servers: Cpu,
  devices: HardDrive,
  software: Box
};
const componentLabels = {
  network: "Network",
  servers: "Servers",
  devices: "Devices",
  software: "Software"
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
  return;
};