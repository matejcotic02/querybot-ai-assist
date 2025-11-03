import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Network, Mail, Wrench, Key, FileText, Activity, Phone } from "lucide-react";
import { useITSupportChat } from "@/hooks/useITSupportChat";
import { useState } from "react";

const suggestions = [
  { label: "Diagnose Network Issue", icon: Network, prompt: "Please analyze current network latency and connectivity." },
  { label: "Restart Email Server", icon: Mail, prompt: "Restart the email server and verify uptime." },
  { label: "Report Hardware Problem", icon: Wrench, prompt: "I need to report a hardware problem." },
  { label: "Reset User Password", icon: Key, prompt: "Initiate password reset for user." },
  { label: "Check Ticket Status", icon: FileText, prompt: "Check my ticket status." },
  { label: "View System Health", icon: Activity, prompt: "Show me the current system health status." },
  { label: "Contact Technician", icon: Phone, prompt: "I need to contact a technician." },
];

export const RevenueCard = () => {
  const { messages, sendMessage, isLoading } = useITSupportChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    if (!isLoading) {
      setInput(prompt);
    }
  };

  return (
    <Card 
      className="border-border rounded-2xl overflow-hidden flex flex-col justify-between h-full bg-[var(--card-bg)]"
      style={{
        boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1)), 0 0 16px rgba(163, 123, 255, 0.12), inset 0 0 8px rgba(125, 92, 255, 0.08)",
        backdropFilter: "blur(14px)"
      }}
    >
      <CardHeader className="border-b p-6">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          IT Support Assistant
        </CardTitle>
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
        
        <div className="p-4 border-t space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about IT support..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              className="rounded-2xl"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-2xl shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Support Suggestions */}
          <div 
            className="flex flex-wrap gap-3 p-4 bg-card rounded-2xl border border-border"
            style={{
              boxShadow: "0 0 16px rgba(163, 123, 255, 0.1)"
            }}
          >
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion.prompt)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, rgba(163, 123, 255, 0.25), rgba(125, 92, 255, 0.15))",
                  color: "hsl(var(--foreground))"
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = "rgba(163, 123, 255, 0.4)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(163, 123, 255, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(163, 123, 255, 0.25), rgba(125, 92, 255, 0.15))";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <suggestion.icon className="h-4 w-4" />
                <span>{suggestion.label}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};