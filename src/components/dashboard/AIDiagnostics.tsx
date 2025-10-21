import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

interface Diagnostic {
  id: string;
  summary: string;
  ai_suggestion: string;
  confidence_score: number;
  category: string;
  applied: boolean;
}

export const AIDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);
  const [pulseUpdate, setPulseUpdate] = useState(false);

  const fetchDiagnostics = async () => {
    try {
      const { data, error } = await supabase
        .from("diagnostics")
        .select("*")
        .eq("applied", false)
        .order("confidence_score", { ascending: false })
        .limit(5);

      if (error) throw error;

      setDiagnostics(data || []);
      setLoading(false);
      setPulseUpdate(true);
      setTimeout(() => setPulseUpdate(false), 1000);
    } catch (error: any) {
      console.error("Error fetching diagnostics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const applyFix = async (id: string) => {
    try {
      const { error } = await supabase
        .from("diagnostics")
        .update({ applied: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Fix Applied",
        description: "QueryBot AI is processing the solution",
      });

      fetchDiagnostics();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const avgConfidence = diagnostics.length > 0
    ? Math.round(diagnostics.reduce((acc, d) => acc + (d.confidence_score || 0), 0) / diagnostics.length)
    : 0;

  return (
    <Card className="bg-[#0C0C1A] border-white/10 shadow-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles className={`w-5 h-5 text-[#A37BFF] ${pulseUpdate ? "animate-pulse" : ""}`} />
          AI Diagnostics & Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Skeleton className="h-[200px] bg-white/5" />
            <Skeleton className="h-[200px] lg:col-span-2 bg-white/5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#A37BFF]/20 to-[#7D5CFF]/20 p-6 rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">{diagnostics.length}</div>
              <div className="text-sm text-white/70 mb-4">Active Suggestions</div>
              <div className="text-2xl font-semibold text-[#A37BFF]">{avgConfidence}%</div>
              <div className="text-xs text-white/60">Avg Confidence</div>
            </div>

            {/* Scrollable AI Tips */}
            <ScrollArea className="lg:col-span-2 h-[200px] bg-white/5 rounded-2xl p-4">
              <div className="space-y-3">
                {diagnostics.length === 0 ? (
                  <p className="text-white/50 text-sm">No active suggestions at the moment</p>
                ) : (
                  diagnostics.map((diagnostic) => (
                    <div
                      key={diagnostic.id}
                      className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
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
                          className="bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] hover:from-[#7D5CFF] hover:to-[#A37BFF] text-white border-0 shrink-0"
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
        )}
      </CardContent>
    </Card>
  );
};
