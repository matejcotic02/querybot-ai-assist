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

  return (
    <Card className="shadow-elegant border-border rounded-2xl overflow-hidden flex flex-col h-full min-h-[600px] bg-[var(--card-bg)]"
      style={{
        boxShadow: "var(--shadow-sm), 0 0 16px rgba(163, 123, 255, 0.12), inset 0 0 8px rgba(125, 92, 255, 0.08)",
        backdropFilter: "blur(14px)"
      }}
    >
      <CardHeader className="border-b border-[var(--border-color)] px-6 py-5">
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            IT Support Assistant
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 px-6 py-5" style={{ maxHeight: "calc(85vh - 160px)" }}>
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
        
        <div className="px-4 py-4 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
          <div className="flex items-center gap-3">
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
              className="rounded-xl flex-1"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-xl shrink-0 h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};