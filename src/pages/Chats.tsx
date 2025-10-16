import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChatWithCustomer {
  ticket_id: string;
  customer_id: string;
  customer_name: string;
  customer_avatar: string | null;
  last_message: string;
  last_message_time: string;
  status: string;
  unread_count: number;
}

const Chats = () => {
  const [chats, setChats] = useState<ChatWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      // Get all tickets with their latest messages and customer profiles
      const { data: tickets, error: ticketsError } = await supabase
        .from("tickets")
        .select(`
          id,
          customer_id,
          status,
          updated_at,
          profiles!tickets_customer_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .order("updated_at", { ascending: false });

      if (ticketsError) throw ticketsError;

      // For each ticket, get the last message
      const chatsData = await Promise.all(
        (tickets || []).map(async (ticket) => {
          const { data: lastMessage } = await supabase
            .from("chat_messages")
            .select("message_text, created_at")
            .eq("ticket_id", ticket.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          const profile = Array.isArray(ticket.profiles) 
            ? ticket.profiles[0] 
            : ticket.profiles;

          return {
            ticket_id: ticket.id,
            customer_id: ticket.customer_id,
            customer_name: profile?.full_name || "Unknown Customer",
            customer_avatar: profile?.avatar_url || null,
            last_message: lastMessage?.message_text || "No messages yet",
            last_message_time: lastMessage?.created_at || ticket.updated_at,
            status: ticket.status,
            unread_count: 0, // You can add logic to count unread messages
          };
        })
      );

      setChats(chatsData);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "resolved":
        return "bg-gray-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-h-screen ml-16">
        <DashboardHeader />

        <main className="flex-1 p-8 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer Chats
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading chats...
                </div>
              ) : chats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No chats found
                </div>
              ) : (
                <div className="space-y-4">
                  {chats.map((chat) => (
                    <div
                      key={chat.ticket_id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => navigate(`/app/chat/${chat.ticket_id}`)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.customer_avatar || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(chat.customer_name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">
                            {chat.customer_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {formatDistanceToNow(new Date(chat.last_message_time), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {chat.last_message}
                        </p>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(chat.status)} text-white`}
                        >
                          {chat.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Chats;
