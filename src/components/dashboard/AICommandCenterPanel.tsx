import { useState, useEffect, useRef } from "react";
import { X, Send, Zap, TrendingUp, AlertCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAICommandCenter } from "@/hooks/useAICommandCenter";
import { cn } from "@/lib/utils";
interface AICommandCenterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const quickActions = [{
  icon: TrendingUp,
  label: "Analyze Performance",
  prompt: "Analyze the current dashboard performance metrics and provide insights.",
  gradient: "from-blue-500 to-cyan-500"
}, {
  icon: Zap,
  label: "Optimization Tips",
  prompt: "Give me 3 actionable tips to optimize our current operations.",
  gradient: "from-purple-500 to-pink-500"
}, {
  icon: AlertCircle,
  label: "Risk Assessment",
  prompt: "Identify potential risks based on current dashboard data.",
  gradient: "from-orange-500 to-red-500"
}];
export const AICommandCenterPanel = ({
  open,
  onOpenChange
}: AICommandCenterPanelProps) => {
  const [input, setInput] = useState("");
  const {
    messages,
    sendMessage,
    isLoading
  } = useAICommandCenter();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };
  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[480px] p-0 border-l border-border/50 bg-gradient-to-br from-background/95 via-background/98 to-background">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-border/50 bg-card/30">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                AI Command Center
              </SheetTitle>
              
            </div>
          </SheetHeader>

          {/* Quick Actions */}
          <div className="px-6 py-4 space-y-2 border-b border-border/50 bg-card/20">
            <p className="text-xs text-muted-foreground font-medium mb-3">
              Quick Actions
            </p>
            <div className="grid gap-2">
              {quickActions.map((action, idx) => <Button key={idx} variant="outline" className={cn("justify-start h-auto py-3 px-4 bg-gradient-to-r hover:opacity-90 transition-opacity border-0 text-white", action.gradient)} onClick={() => handleQuickAction(action.prompt)} disabled={isLoading}>
                  <action.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>)}
            </div>
          </div>

          {/* Chat Area */}
          <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 ? <div className="flex items-center justify-center h-full text-center py-12">
                  <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ask me anything about your dashboard
                    </p>
                  </div>
                </div> : messages.map((msg, idx) => <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm")}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                      </p>
                    </div>
                  </div>)}
              {isLoading && <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="px-6 py-4 border-t border-border/50 bg-card/30">
            <div className="flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Type your message..." disabled={isLoading} className="flex-1 bg-background/50 border-border/50 focus:bg-background" />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};