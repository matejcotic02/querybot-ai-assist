import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const timelineData = [
  { period: "Mon", Recommendation: 45, Error: 12, Skipped: 8 },
  { period: "Tue", Recommendation: 52, Error: 8, Skipped: 5 },
  { period: "Wed", Recommendation: 48, Error: 15, Skipped: 10 },
  { period: "Thu", Recommendation: 61, Error: 6, Skipped: 7 },
  { period: "Fri", Recommendation: 55, Error: 10, Skipped: 6 },
  { period: "Sat", Recommendation: 38, Error: 14, Skipped: 12 },
  { period: "Sun", Recommendation: 42, Error: 9, Skipped: 8 }
];

const filters = ["1 day", "1 week", "1 month", "1 year", "All"];

export const AIEventsTimelineCard = () => {
  const [activeFilter, setActiveFilter] = useState("1 week");

  return (
    <Card className="col-span-2 rounded-[20px] border border-[rgba(163,123,255,0.25)] p-6 flex flex-col gap-5"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15), inset 0 0 10px rgba(125,92,255,0.08)'
          }}>
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          AI Events Timeline
        </h3>
        <p className="text-xs text-muted-foreground">
          Daily performance categories (Recommendations, Errors, Skipped)
        </p>
      </div>

      {/* Chart */}
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,123,255,0.1)" />
            <XAxis 
              dataKey="period" 
              stroke="rgba(163,123,255,0.5)" 
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="rgba(163,123,255,0.5)" 
              style={{ fontSize: '11px' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(22,16,40,0.95)', 
                border: '1px solid rgba(163,123,255,0.25)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '12px'
              }}
              iconType="circle"
            />
            <Bar dataKey="Recommendation" fill="#A37BFF" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Error" fill="#F87171" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Skipped" fill="#FACC15" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "bg-primary text-white shadow-[0_0_16px_rgba(163,123,255,0.4)]"
                : "bg-background/40 text-muted-foreground hover:bg-primary/20"
            }`}>
            {filter}
          </button>
        ))}
      </div>
    </Card>
  );
};
