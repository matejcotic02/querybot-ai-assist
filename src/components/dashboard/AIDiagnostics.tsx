import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Diagnostic {
  id: string;
  summary: string;
  ai_suggestion: string;
  confidence_score: number;
  category: string;
  applied: boolean;
}

const MOCK_DIAGNOSTICS: Diagnostic[] = [
  {
    id: "1",
    summary: "Network latency detected in EU region",
    ai_suggestion: "Switch to CDN endpoint eu-central-1 for 40% faster response",
    confidence_score: 94,
    category: "Network",
    applied: false,
  },
  {
    id: "2",
    summary: "Database query optimization opportunity",
    ai_suggestion: "Add composite index on (user_id, created_at) to reduce query time by 65%",
    confidence_score: 88,
    category: "Database",
    applied: false,
  },
  {
    id: "3",
    summary: "Memory usage spike during peak hours",
    ai_suggestion: "Enable auto-scaling between 2-6 instances based on memory threshold",
    confidence_score: 82,
    category: "Infrastructure",
    applied: false,
  },
];

export const AIDiagnostics = () => {
  const [diagnostics] = useState<Diagnostic[]>(MOCK_DIAGNOSTICS);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const applyFix = (id: string) => {
    toast({
      title: "Fix Applied",
      description: "QueryBot AI is processing the solution",
    });
  };

  const avgConfidence = diagnostics.length > 0
    ? Math.round(diagnostics.reduce((acc, d) => acc + (d.confidence_score || 0), 0) / diagnostics.length)
    : 0;

  return (
    <Card 
      className={`bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up transition-all duration-[600ms] ease-in-out ${
        diagnostics.length > 0 ? "ring-2 ring-[#A37BFF] shadow-[0_0_20px_rgba(163,123,255,0.3)]" : ""
      }`} 
      style={{ animationDelay: "0.2s" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#A37BFF] animate-pulse" />
          AI Diagnostics & Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-[#A37BFF]/20 to-[#7D5CFF]/20 p-6 rounded-2xl border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">{diagnostics.length}</div>
            <div className="text-sm text-white/70 mb-4">Active Suggestions</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Avg Confidence</span>
                <span className="text-lg font-semibold text-[#A37BFF]">{avgConfidence}%</span>
              </div>
              <Progress 
                key={progressKey}
                value={avgConfidence} 
                className="h-2 bg-white/10 animate-fade-in" 
              />
            </div>
          </div>

          {/* Scrollable AI Tips */}
          <ScrollArea className="lg:col-span-2 h-[200px] bg-white/5 rounded-2xl p-4">
            <div className="space-y-3">
              {diagnostics.length === 0 ? (
                <p className="text-white/50 text-sm">No active suggestions at the moment</p>
              ) : (
                diagnostics.slice(0, 3).map((diagnostic, index) => (
                  <div
                    key={diagnostic.id}
                    className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-[600ms] ease-in-out animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white mb-1">{diagnostic.summary}</div>
                        <div className="text-xs text-white/60 mb-2">{diagnostic.ai_suggestion}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-[#A37BFF]/20 text-[#A37BFF] rounded">
                            {diagnostic.category}
                          </span>
                          <span className="text-xs text-white/50">
                            {diagnostic.confidence_score}% confidence
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => applyFix(diagnostic.id)}
                        className="bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] hover:from-[#7D5CFF] hover:to-[#A37BFF] text-white border-0 shrink-0 transition-all duration-[600ms] ease-in-out"
                      >
                        Apply Fix <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
