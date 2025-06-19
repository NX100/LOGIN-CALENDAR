import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Ticket,
} from "lucide-react";

const CalendarSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Ticket, label: "Invoice", path: "/invoice" },
    { icon: FileText, label: "Schedule", path: "/schedule" },
    { icon: Calendar, label: "Calendar", path: "/calendar", active: true },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/messages",
      badge: "49",
    },
    { icon: Bell, label: "Notification", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-[218px] min-h-screen bg-cal-dark-bg border-r border-black/50 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cal-primary rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded"></div>
          </div>
          <span className="text-2xl font-bold text-white">Base</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = item.active || location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-cal-primary/20 to-transparent text-cal-primary border-r-2 border-cal-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="destructive"
                  className="ml-auto bg-cal-red text-white text-xs px-1.5 py-0.5 h-5"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Section */}
      <div className="p-4">
        <div className="bg-gradient-to-b from-blue-500/20 to-transparent rounded-xl p-4 text-center space-y-3">
          <div className="w-32 h-24 mx-auto bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg relative overflow-hidden">
            <div className="absolute inset-2 bg-white/10 rounded"></div>
            <div className="absolute bottom-2 left-2 right-2 h-2 bg-white/20 rounded"></div>
          </div>
          <Button className="w-full bg-cal-primary hover:bg-cal-primary/90 text-white text-sm font-semibold">
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800/30">
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11">
            <AvatarImage src="" alt="Easin Arafat" />
            <AvatarFallback className="bg-pink-300 text-gray-800">
              EA
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Easin Arafat</p>
            <p className="text-xs text-white/50">Free Account</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/40 hover:text-white/70"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
