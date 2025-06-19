import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

interface SchedulePanelProps {
  currentDate: Date;
}

const SchedulePanel = ({ currentDate }: SchedulePanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const people = [
    {
      id: "1",
      name: "Eddie Lobanovskiy",
      email: "laboanovskiy@gmail.com",
      avatar: "EL",
      color: "bg-purple-200",
    },
    {
      id: "2",
      name: "Alexey Stave",
      email: "alexeyst@gmail.com",
      avatar: "AS",
      color: "bg-pink-300",
    },
    {
      id: "3",
      name: "Anton Tkacheve",
      email: "tkacheveanton@gmail.com",
      avatar: "AT",
      color: "bg-blue-300",
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
      });
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
      });
    }

    // Add next month days to complete the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remainingDays = totalCells - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = getDaysInMonth(currentDate);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Create Schedule Button */}
      <Button className="w-full bg-cal-primary hover:bg-cal-primary/90 text-white font-semibold h-11 gap-2">
        <Plus className="w-4 h-4" />
        Create Schedule
      </Button>

      {/* Mini Calendar */}
      <Card className="bg-transparent border-white border-opacity-20">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs text-white/80 font-semibold">
            {formatDate(currentDate)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-white/70 font-semibold p-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="space-y-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => {
                  const isSelected = day.date === 3 && day.isCurrentMonth; // Highlight December 3
                  return (
                    <button
                      key={dayIndex}
                      className={`
                        text-xs p-1 h-6 w-6 rounded text-center transition-colors
                        ${
                          day.isCurrentMonth
                            ? isSelected
                              ? "bg-cal-primary text-white"
                              : "text-white/80 hover:bg-white/10"
                            : "text-white/30"
                        }
                      `}
                    >
                      {day.date}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* People Section */}
      <div className="flex-1 space-y-4">
        <h3 className="text-white font-semibold">People</h3>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search for People"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-cal-secondary-bg border-cal-secondary-bg text-white placeholder:text-white/70 pl-10 h-11"
          />
        </div>

        {/* People List */}
        <div className="space-y-3">
          {people
            .filter(
              (person) =>
                person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.email.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((person, index) => (
              <div key={person.id} className="flex items-center gap-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" alt={person.name} />
                  <AvatarFallback
                    className={`${person.color} text-gray-800 text-xs font-semibold`}
                  >
                    {person.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {person.name}
                  </p>
                  <p className="text-xs text-white/50 truncate">
                    {person.email}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* My Schedule Button */}
      <Button
        variant="outline"
        className="w-full border-cal-primary/20 text-cal-primary hover:bg-cal-primary/10 font-semibold h-11"
      >
        My Schedule
      </Button>
    </div>
  );
};

export default SchedulePanel;
