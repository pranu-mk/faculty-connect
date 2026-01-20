import { FileText, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ComplaintsChart from "@/components/dashboard/ComplaintsChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";

interface DashboardProps {
  theme?: "dark" | "light" | "fancy";
}

const Dashboard = ({ theme = "dark" }: DashboardProps) => {
  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Dr. Rajesh Kumar</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Assigned"
          value={124}
          icon={FileText}
          variant="primary"
          theme={theme}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending"
          value={28}
          icon={Clock}
          variant="warning"
          theme={theme}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Resolved"
          value={82}
          icon={CheckCircle}
          variant="success"
          theme={theme}
          trend={{ value: 18, isPositive: true }}
        />
        <StatCard
          title="Rejected"
          value={14}
          icon={XCircle}
          variant="destructive"
          theme={theme}
        />
        <StatCard
          title="Today's Complaints"
          value={7}
          icon={Calendar}
          variant="default"
          theme={theme}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ComplaintsChart />
        </div>
        <div>
          <StatusPieChart />
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity theme={theme} />
        
        {/* Quick Actions */}
        <div 
          className="rounded-xl p-6 border"
          style={{ 
            backgroundColor: theme === "fancy" ? "#1E1B4B" : theme === "light" ? "#F8FAFC" : "#1E1B4B",
            borderColor: theme === "light" ? "#E2E8F0" : "#1F2937"
          }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme === "light" ? "#1F2937" : "#FFFFFF" }}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "View Pending", count: 28, bg: "#3B2F0B", iconBg: "#F59E0B" },
              { label: "High Priority", count: 5, bg: "#3F0D0D", iconBg: "#EF4444" },
              { label: "Unread Messages", count: 12, bg: "#0C4A6E", iconBg: "#0EA5E9" },
              { label: "Due Today", count: 3, bg: "#1E1B4B", iconBg: "#6366F1" },
            ].map((action, index) => (
              <button 
                key={index}
                className="p-4 rounded-xl transition-all duration-200 text-left group hover:brightness-110"
                style={{ backgroundColor: action.bg }}
              >
                <p className="text-2xl font-bold text-white">{action.count}</p>
                <p className="text-sm text-white/80">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
