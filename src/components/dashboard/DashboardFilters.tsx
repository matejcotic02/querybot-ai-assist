import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
interface DashboardFiltersProps {
  filterPeriod: "today" | "week" | "month";
  onFilterChange: (period: "today" | "week" | "month") => void;
}
export const DashboardFilters = ({
  filterPeriod,
  onFilterChange
}: DashboardFiltersProps) => {
  return <div className="flex items-center gap-2 bg-[#0C0C1A]/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
      <Calendar className="w-4 h-4 text-white/50" />
      
      <div className="flex gap-2">
        <Button size="sm" variant={filterPeriod === "today" ? "default" : "outline"} onClick={() => onFilterChange("today")} className={filterPeriod === "today" ? "bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white border-0" : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"}>
          Today
        </Button>
        
        <Button size="sm" variant={filterPeriod === "month" ? "default" : "outline"} onClick={() => onFilterChange("month")} className={filterPeriod === "month" ? "bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white border-0" : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"}>
          This Month
        </Button>
      </div>
    </div>;
};