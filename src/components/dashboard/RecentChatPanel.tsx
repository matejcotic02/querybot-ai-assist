import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const conversations = [
  {
    user: "Can't access my email account",
    bot: "I'll help you reset your password. First, verify your identity by clicking the link I sent to your recovery email.",
    time: "2 min ago"
  },
  {
    user: "Printer not working on 3rd floor",
    bot: "I've restarted the print server. Please try printing a test page now. Issue should be resolved.",
    time: "8 min ago"
  },
  {
    user: "VPN connection keeps dropping",
    bot: "This is a known issue with the latest Windows update. I'm applying the patch now. You'll need to restart your computer.",
    time: "15 min ago"
  }
];

export const RecentChatPanel = () => {
  const navigate = useNavigate();

  return (
    <Card className="glass border-0 shadow-elegant h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent AI Assistant Chats</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-2xl"
          onClick={() => navigate('/app/chat')}
        >
          Open Full Chat
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {conversations.map((conv, index) => (
          <div key={index} className="space-y-3 pb-4 border-b last:border-b-0">
            <div className="flex gap-3 items-start">
              <Avatar className="h-8 w-8 bg-accent">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-accent/30 rounded-2xl rounded-tl-sm p-3">
                <p className="text-sm">{conv.user}</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <Avatar className="h-8 w-8 bg-primary/10">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-primary/5 rounded-2xl rounded-tl-sm p-3">
                <p className="text-sm">{conv.bot}</p>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-right">{conv.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
