import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Ticket {
  id: string;
  title: string;
  priority: string;
  status: string;
}

interface TicketStats {
  highPriority: number;
  inProgress: number;
  waitingReply: number;
}

export const PendingTicketsCard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats>({
    highPriority: 0,
    inProgress: 0,
    waitingReply: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTickets = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("id, title, priority, status")
        .neq("status", "closed")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data) {
        setTickets(data);
        
        // Calculate stats
        const highPriority = data.filter(t => t.priority === "high").length;
        const inProgress = data.filter(t => t.status === "open").length;
        const waitingReply = data.filter(t => t.status === "pending").length;
        
        setStats({ highPriority, inProgress, waitingReply });
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Circle className="h-3 w-3 fill-destructive text-destructive" />;
      case "medium":
        return <Circle className="h-3 w-3 fill-warning text-warning" />;
      case "low":
        return <Circle className="h-3 w-3 fill-primary text-primary" />;
      default:
        return <Circle className="h-3 w-3 fill-muted text-muted" />;
    }
  };

  return (
    <Card className="border-border rounded-2xl overflow-hidden shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between border-b p-6">
        <CardTitle className="text-xl font-semibold">Real-Time Support Queue</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchTickets}
          disabled={isRefreshing}
          className="rounded-full hover:bg-accent"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-destructive/10 border border-destructive/20 transition-all hover:bg-destructive/15 hover:shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="h-3 w-3 fill-destructive text-destructive" />
              <span className="text-sm font-semibold text-foreground">High Priority</span>
            </div>
            <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
              {stats.highPriority}
            </Badge>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-warning/10 border border-warning/20 transition-all hover:bg-warning/15 hover:shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="h-3 w-3 fill-warning text-warning" />
              <span className="text-sm font-semibold text-foreground">In Progress</span>
            </div>
            <Badge 
              className="text-lg font-bold px-3 py-1 bg-warning text-warning-foreground hover:bg-warning/80"
            >
              {stats.inProgress}
            </Badge>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/10 border border-primary/20 transition-all hover:bg-primary/15 hover:shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="h-3 w-3 fill-primary text-primary" />
              <span className="text-sm font-semibold text-foreground">Waiting Reply</span>
            </div>
            <Badge variant="default" className="text-lg font-bold px-3 py-1">
              {stats.waitingReply}
            </Badge>
          </div>
        </div>

        {/* Ticket List */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Unresolved Tickets</h3>
          <div className="space-y-2">
            {tickets.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 text-sm">
                No pending tickets
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent/50 hover:shadow-soft transition-all cursor-pointer group"
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(ticket.priority)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {ticket.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      ID: {ticket.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {ticket.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
