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
const MOCK_DIAGNOSTICS: Diagnostic[] = [{
  id: "1",
  summary: "Network latency detected in EU region",
  ai_suggestion: "Switch to CDN endpoint eu-central-1 for 40% faster response",
  confidence_score: 94,
  category: "Network",
  applied: false
}, {
  id: "2",
  summary: "Database query optimization opportunity",
  ai_suggestion: "Add composite index on (user_id, created_at) to reduce query time by 65%",
  confidence_score: 88,
  category: "Database",
  applied: false
}, {
  id: "3",
  summary: "Memory usage spike during peak hours",
  ai_suggestion: "Enable auto-scaling between 2-6 instances based on memory threshold",
  confidence_score: 82,
  category: "Infrastructure",
  applied: false
}];
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
      description: "QueryBot AI is processing the solution"
    });
  };
  const avgConfidence = diagnostics.length > 0 ? Math.round(diagnostics.reduce((acc, d) => acc + (d.confidence_score || 0), 0) / diagnostics.length) : 0;
  return (
    <Card className="border-border rounded-2xl overflow-hidden bg-[var(--card-bg)]"
      style={{
        boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1)), 0 0 16px rgba(163, 123, 255, 0.12), inset 0 0 8px rgba(125, 92, 255, 0.08)",
        backdropFilter: "blur(14px)"
      }}>
      <CardHeader className="border-b p-6">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Diagnostics
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {avgConfidence}% avg confidence
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {diagnostics.map((diagnostic) => (
              <div key={diagnostic.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{diagnostic.summary}</h4>
                    <p className="text-xs text-muted-foreground">{diagnostic.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">
                      {diagnostic.confidence_score}%
                    </div>
                    <Progress 
                      key={`${diagnostic.id}-${progressKey}`}
                      value={diagnostic.confidence_score} 
                      className="w-20 h-1 mt-1"
                    />
                  </div>
                </div>
                <div className="mb-3 p-3 rounded bg-primary/10 text-sm">
                  💡 {diagnostic.ai_suggestion}
                </div>
                <Button 
                  size="sm" 
                  onClick={() => applyFix(diagnostic.id)}
                  className="w-full"
                  disabled={diagnostic.applied}
                >
                  {diagnostic.applied ? "Applied" : "Apply Fix"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};