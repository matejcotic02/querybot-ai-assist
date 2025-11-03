import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const activities = [
  { id: "TK-1847", type: "Network", status: "Resolved", technician: "Sarah Chen", updated: "2 min ago" },
  { id: "TK-1846", type: "Hardware", status: "In Progress", technician: "Marcus Rodriguez", updated: "15 min ago" },
  { id: "TK-1845", type: "Software", status: "Resolved", technician: "Emily Watson", updated: "1 hour ago" },
  { id: "TK-1844", type: "Security", status: "Pending", technician: "David Kim", updated: "2 hours ago" },
  { id: "TK-1843", type: "Network", status: "Resolved", technician: "Lisa Thompson", updated: "3 hours ago" },
  { id: "TK-1842", type: "Database", status: "In Progress", technician: "Sarah Chen", updated: "4 hours ago" },
  { id: "TK-1841", type: "Hardware", status: "Resolved", technician: "Marcus Rodriguez", updated: "5 hours ago" },
  { id: "TK-1840", type: "Software", status: "Pending", technician: "Emily Watson", updated: "6 hours ago" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "bg-green-500/20 text-green-500 border-green-500/30";
    case "In Progress":
      return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const ActivityTable = () => {
  return (
    <Card className="rounded-[20px] border border-[rgba(163,123,255,0.25)]"
          style={{
            background: 'var(--card)',
            boxShadow: '0 0 20px rgba(163,123,255,0.15)'
          }}>
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/50"
                style={{ background: 'rgba(163,123,255,0.05)' }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-mono text-sm text-primary font-medium min-w-[80px]">
                    {activity.id}
                  </span>
                  <span className="text-sm text-muted-foreground min-w-[80px]">
                    {activity.type}
                  </span>
                  <Badge variant="outline" className={`${getStatusColor(activity.status)} min-w-[100px] justify-center`}>
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-foreground hidden md:block flex-1">
                    {activity.technician}
                  </span>
                  <span className="text-xs text-muted-foreground min-w-[90px] text-right">
                    {activity.updated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
