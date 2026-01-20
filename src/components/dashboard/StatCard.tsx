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
  theme?: "dark" | "light" | "fancy";
}

const variantColors = {
  default: { bg: "#1E1B4B", iconBg: "#6366F1" },
  primary: { bg: "#1E1B4B", iconBg: "#7C3AED" },
  warning: { bg: "#3B2F0B", iconBg: "#F59E0B" },
  success: { bg: "#052E16", iconBg: "#22C55E" },
  destructive: { bg: "#3F0D0D", iconBg: "#EF4444" },
};

const StatCard = ({ title, value, icon: Icon, trend, variant = "default", theme = "dark" }: StatCardProps) => {
  const colors = variantColors[variant];

  return (
    <div 
      className="rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:brightness-110 cursor-pointer"
      style={{ 
        backgroundColor: colors.bg,
        border: "1px solid #1F2937"
      }}
    >
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-white/60">vs last week</span>
            </div>
          )}
        </div>
        
        <div 
          className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: colors.iconBg }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
