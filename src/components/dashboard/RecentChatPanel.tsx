import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MoreHorizontal, ExternalLink, CheckCheck, Lock } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    message: "My laptop won't turn on...",
    userMessage: "Hi, my laptop won't turn on. I've tried holding the power button but nothing happens. The charging light is on though.",
    botResponse: "I understand the frustration. Let's troubleshoot this step by step:\n\n1. First, try a hard reset - disconnect the charger, remove the battery (if removable), and hold the power button for 30 seconds.\n2. Reconnect everything and try turning it on.\n3. If that doesn't work, try connecting to an external monitor to see if it's a display issue.\n\nHave you noticed any unusual behavior before this happened?",
    time: "9:45 AM",
    status: "online",
    unread: 2
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    message: "VPN connection keeps dropping...",
    userMessage: "The VPN keeps disconnecting every few minutes. It's making it impossible to work from home.",
    botResponse: "I can help you fix the VPN connectivity issues. This is usually caused by:\n\n1. Network instability\n2. VPN client needs updating\n3. Firewall settings\n\nLet's start by updating your VPN client to the latest version. Can you tell me which VPN software you're using?",
    time: "10:15 AM",
    status: "online",
    unread: 1
  },
  {
    id: 3,
    name: "Marcus Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    message: "Can't access shared drive...",
    userMessage: "",
    botResponse: "",
    time: "11:30 AM",
    status: "offline",
    unread: 0
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    message: "Password reset not working...",
    userMessage: "",
    botResponse: "",
    time: "2:20 PM",
    status: "offline",
    unread: 0
  },
  {
    id: 5,
    name: "David Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    message: "Email sync issues on phone...",
    userMessage: "",
    botResponse: "",
    time: "3:05 PM",
    status: "online",
    unread: 0
  },
];

export const RecentChatPanel = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  
  return (
    <Card 
      className="rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        background: "var(--card-bg)",
        border: "1px solid rgba(163, 123, 255, 0.2)",
        boxShadow: "0 0 16px rgba(163, 123, 255, 0.1)"
      }}
    >
      <CardHeader className="p-6 pb-4 border-b border-border/50">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Chat Activity</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">See your latest IT conversations</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {conversations.slice(0, 5).map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv)}
              className={`w-full p-3 flex items-start gap-3 rounded-xl transition-all ${
                selectedChat.id === conv.id 
                  ? "bg-primary/10" 
                  : "bg-white/5 hover:bg-primary/5"
              }`}
            >
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={conv.avatar} />
                  <AvatarFallback>{conv.name[0]}</AvatarFallback>
                </Avatar>
                {conv.status === "online" && (
                  <div 
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card" 
                    style={{ 
                      background: "#A37BFF",
                      boxShadow: "0 0 6px rgba(163, 123, 255, 0.4)"
                    }}
                  />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium truncate">{conv.name}</p>
                  <span className="text-xs text-primary/80 ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{conv.message}</p>
              </div>
              {conv.unread > 0 && (
                <Badge 
                  className="h-5 min-w-[20px] px-1.5 flex items-center justify-center bg-primary text-white text-[10px] font-semibold"
                  style={{ boxShadow: "0 0 8px rgba(163, 123, 255, 0.4)" }}
                >
                  {conv.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
