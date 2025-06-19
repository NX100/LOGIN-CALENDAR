import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  color: string;
  date: number;
}

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  viewMode: "day" | "week" | "month" | "year";
}

const CalendarGrid = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  viewMode,
}: CalendarGridProps) => {
  // Sample events data
  const events: CalendarEvent[] = [
    { id: "1", title: "Free day", color: "bg-cal-blue", date: 2 },
    { id: "2", title: "Party Time", color: "bg-cal-badge", date: 2 },
    { id: "3", title: "Victory day", color: "bg-cal-orange", date: 16 },
    { id: "4", title: "Invited by friends", color: "bg-cal-badge", date: 21 },
    { id: "5", title: "Christmas Day", color: "bg-cal-blue", date: 25 },
  ];

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
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        isPrevMonth: true,
      });
    }

    // Add current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        isPrevMonth: false,
      });
    }

    // Add next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        isPrevMonth: false,
      });
    }

    return days;
  };

  const getEventsForDate = (date: number) => {
    return events.filter((event) => event.date === date);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = getDaysInMonth(currentDate);

  if (viewMode !== "month") {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p>
          {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view coming
          soon...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cal-card-bg rounded-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-cal-card-bg px-4 py-3 flex items-center justify-between border-b border-gray-700/50">
        <h2 className="text-white font-semibold">{formatDate(currentDate)}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="text-white/50 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="text-white/50 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 bg-cal-card-bg border-b border-gray-700/30">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center text-white font-semibold text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          const isSelected =
            selectedDate.getDate() === day.date && day.isCurrentMonth;
          const isHighlighted = day.date === 2 && day.isCurrentMonth; // December 2 is highlighted in the design

          return (
            <div
              key={index}
              className={`
                min-h-[127px] p-2 border-r border-b border-gray-700/20 relative
                ${day.isCurrentMonth ? "bg-cal-card-bg" : "bg-cal-card-bg/50"}
                ${isSelected ? "ring-2 ring-cal-primary" : ""}
                hover:bg-cal-card-bg/80 cursor-pointer transition-colors
              `}
              onClick={() => {
                if (day.isCurrentMonth) {
                  const newDate = new Date(currentDate);
                  newDate.setDate(day.date);
                  setSelectedDate(newDate);
                }
              }}
            >
              {/* Date Number */}
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`
                    text-2xl font-semibold
                    ${
                      day.isCurrentMonth
                        ? isHighlighted
                          ? "text-cal-orange"
                          : "text-white"
                        : "text-white/30"
                    }
                    ${day.isToday ? "text-cal-primary" : ""}
                  `}
                >
                  {day.date.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Highlight bar for special dates */}
              {isHighlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-cal-orange"></div>
              )}

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`
                      ${event.color} text-cal-card-bg text-xs font-semibold
                      px-2 py-1 rounded-sm truncate
                    `}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <button className="text-cal-primary text-xs font-semibold hover:text-cal-primary/80">
                    +{dayEvents.length - 2} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
