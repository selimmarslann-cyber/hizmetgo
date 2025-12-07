"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
    orders: number;
    customers: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("tr-TR", {
      month: "short",
      day: "numeric",
    }),
    revenue: Math.round(item.revenue),
    orders: item.orders,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" style={{ fontSize: "12px" }} />
        <YAxis
          yAxisId="left"
          stroke="#FF6000"
          style={{ fontSize: "12px" }}
          tickFormatter={(value) => `${value}₺`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#3B82F6"
          style={{ fontSize: "12px" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
          formatter={(value: number, name: string) => {
            if (name === "revenue") {
              return [`${value.toFixed(2)} ₺`, "Gelir"];
            }
            return [value, name === "orders" ? "Sipariş" : name];
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#FF6000"
          strokeWidth={2}
          dot={{ fill: "#FF6000", r: 4 }}
          activeDot={{ r: 6 }}
          name="Gelir"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6", r: 4 }}
          activeDot={{ r: 6 }}
          name="Sipariş"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
