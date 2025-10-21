import { Button } from "@/components/ui/button";
import { Calendar, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface DashboardFiltersProps {
  filterPeriod: "today" | "week" | "month";
  onFilterChange: (period: "today" | "week" | "month") => void;
}

export const DashboardFilters = ({ filterPeriod, onFilterChange }: DashboardFiltersProps) => {
  const [dimMode, setDimMode] = useState(false);

  const toggleDimMode = () => {
    setDimMode(!dimMode);
    if (!dimMode) {
      document.documentElement.style.setProperty("--background", "210 100% 5%");
    } else {
      document.documentElement.style.setProperty("--background", "210 100% 10%");
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#0C0C1A]/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-white/50" />
        <span className="text-sm text-white/70 mr-2">Quick Filters:</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filterPeriod === "today" ? "default" : "outline"}
            onClick={() => onFilterChange("today")}
            className={
              filterPeriod === "today"
                ? "bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white border-0"
                : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            }
          >
            Today
          </Button>
          <Button
            size="sm"
            variant={filterPeriod === "week" ? "default" : "outline"}
            onClick={() => onFilterChange("week")}
            className={
              filterPeriod === "week"
                ? "bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white border-0"
                : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            }
          >
            This Week
          </Button>
          <Button
            size="sm"
            variant={filterPeriod === "month" ? "default" : "outline"}
            onClick={() => onFilterChange("month")}
            className={
              filterPeriod === "month"
                ? "bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white border-0"
                : "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            }
          >
            This Month
          </Button>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={toggleDimMode}
        className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
      >
        {dimMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
        {dimMode ? "Light Mode" : "Dim Mode"}
      </Button>
    </div>
  );
};
