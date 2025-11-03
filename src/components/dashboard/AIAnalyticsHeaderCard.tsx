import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

export const AIAnalyticsHeaderCard = () => {
  return (
    <div className="col-span-2 h-[140px] rounded-[20px] flex items-center justify-between p-6 md:p-8 shadow-[0_0_24px_rgba(163,123,255,0.15)]"
         style={{
           background: 'linear-gradient(135deg, rgba(163,123,255,0.25), rgba(125,92,255,0.1))'
         }}>
      {/* Left Side - Text & Progress */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">
            Hello, QueryBot User 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Your AI system processed 326 requests today
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-[220px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Daily Goal</span>
            <span className="text-xs font-medium text-foreground">82%</span>
          </div>
          <Progress value={82} className="h-2" />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-primary/20">
        <Brain className="w-12 h-12 text-primary" />
      </div>
    </div>
  );
};
