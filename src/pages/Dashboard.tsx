import { FileText, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ComplaintsChart from "@/components/dashboard/ComplaintsChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import type { Theme } from "@/pages/Index";

interface DashboardProps {
  theme?: Theme;
}

const Dashboard = ({ theme = "dark" }: DashboardProps) => {
  const isLight = theme === "light";

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
          <ComplaintsChart theme={theme} />
        </div>
        <div>
          <StatusPieChart theme={theme} />
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity theme={theme} />
        
        {/* Quick Actions - Now with white background and faint colors */}
        <div 
          className="rounded-xl p-6 border bg-white"
          style={{ borderColor: "#E5E7EB" }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "View Pending", count: 28, bg: isLight ? "#FEF3C7" : "#FEF3C7", iconColor: "#D97706", textColor: "#92400E" },
              { label: "High Priority", count: 5, bg: isLight ? "#FEE2E2" : "#FEE2E2", iconColor: "#EF4444", textColor: "#991B1B" },
              { label: "Unread Messages", count: 12, bg: isLight ? "#DBEAFE" : "#DBEAFE", iconColor: "#3B82F6", textColor: "#1E40AF" },
              { label: "Due Today", count: 3, bg: isLight ? "#EDE9FE" : "#EDE9FE", iconColor: "#6366F1", textColor: "#4338CA" },
            ].map((action, index) => (
              <button 
                key={index}
                className="p-4 rounded-xl transition-all duration-200 text-left group hover:brightness-95 border border-gray-200"
                style={{ backgroundColor: action.bg }}
              >
                <p className="text-2xl font-bold" style={{ color: action.textColor }}>{action.count}</p>
                <p className="text-sm" style={{ color: action.textColor, opacity: 0.8 }}>{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;