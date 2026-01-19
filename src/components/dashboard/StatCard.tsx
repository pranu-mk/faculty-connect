import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "warning" | "success" | "destructive";
}

const variantStyles = {
  default: "from-muted/50 to-transparent",
  primary: "from-primary/10 to-transparent",
  warning: "from-warning/10 to-transparent",
  success: "from-success/10 to-transparent",
  destructive: "from-destructive/10 to-transparent",
};

const iconStyles = {
  default: "bg-muted/50 text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  warning: "bg-warning/20 text-warning",
  success: "bg-success/20 text-success",
  destructive: "bg-destructive/20 text-destructive",
};

const StatCard = ({ title, value, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  return (
    <div className="stat-card glass-card-hover group">
      <div className={`absolute inset-0 bg-gradient-to-br ${variantStyles[variant]} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${trend.isPositive ? "text-success" : "text-destructive"}`}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${iconStyles[variant]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
