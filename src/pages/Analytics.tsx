import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";

interface AnalyticsData {
  metric_name: string;
  metric_value: number;
  period_start: string;
}

export default function Analytics() {
  const [responseTimeData, setResponseTimeData] = useState<any[]>([]);
  const [ticketVolumeData, setTicketVolumeData] = useState<any[]>([]);
  const [aiResolutionData, setAiResolutionData] = useState<any[]>([]);
  const [satisfactionData, setSatisfactionData] = useState<any[]>([]);
  const [activeUsersData, setActiveUsersData] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .order("period_start", { ascending: true });

    if (error) {
      console.error("Error fetching analytics:", error);
      return;
    }

    if (data) {
      // Group data by metric type
      const formatData = (metricName: string) => {
        return data
          .filter((item) => item.metric_name === metricName)
          .map((item) => ({
            date: new Date(item.period_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: Number(item.metric_value),
          }));
      };

      setResponseTimeData(formatData("avg_response_time"));
      setTicketVolumeData(formatData("ticket_volume"));
      setAiResolutionData(formatData("ai_resolution_rate"));
      setSatisfactionData(formatData("customer_satisfaction"));
      setActiveUsersData(formatData("active_users"));
    }
  };

  const StatCard = ({ title, value, icon: Icon, subtitle }: any) => (
    <Card className="glass border-0 shadow-elegant">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 ml-16">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor your support performance and AI metrics</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Avg Response Time"
              value={responseTimeData[responseTimeData.length - 1]?.value ? `${responseTimeData[responseTimeData.length - 1].value}s` : "0s"}
              icon={Clock}
              subtitle="Last 24 hours"
            />
            <StatCard
              title="Active Users"
              value={activeUsersData[activeUsersData.length - 1]?.value || 0}
              icon={Users}
              subtitle="Currently online"
            />
            <StatCard
              title="AI Resolution Rate"
              value={aiResolutionData[aiResolutionData.length - 1]?.value ? `${aiResolutionData[aiResolutionData.length - 1].value}%` : "0%"}
              icon={CheckCircle2}
              subtitle="Auto-resolved tickets"
            />
            <StatCard
              title="Satisfaction Score"
              value={satisfactionData[satisfactionData.length - 1]?.value || 0}
              icon={TrendingUp}
              subtitle="Out of 10"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Chart */}
            <Card className="glass border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Ticket Volume Chart */}
            <Card className="glass border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Ticket Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ticketVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Resolution Rate Chart */}
            <Card className="glass border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">AI Resolution Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={aiResolutionData}>
                    <defs>
                      <linearGradient id="colorResolution" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorResolution)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Satisfaction Chart */}
            <Card className="glass border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Active Users Chart - Full Width */}
            <Card className="glass border-0 shadow-elegant lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Active Users Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activeUsersData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
