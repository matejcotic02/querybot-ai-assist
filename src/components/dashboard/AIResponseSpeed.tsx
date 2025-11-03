import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const AIResponseSpeed = () => {
  const [progress, setProgress] = useState(0);
  const targetValue = 94;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < targetValue) {
        setProgress(progress + 1);
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [progress, targetValue]);

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)] h-[320px] flex flex-col items-center justify-center"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15)'
          }}>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="relative w-[200px] h-[200px]">
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="rgba(163,123,255,0.1)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A37BFF" />
                <stop offset="100%" stopColor="#7D5CFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{progress}%</span>
            <span className="text-sm text-muted-foreground mt-1">Accuracy</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Response Accuracy</p>
          <p className="text-xs text-green-500 mt-1">+3% since yesterday</p>
        </div>
      </CardContent>
    </Card>
  );
};
