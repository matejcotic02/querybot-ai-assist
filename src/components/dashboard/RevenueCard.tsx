import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Wifi, Lock, AlertCircle, Wrench, Ticket } from "lucide-react";
import { useITSupportChat } from "@/hooks/useITSupportChat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const quickSuggestions = [
  { icon: Wifi, label: "Check Internet Connection", prompt: "Help me diagnose internet connectivity issues" },
  { icon: Lock, label: "Reset Password", prompt: "I need help resetting my password" },
  { icon: AlertCircle, label: "Report System Lag", prompt: "My system is running slow, can you help diagnose the issue?" },
  { icon: Wrench, label: "Troubleshoot Hardware", prompt: "I'm experiencing hardware issues that need troubleshooting" },
  { icon: Ticket, label: "Create New Ticket", prompt: "I need to create a new support ticket" },
];

export const RevenueCard = () => {
  const { messages, sendMessage, isLoading } = useITSupportChat();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    if (prompt.includes("Create New Ticket")) {
      navigate("/tickets");
    } else {
      setInput(prompt);
    }
  };

  return (
    <Card 
      className="border rounded-3xl overflow-hidden flex flex-col justify-between h-full"
      style={{
        background: "var(--card-bg)",
        boxShadow: "0 0 20px rgba(163, 123, 255, 0.15), inset 0 0 10px rgba(125, 92, 255, 0.08)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(163, 123, 255, 0.25)"
      }}
    >
      <CardHeader className="border-b p-8 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-2xl">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">IT Support Assistant</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pl-[52px]">
          Ask me anything about your technical issues
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
        
        <div className="p-6 border-t space-y-4">
          {/* Quick Support Suggestions */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Support Suggestions</h3>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(163, 123, 255, 0.05)",
                    borderColor: "rgba(163, 123, 255, 0.3)",
                  }}
                >
                  <suggestion.icon className="h-3.5 w-3.5 mr-2" />
                  {suggestion.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your IT support question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              className="rounded-2xl transition-shadow focus-visible:ring-primary"
              style={{
                boxShadow: "0 0 0 1px rgba(163, 123, 255, 0.2)",
              }}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-2xl shrink-0 h-10 w-10"
              style={{
                background: "linear-gradient(135deg, #A37BFF, #7D5CFF)",
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};