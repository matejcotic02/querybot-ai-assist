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
    message: "Can you help me?",
    userMessage: "Hi, I'm looking for a summer dress. Do you have anything available in size M?",
    botResponse: "Got it! Here are some options that match your preference:\n1. Floral Breeze Dress - A light cotton dress with pastel floral prints.\n2. Sunny Day Midi Dress - A comfortable midi dress in soft yellow.\n\nWould you like me to share more details or photos of any of these?",
    time: "10:00 AM",
    status: "online",
    unread: 2
  },
  {
    id: 2,
    name: "Fajar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar",
    message: "Hi, I'm looking f...",
    userMessage: "",
    botResponse: "",
    time: "10:00 AM",
    status: "online",
    unread: 0
  },
  {
    id: 3,
    name: "Triana",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Triana",
    message: "Yes, can you sh...",
    userMessage: "",
    botResponse: "",
    time: "10:00 AM",
    status: "offline",
    unread: 0
  },
  {
    id: 4,
    name: "Audrey",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Audrey",
    message: "Can you tell me...",
    userMessage: "",
    botResponse: "",
    time: "10:00 AM",
    status: "offline",
    unread: 0
  },
];

export const RecentChatPanel = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  
  return (
    <Card className="shadow-elegant border-border rounded-3xl overflow-hidden h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
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
