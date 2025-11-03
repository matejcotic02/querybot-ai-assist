import { Card } from "@/components/ui/card";
import { Brain, CheckCircle, Clock } from "lucide-react";

const kpis = [
  {
    label: "System Incidents",
    value: "247",
    subtext: "Logged in the last 24 h",
    icon: Brain,
    trend: "+12%",
    trendUp: true
  },
  {
    label: "Tickets Resolved",
    value: "1,842",
    subtext: "Resolved by team",
    icon: CheckCircle,
    trend: "+8%",
    trendUp: true
  },
  {
    label: "Avg Response Time",
    value: "2.4 min",
    subtext: "Mean technician reply time",
    icon: Clock,
    trend: "-15%",
    trendUp: true
  }
];

export const DashboardKPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card
            key={kpi.label}
            className="p-6 rounded-[16px] border border-[rgba(163,123,255,0.25)] flex flex-col justify-between"
            style={{
              background: 'var(--card)',
              boxShadow: '0 0 20px rgba(163,123,255,0.15)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(163,123,255,0.2)' }}>
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className={`text-sm font-medium ${kpi.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.trend}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              {kpi.subtext && (
                <p className="text-xs text-muted-foreground mt-1">{kpi.subtext}</p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
