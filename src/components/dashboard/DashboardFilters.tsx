import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardFiltersProps {
  dateRange: string;
  setDateRange: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
}

export const DashboardFilters = ({ dateRange, setDateRange, department, setDepartment }: DashboardFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px] rounded-2xl">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-[180px] rounded-2xl">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="it">IT</SelectItem>
          <SelectItem value="network">Network</SelectItem>
          <SelectItem value="security">Security</SelectItem>
          <SelectItem value="hr">HR</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" className="rounded-2xl">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};
