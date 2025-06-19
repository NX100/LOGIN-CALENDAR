import { useState } from "react";
import CalendarSidebar from "@/components/CalendarSidebar";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import SchedulePanel from "@/components/SchedulePanel";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2021, 11, 2)); // December 2, 2021
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 11, 2));
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">(
    "month",
  );

  return (
    <div className="min-h-screen bg-cal-dark-bg text-white flex">
      {/* Sidebar Navigation */}
      <CalendarSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Schedule Creation */}
        <div className="w-full lg:w-[266px] bg-cal-card-bg border-r border-gray-800/50">
          <SchedulePanel currentDate={currentDate} />
        </div>

        {/* Center Panel - Calendar */}
        <div className="flex-1 flex flex-col">
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <div className="flex-1 p-6">
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
