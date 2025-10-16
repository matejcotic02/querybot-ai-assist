import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Facebook, Instagram, Twitter, Linkedin, Music, Youtube, MessageCircle, Send, TrendingUp, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const iconMap: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  music: Music,
  youtube: Youtube,
  "message-circle": MessageCircle,
  send: Send,
};

export default function Platforms() {
  const { data: platforms, isLoading } = useQuery({
    queryKey: ["platform-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_analytics")
        .select("*")
        .order("customer_count", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const totalCustomers = platforms?.reduce((sum, p) => sum + p.customer_count, 0) || 0;
  const avgGrowthRate = platforms?.reduce((sum, p) => sum + (p.growth_rate || 0), 0) / (platforms?.length || 1) || 0;

  return (
    <div className="min-h-screen bg-background pl-16">
      <DashboardHeader />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all platforms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgGrowthRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Average across platforms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platforms?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Social media channels</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))
          ) : (
            platforms?.map((platform) => {
              const Icon = iconMap[platform.icon_name] || MessageCircle;
              const growthColor = (platform.growth_rate || 0) > 15 ? "text-green-500" : (platform.growth_rate || 0) > 8 ? "text-yellow-500" : "text-muted-foreground";

              return (
                <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{platform.platform_name}</CardTitle>
                    <Icon className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platform.customer_count.toLocaleString()}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className={`h-3 w-3 ${growthColor}`} />
                      <p className={`text-xs ${growthColor}`}>
                        {platform.growth_rate}% growth
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {((platform.customer_count / totalCustomers) * 100).toFixed(1)}% of total
                    </p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Platforms</CardTitle>
            <CardDescription>Platforms with the highest customer acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platforms?.slice(0, 5).map((platform, index) => {
                const Icon = iconMap[platform.icon_name] || MessageCircle;
                const percentage = (platform.customer_count / totalCustomers) * 100;

                return (
                  <div key={platform.id} className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{platform.platform_name}</span>
                          <span className="text-sm text-muted-foreground">
                            {platform.customer_count.toLocaleString()} customers
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
