import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle2, AlertTriangle, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "ticket_created" | "ticket_assigned" | "ticket_resolved" | "alert";
  message: string;
  status: string;
  timestamp: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "N-001",
    type: "ticket_created",
    message: "New ticket created: 'VPN not connecting'",
    status: "New",
    timestamp: "2m ago"
  },
  {
    id: "N-002",
    type: "ticket_assigned",
    message: "Ticket INC-198 assigned to Sarah Lopez",
    status: "Open",
    timestamp: "8m ago"
  },
  {
    id: "N-003",
    type: "ticket_resolved",
    message: "Ticket INC-174 resolved by QueryBot AI",
    status: "Resolved",
    timestamp: "15m ago"
  },
  {
    id: "N-004",
    type: "alert",
    message: "Network latency spike detected",
    status: "Critical",
    timestamp: "30m ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-primary text-primary-foreground";
    case "Open":
      return "bg-green-500 text-white";
    case "Resolved":
      return "bg-blue-500 text-white";
    case "Critical":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "ticket_created":
      return <FileText className="h-4 w-4" />;
    case "ticket_assigned":
      return <User className="h-4 w-4" />;
    case "ticket_resolved":
      return <CheckCircle2 className="h-4 w-4" />;
    case "alert":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="absolute top-16 right-6 w-[360px] max-h-[480px] z-50 bg-card border border-border rounded-2xl shadow-[0_0_20px_rgba(163,123,255,0.15),inset_0_0_8px_rgba(125,92,255,0.08)] backdrop-blur-[14px] animate-fade-in"
        style={{
          animation: "fade-in 0.2s ease-in-out"
        }}
      >
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        </div>
        
        <ScrollArea className="h-[380px]">
          <div className="p-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col gap-1 p-3 rounded-xl hover:bg-primary/8 transition-all duration-200 cursor-pointer mb-2"
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        className={`text-xs px-2 py-0.5 ${getStatusColor(notification.status)}`}
                      >
                        {notification.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full text-sm text-accent hover:text-accent/90 hover:bg-accent/10"
            onClick={() => {
              navigate("/tickets");
              onClose();
            }}
          >
            View All Tickets
          </Button>
        </div>
      </div>
    </>
  );
};
