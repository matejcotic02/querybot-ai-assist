import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Target, Clock, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
const kpiData = {
  response_accuracy: "94%",
  automated_resolutions: 128,
  time_saved: "560 min",
  trend: [{
    value: 70
  }, {
    value: 75
  }, {
    value: 80
  }, {
    value: 88
  }, {
    value: 90
  }, {
    value: 92
  }, {
    value: 94
  }]
};
const kpiCards = [{
  label: "Average Response Accuracy",
  value: kpiData.response_accuracy,
  icon: Target,
  color: "hsl(249, 95%, 69%)"
}, {
  label: "Total Automated Resolutions",
  value: kpiData.automated_resolutions,
  icon: Zap,
  color: "hsl(142, 76%, 58%)"
}, {
  label: "Time Saved",
  value: kpiData.time_saved,
  icon: Clock,
  color: "hsl(45, 97%, 69%)"
}];
export const AIInsightsPanel = () => {
  return <Card className="border-border rounded-2xl overflow-hidden bg-[var(--card-bg)] lg:col-span-2" style={{
    boxShadow: "0 0 14px rgba(163, 123, 255, 0.15), inset 0 0 8px rgba(125, 92, 255, 0.08)"
  }}>
      
      
    </Card>;
};