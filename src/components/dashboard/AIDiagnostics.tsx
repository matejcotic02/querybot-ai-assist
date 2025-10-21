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
      className={`rounded-[16px] border-border animate-fade-in-up transition-all duration-[600ms] ease-in-out ${
        diagnostics.length > 0 ? "ring-2 ring-primary dark:shadow-[0_0_20px_rgba(163,123,255,0.3)]" : ""
      }`} 
      style={{ 
        animationDelay: "0.2s",
        backgroundColor: "hsl(var(--dashboard-card-bg))",
        color: "hsl(var(--dashboard-card-text))",
        boxShadow: "var(--dashboard-card-shadow)"
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2" style={{ color: "hsl(var(--dashboard-card-text))" }}>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          AI Diagnostics & Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-6 rounded-2xl border border-border">
            <div className="text-5xl font-bold mb-2" style={{ color: "hsl(var(--dashboard-card-text))" }}>{diagnostics.length}</div>
            <div className="text-sm opacity-70 mb-4" style={{ color: "hsl(var(--dashboard-card-text))" }}>Active Suggestions</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-60" style={{ color: "hsl(var(--dashboard-card-text))" }}>Avg Confidence</span>
                <span className="text-lg font-semibold text-primary">{avgConfidence}%</span>
              </div>
              <Progress 
                key={progressKey}
                value={avgConfidence} 
                className="h-2 bg-muted animate-fade-in" 
              />
            </div>
          </div>

          {/* Scrollable AI Tips */}
          <ScrollArea className="lg:col-span-2 h-[200px] bg-muted/30 rounded-2xl p-4">
            <div className="space-y-3">
              {diagnostics.length === 0 ? (
                <p className="opacity-50 text-sm" style={{ color: "hsl(var(--dashboard-card-text))" }}>No active suggestions at the moment</p>
              ) : (
                diagnostics.slice(0, 3).map((diagnostic, index) => (
                  <div
                    key={diagnostic.id}
                    className="bg-muted/50 p-3 rounded-xl border border-border hover:bg-muted transition-all duration-[600ms] ease-in-out animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1" style={{ color: "hsl(var(--dashboard-card-text))" }}>{diagnostic.summary}</div>
                        <div className="text-xs opacity-60 mb-2" style={{ color: "hsl(var(--dashboard-card-text))" }}>{diagnostic.ai_suggestion}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                            {diagnostic.category}
                          </span>
                          <span className="text-xs opacity-50" style={{ color: "hsl(var(--dashboard-card-text))" }}>
                            {diagnostic.confidence_score}% confidence
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => applyFix(diagnostic.id)}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white border-0 shrink-0 transition-all duration-[600ms] ease-in-out"
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
