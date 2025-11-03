import { Card } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Clock } from "lucide-react";

const stats = [
  {
    label: "Average AI Accuracy",
    value: "94%",
    icon: TrendingUp,
    color: "#A37BFF"
  },
  {
    label: "Automated Resolutions",
    value: "128",
    icon: CheckCircle,
    color: "#7D5CFF"
  },
  {
    label: "Time Saved",
    value: "560 min",
    icon: Clock,
    color: "#A37BFF"
  }
];

export const AIAnalyticsSideCard = () => {
  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)] p-6"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15), inset 0 0 10px rgba(125,92,255,0.08)'
          }}>
      <div className="grid grid-rows-3 gap-4 h-full">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center justify-between p-4 rounded-[14px]"
              style={{
                background: 'rgba(163,123,255,0.08)'
              }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                     style={{ background: 'rgba(163,123,255,0.2)' }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
