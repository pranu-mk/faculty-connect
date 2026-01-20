import { Clock, AlertCircle, CheckCircle, FileText, Bell } from "lucide-react";

interface Activity {
  id: string;
  type: "assigned" | "updated" | "alert" | "resolved";
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  theme?: "dark" | "light" | "fancy";
}

const activities: Activity[] = [
  {
    id: "1",
    type: "assigned",
    title: "New Complaint Assigned",
    description: "Hostel facility issue from John Doe - CSE Dept",
    time: "5 min ago",
  },
  {
    id: "2",
    type: "alert",
    title: "Pending Alert",
    description: "Complaint #1234 pending for 24+ hours",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "resolved",
    title: "Complaint Resolved",
    description: "Library access issue - #1230 marked as resolved",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "updated",
    title: "Status Updated",
    description: "Complaint #1228 moved to In Progress",
    time: "3 hours ago",
  },
  {
    id: "5",
    type: "assigned",
    title: "New Complaint Assigned",
    description: "Lab equipment malfunction from Sarah Smith",
    time: "5 hours ago",
  },
];

const iconMap = {
  assigned: FileText,
  updated: Bell,
  alert: AlertCircle,
  resolved: CheckCircle,
};

const colorMap = {
  assigned: { bg: "#0C4A6E", icon: "#0EA5E9" },
  updated: { bg: "#1E1B4B", icon: "#6366F1" },
  alert: { bg: "#3B2F0B", icon: "#F59E0B" },
  resolved: { bg: "#052E16", icon: "#22C55E" },
};

const RecentActivity = ({ theme = "dark" }: RecentActivityProps) => {
  return (
    <div 
      className="rounded-xl p-6 border"
      style={{ 
        backgroundColor: theme === "light" ? "#F8FAFC" : "#1E1B4B",
        borderColor: theme === "light" ? "#E2E8F0" : "#1F2937"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold" style={{ color: theme === "light" ? "#1F2937" : "#FFFFFF" }}>
          Recent Activity
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          const colors = colorMap[activity.type];
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 p-3 rounded-lg transition-colors animate-fade-in hover:bg-white/5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.bg }}
              >
                <Icon className="w-4 h-4" style={{ color: colors.icon }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: theme === "light" ? "#1F2937" : "#FFFFFF" }}>
                  {activity.title}
                </p>
                <p className="text-sm truncate" style={{ color: theme === "light" ? "#6B7280" : "#9CA3AF" }}>
                  {activity.description}
                </p>
              </div>
              
              <div className="flex items-center gap-1 text-xs whitespace-nowrap" style={{ color: theme === "light" ? "#9CA3AF" : "#6B7280" }}>
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
