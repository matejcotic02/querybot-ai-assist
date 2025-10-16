import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Clock, CheckCircle2, MessageCircle, Facebook, Instagram, Send, Twitter, Linkedin, MessageSquare } from "lucide-react";

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
  const [platformData, setPlatformData] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchPlatformData();
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

  const fetchPlatformData = async () => {
    const { data, error } = await supabase
      .from("platform_analytics" as any)
      .select("*")
      .order("message_count", { ascending: false });

    if (error) {
      console.error("Error fetching platform data:", error);
      return;
    }

    if (data) {
      setPlatformData(data);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      MessageCircle,
      Facebook,
      Instagram,
      Send,
      Twitter,
      Linkedin,
      MessageSquare,
    };
    return icons[iconName] || MessageCircle;
  };

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

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

          {/* Platform Analytics Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Message Sources by Platform</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Distribution Chart */}
              <Card className="glass border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ platform_name, percent }: any) => `${platform_name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="hsl(var(--primary))"
                        dataKey="message_count"
                        nameKey="platform_name"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Platform Statistics */}
              <Card className="glass border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-lg">Platform Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform, index) => {
                      const Icon = getIconComponent(platform.icon_name);
                      return (
                        <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}>
                              <Icon className="h-5 w-5" style={{ color: COLORS[index % COLORS.length] }} />
                            </div>
                            <div>
                              <p className="font-semibold">{platform.platform_name}</p>
                              <p className="text-sm text-muted-foreground">{platform.message_count.toLocaleString()} messages</p>
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${platform.growth_rate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {platform.growth_rate >= 0 ? '+' : ''}{platform.growth_rate}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
