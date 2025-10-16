import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const AIAssistantFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-glow-lg z-50 glass border-primary/20 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base">QueryBot Assistant</CardTitle>
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
              <div className="bg-primary/5 rounded-2xl rounded-tl-sm p-3">
                <p className="text-sm">Hi! I'm QueryBot. Ask me anything about your support system or type a command.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a support question or command..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-2xl"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setMessage("");
                  }
                }}
              />
              <Button size="icon" className="rounded-2xl shrink-0">
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
