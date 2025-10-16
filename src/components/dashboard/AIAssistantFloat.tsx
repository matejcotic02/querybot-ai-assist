import { useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useITSupportChat } from "@/hooks/useITSupportChat";
import { useState } from "react";

export const AIAssistantFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useITSupportChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-glow-lg z-50 glass border-primary/20 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base">IT Support Assistant</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="h-64 overflow-y-auto space-y-3 mb-3">
              {messages.length === 0 && (
                <div className="bg-primary/5 rounded-2xl rounded-tl-sm p-3">
                  <p className="text-sm">Hi! I'm your IT Support Assistant. Ask me anything about technical issues, troubleshooting, or IT best practices.</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm ml-8"
                      : "bg-primary/5 rounded-tl-sm mr-8"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-primary/5 rounded-2xl rounded-tl-sm p-3 mr-8">
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask an IT support question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-2xl min-h-[80px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
              />
              <Button 
                size="icon" 
                className="rounded-2xl shrink-0"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow-lg z-50 hover-lift"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot className="h-6 w-6" />
      </Button>
    </>
  );
};
