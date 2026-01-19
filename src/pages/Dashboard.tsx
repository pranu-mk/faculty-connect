import { FileText, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ComplaintsChart from "@/components/dashboard/ComplaintsChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";

const Dashboard = () => {
  return (
    <div className="page-enter space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Dr. Rajesh Kumar</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending"
          value={28}
          icon={Clock}
          variant="warning"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Resolved"
          value={82}
          icon={CheckCircle}
          variant="success"
          trend={{ value: 18, isPositive: true }}
        />
        <StatCard
          title="Rejected"
          value={14}
          icon={XCircle}
          variant="destructive"
        />
        <StatCard
          title="Today's Complaints"
          value={7}
          icon={Calendar}
          variant="default"
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
        <RecentActivity />
        
        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "View Pending", count: 28, color: "bg-warning/20 text-warning hover:bg-warning/30" },
              { label: "High Priority", count: 5, color: "bg-destructive/20 text-destructive hover:bg-destructive/30" },
              { label: "Unread Messages", count: 12, color: "bg-info/20 text-info hover:bg-info/30" },
              { label: "Due Today", count: 3, color: "bg-primary/20 text-primary hover:bg-primary/30" },
            ].map((action, index) => (
              <button 
                key={index}
                className={`p-4 rounded-xl ${action.color} transition-all duration-200 text-left group`}
              >
                <p className="text-2xl font-bold">{action.count}</p>
                <p className="text-sm opacity-80">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
