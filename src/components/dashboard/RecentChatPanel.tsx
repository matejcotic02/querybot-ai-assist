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
      className="border overflow-hidden h-[500px] transition-all duration-[400ms] ease-in-out hover:-translate-y-1"
      style={{
        backgroundColor: 'hsl(var(--section-card-bg))',
        border: '2px solid hsl(var(--section-card-border))',
        boxShadow: 'var(--section-card-border-glow), var(--section-card-shadow)',
        borderRadius: '20px',
        padding: '24px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--section-card-border-glow), var(--section-card-hover-shadow)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--section-card-border-glow), var(--section-card-shadow)'}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4 px-0"
        style={{ color: 'hsl(var(--dashboard-card-text))' }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">Recent Chat AI Assistant</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 rounded-xl h-9">
            See all
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-5 h-[400px]">
          {/* Chat List */}
          <div className="col-span-2 border-r border-border overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border ${
                  selectedChat.id === conv.id ? "bg-muted/50" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  {conv.status === "online" && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{conv.message}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                    {conv.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
          
          {/* Chat Window */}
          <div className="col-span-3 flex flex-col bg-muted/20">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedChat.userMessage && (
                <>
                  {/* User Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="max-w-[70%] bg-card border border-border rounded-2xl rounded-tr-sm p-4">
                      <p className="text-sm">{selectedChat.userMessage}</p>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-muted-foreground">07:00 AM</span>
                        <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedChat.avatar} />
                      <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Bot Response */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-tl-sm p-4">
                      <p className="text-sm whitespace-pre-line">{selectedChat.botResponse}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="secondary" className="h-7 rounded-lg text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Option 1
                        </Button>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-xs text-primary-foreground/80">07:10 AM</span>
                        <CheckCheck className="h-3.5 w-3.5 text-primary-foreground/80" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
