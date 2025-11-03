import { AIAnalyticsHeaderCard } from "./AIAnalyticsHeaderCard";
import { AIPerformanceTrendCard } from "./AIPerformanceTrendCard";
import { AIAnalyticsSideCard } from "./AIAnalyticsSideCard";
import { AIEventsTimelineCard } from "./AIEventsTimelineCard";

export const AIReports = () => {
  return (
    <div 
      className="p-6 rounded-[20px]"
      style={{ background: 'var(--background)' }}>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Header Banner */}
        <AIAnalyticsHeaderCard />

        {/* Section 2: Main Chart Row */}
        <AIPerformanceTrendCard />
        <AIAnalyticsSideCard />

        {/* Section 3: Bottom Chart */}
        <AIEventsTimelineCard />
      </div>
    </div>
  );
};
