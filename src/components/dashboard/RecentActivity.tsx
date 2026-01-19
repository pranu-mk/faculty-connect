import { Clock, AlertCircle, CheckCircle, FileText, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: "assigned" | "updated" | "alert" | "resolved";
  title: string;
  description: string;
  time: string;
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

const badgeMap = {
  assigned: "bg-info/20 text-info border-info/30",
  updated: "bg-primary/20 text-primary border-primary/30",
  alert: "bg-warning/20 text-warning border-warning/30",
  resolved: "bg-success/20 text-success border-success/30",
};

const RecentActivity = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-2 rounded-lg ${badgeMap[activity.type].replace('text-', 'bg-').split(' ')[0]}`}>
                <Icon className={`w-4 h-4 ${badgeMap[activity.type].split(' ')[1]}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
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
