import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, MoreHorizontal, TrendingUp } from "lucide-react";
import { useState } from "react";
const data = [{
  day: "Thu",
  revenue: 8500
}, {
  day: "Fri",
  revenue: 9200
}, {
  day: "Sat",
  revenue: 9800
}, {
  day: "Sun",
  revenue: 10980
}];
export const RevenueCard = () => {
  const [view, setView] = useState("Weekly");
  return <Card className="shadow-elegant border-border rounded-3xl overflow-hidden">
      
      
    </Card>;
};