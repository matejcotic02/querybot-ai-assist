import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useITSupportChat } from "@/hooks/useITSupportChat";
import { useState } from "react";

export const RevenueCard = () => {
  const { messages, sendMessage, isLoading } = useITSupportChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const quickActions = [
    "Check Network",
    "Create Support Ticket",
    "Run Diagnostics",
    "Reset Credentials",
    "Escalate Issue"
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <Card 
      className="border rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        background: "linear-gradient(135deg, rgba(20, 10, 40, 0.95), rgba(40, 20, 70, 0.9))",
        border: "1px solid rgba(163, 123, 255, 0.25)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 0 20px rgba(163, 123, 255, 0.15), inset 0 0 10px rgba(125, 92, 255, 0.08)"
      }}
    >
      <CardHeader className="border-b border-border/20 p-8">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-bold text-white">
            IT Support Assistant
          </CardTitle>
        </div>
        <p className="text-base text-white/80">
          Ask me anything about IT support, troubleshooting, or system performance.
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Ask me anything about IT support!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="rounded-2xl px-4 py-2 bg-muted">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-border/20 space-y-4">
          <div>
            <p className="text-sm font-semibold text-white/90 mb-3">Quick Actions</p>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action)}
                  className="rounded-xl text-sm font-medium"
                  style={{
                    background: "rgba(163, 123, 255, 0.08)",
                    border: "1px solid rgba(163, 123, 255, 0.25)",
                    color: "#A37BFF"
                  }}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Describe your issue..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              className="rounded-xl text-white placeholder:text-white/50"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(163, 123, 255, 0.2)",
                height: "52px"
              }}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-xl shrink-0"
              style={{
                background: "linear-gradient(135deg, #A37BFF, #7D5CFF)",
                width: "52px",
                height: "52px"
              }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};