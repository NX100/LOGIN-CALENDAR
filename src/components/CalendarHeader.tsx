import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: "day" | "week" | "month" | "year";
  setViewMode: (mode: "day" | "week" | "month" | "year") => void;
}

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  viewMode,
  setViewMode,
}: CalendarHeaderProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const viewModes = [
    { key: "day" as const, label: "Day" },
    { key: "week" as const, label: "Week" },
    { key: "month" as const, label: "Month" },
    { key: "year" as const, label: "Year" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-cal-dark-bg border-b border-gray-800/30">
      {/* Page Title */}
      <div className="mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold text-cal-text">Calendar</h1>
      </div>

      {/* View Mode Buttons */}
      <div className="flex items-center gap-2 bg-cal-card-bg rounded-lg p-1">
        {viewModes.map((mode) => (
          <Button
            key={mode.key}
            variant={viewMode === mode.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode(mode.key)}
            className={
              viewMode === mode.key
                ? "bg-cal-primary text-white font-semibold"
                : "text-cal-text/70 hover:text-cal-text hover:bg-cal-primary/10"
            }
          >
            {mode.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
