import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", complaints: 45 },
  { month: "Feb", complaints: 52 },
  { month: "Mar", complaints: 38 },
  { month: "Apr", complaints: 65 },
  { month: "May", complaints: 48 },
  { month: "Jun", complaints: 55 },
  { month: "Jul", complaints: 42 },
  { month: "Aug", complaints: 58 },
  { month: "Sep", complaints: 63 },
  { month: "Oct", complaints: 51 },
  { month: "Nov", complaints: 47 },
  { month: "Dec", complaints: 39 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border/50">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-primary">
          {payload[0].value} complaints
        </p>
      </div>
    );
  }
  return null;
};

const ComplaintsChart = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Monthly Complaints Report</h3>
        <select className="bg-secondary/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} />
            <Bar 
              dataKey="complaints" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplaintsChart;
