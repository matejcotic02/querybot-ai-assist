import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ticketData = [
  { day: "Mon", tickets: 24 },
  { day: "Tue", tickets: 32 },
  { day: "Wed", tickets: 28 },
  { day: "Thu", tickets: 45 },
  { day: "Fri", tickets: 38 },
  { day: "Sat", tickets: 15 },
  { day: "Sun", tickets: 12 },
];

const ratingData = [
  { day: "Mon", rating: 8.5 },
  { day: "Tue", rating: 9.1 },
  { day: "Wed", rating: 8.8 },
  { day: "Thu", rating: 9.3 },
  { day: "Fri", rating: 9.0 },
  { day: "Sat", rating: 9.5 },
  { day: "Sun", rating: 9.2 },
];

export const PerformanceCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Tickets Handled Per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="tickets" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg">Customer Ratings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px'
                }}
              />
              <Bar 
                dataKey="rating" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
