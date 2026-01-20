import { useState } from "react";
import { Bell, Sun, Moon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface TopHeaderProps {
  theme: "dark" | "light" | "fancy";
  onThemeChange: (theme: "dark" | "light" | "fancy") => void;
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New Complaint Assigned", description: "Hostel facility issue from CSE Dept", time: "5 min ago", isRead: false },
  { id: "2", title: "Pending Alert", description: "Complaint #1234 pending for 24+ hours", time: "1 hour ago", isRead: false },
  { id: "3", title: "Event Approved", description: "Technical Symposium has been approved", time: "2 hours ago", isRead: false },
  { id: "4", title: "New Notice Published", description: "Annual exam schedule released", time: "3 hours ago", isRead: true },
  { id: "5", title: "Ticket Resolved", description: "Your helpdesk ticket #TKT-003 resolved", time: "5 hours ago", isRead: true },
];

const TopHeader = ({ theme, onThemeChange }: TopHeaderProps) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getThemeButtonClass = (t: "dark" | "light" | "fancy") => {
    if (theme === t) {
      if (t === "fancy") {
        return "bg-gradient-to-r from-purple-600 to-blue-600 text-white";
      }
      return "bg-[#7C3AED] text-white";
    }
    return "bg-gray-200 text-gray-700 hover:bg-gray-300";
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Welcome,</span>
        <span className="font-semibold text-gray-800">Dr. Rajesh Kumar</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onThemeChange("dark")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${getThemeButtonClass("dark")}`}
          >
            <Moon className="w-4 h-4" />
            Dark
          </button>
          <button
            onClick={() => onThemeChange("light")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${getThemeButtonClass("light")}`}
          >
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button
            onClick={() => onThemeChange("fancy")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${getThemeButtonClass("fancy")}`}
          >
            <Sparkles className="w-4 h-4" />
            Fancy
          </button>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 border-none text-white">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-800">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-0 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
