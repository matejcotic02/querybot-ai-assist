import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const CustomerSatisfactionCardNew = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("customer_feedback")
      .select("*");

    if (data) {
      // Group by agent and calculate average
      const grouped = data.reduce((acc: any, item) => {
        if (!acc[item.agent_name]) {
          acc[item.agent_name] = { total: 0, count: 0 };
        }
        acc[item.agent_name].total += item.score;
        acc[item.agent_name].count += 1;
        return acc;
      }, {});

      const formatted = Object.keys(grouped).map(agent => ({
        agent,
        score: Math.round(grouped[agent].total / grouped[agent].count),
      }));

      setChartData(formatted);

      // Calculate overall average
      const totalScore = data.reduce((sum, item) => sum + item.score, 0);
      setAvgScore(Math.round(totalScore / data.length));
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
        <SmilePlus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{avgScore}/10</div>
        <p className="text-xs text-muted-foreground">
          {avgScore >= 8 ? "Customer Happy 😊" : "Needs Improvement"}
        </p>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="agent" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
