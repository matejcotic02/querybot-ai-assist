import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const accuracyData = [
  { day: "Mon", accuracy: 89, prediction: 91 },
  { day: "Tue", accuracy: 92, prediction: 93 },
  { day: "Wed", accuracy: 88, prediction: 90 },
  { day: "Thu", accuracy: 94, prediction: 95 },
  { day: "Fri", accuracy: 91, prediction: 93 },
  { day: "Sat", accuracy: 93, prediction: 94 },
  { day: "Sun", accuracy: 95, prediction: 96 }
];

export const AIPerformanceTrendCard = () => {
  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)] p-6 flex flex-col justify-between"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15), inset 0 0 10px rgba(125,92,255,0.08)'
          }}>
      {/* Top Row - Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          AI Accuracy Trend
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time model prediction overview
        </p>
      </div>

      {/* Chart */}
      <div className="h-[180px] w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={accuracyData}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(163,123,255,0.3)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgba(163,123,255,0.08)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,123,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(163,123,255,0.5)" 
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="rgba(163,123,255,0.5)" 
              style={{ fontSize: '11px' }}
              domain={[85, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(22,16,40,0.95)', 
                border: '1px solid rgba(163,123,255,0.25)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
            />
            <Area
              type="monotone" 
              dataKey="accuracy" 
              stroke="#A37BFF" 
              strokeWidth={2}
              fill="url(#accuracyGradient)"
              dot={{ fill: '#A37BFF', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="#7D5CFF" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row - Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#A37BFF]"></div>
          <span className="text-muted-foreground">Previous</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#7D5CFF]"></div>
          <span className="text-muted-foreground">AI Prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Interval: Weekly</span>
        </div>
      </div>
    </Card>
  );
};
