"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface OrderStatusChartProps {
  completed: number;
  cancelled: number;
  pending: number;
}

const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

export default function OrderStatusChart({
  completed,
  cancelled,
  pending,
}: OrderStatusChartProps) {
  const data = [
    { name: "Tamamlanan", value: completed },
    { name: "İptal Edilen", value: cancelled },
    { name: "Bekleyen", value: pending },
  ].filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            // TS18048 fix: percent may be undefined, using optional chaining
            `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
