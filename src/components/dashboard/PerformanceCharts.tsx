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
      <Card 
        className="border-0 rounded-[16px] animate-fade-in transition-all duration-[400ms] ease-in-out hover:scale-[1.02]"
        style={{
          backgroundColor: 'hsl(var(--chart-container-bg))',
          border: '1px solid hsl(var(--chart-container-border))',
          boxShadow: 'var(--chart-container-shadow)',
          animation: 'fade-in 800ms ease-in-out'
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: 'hsl(var(--dashboard-card-text))' }}>Tickets Handled Per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis dataKey="day" stroke="hsl(var(--chart-text))" fontSize={12} />
              <YAxis stroke="hsl(var(--chart-text))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--chart-tooltip-bg))',
                  border: '1px solid hsl(var(--chart-tooltip-border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--chart-tooltip-text))',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="tickets" 
                stroke="hsl(var(--chart-line-stroke))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-line-stroke))', r: 4 }}
                style={{ filter: 'drop-shadow(0 0 8px hsl(var(--chart-line-stroke) / 0.5))' }}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card 
        className="border-0 rounded-[16px] animate-fade-in transition-all duration-[400ms] ease-in-out hover:scale-[1.02]"
        style={{
          backgroundColor: 'hsl(var(--chart-container-bg))',
          border: '1px solid hsl(var(--chart-container-border))',
          boxShadow: 'var(--chart-container-shadow)',
          animation: 'fade-in 800ms ease-in-out 200ms backwards'
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: 'hsl(var(--dashboard-card-text))' }}>Customer Ratings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis dataKey="day" stroke="hsl(var(--chart-text))" fontSize={12} />
              <YAxis domain={[0, 10]} stroke="hsl(var(--chart-text))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--chart-tooltip-bg))',
                  border: '1px solid hsl(var(--chart-tooltip-border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--chart-tooltip-text))',
                }}
              />
              <Bar 
                dataKey="rating" 
                fill="hsl(var(--chart-fill))" 
                radius={[8, 8, 0, 0]}
                style={{ filter: 'drop-shadow(0 0 8px hsl(var(--chart-line-stroke) / 0.5))' }}
                animationDuration={800}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
