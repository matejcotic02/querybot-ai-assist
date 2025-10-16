import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const RevenueCardNew = () => {
  const [revenueData, setRevenueData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchRevenues();
  }, []);

  const fetchRevenues = async () => {
    const { data, error } = await supabase
      .from("revenues")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (data && data[0]) {
      setRevenueData(data[0]);
      
      // Fetch last 7 days for chart
      const { data: weekData } = await supabase
        .from("revenues")
        .select("*")
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: true });

      if (weekData) {
        const formatted = weekData.map((item, idx) => ({
          day: `Day ${idx + 1}`,
          amount: Number(item.amount),
        }));
        setChartData(formatted);
      }
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${revenueData?.amount ? Number(revenueData.amount).toLocaleString() : "0"}
        </div>
        <p className="text-xs text-muted-foreground">
          +{revenueData?.growth_rate || 0}% this week
        </p>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
