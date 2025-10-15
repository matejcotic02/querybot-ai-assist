import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign, Brain, Smile } from "lucide-react";

const kpis = [
  { 
    label: "Revenue This Week", 
    value: 24750, 
    prefix: "$", 
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-500"
  },
  { 
    label: "AI Accuracy", 
    value: 94.5, 
    suffix: "%", 
    icon: Brain,
    gradient: "from-blue-500 to-purple-500"
  },
  { 
    label: "Customer Satisfaction", 
    value: 9.2, 
    suffix: " / 10", 
    icon: Smile,
    gradient: "from-pink-500 to-rose-500"
  },
];

export const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} delay={index * 100} />
      ))}
    </div>
  );
};

const KPICard = ({ label, value, prefix = "", suffix = "", icon: Icon, gradient, delay }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card 
      className="glass overflow-hidden hover-lift border-0 shadow-elegant"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className={`h-2 p-0 bg-gradient-to-r ${gradient}`} />
      <CardContent className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <Icon className={`h-5 w-5 text-gradient bg-gradient-to-r ${gradient} bg-clip-text`} />
        </div>
        <p className="text-3xl font-bold">
          {prefix}{typeof count === 'number' ? count.toFixed(prefix === "$" ? 0 : 1) : count}{suffix}
        </p>
      </CardContent>
    </Card>
  );
};
