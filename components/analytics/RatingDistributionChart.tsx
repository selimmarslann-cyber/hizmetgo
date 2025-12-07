"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RatingDistributionChartProps {
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function RatingDistributionChart({
  distribution,
}: RatingDistributionChartProps) {
  const data = [
    { rating: "5 ⭐", count: distribution[5] },
    { rating: "4 ⭐", count: distribution[4] },
    { rating: "3 ⭐", count: distribution[3] },
    { rating: "2 ⭐", count: distribution[2] },
    { rating: "1 ⭐", count: distribution[1] },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="rating" stroke="#666" style={{ fontSize: "12px" }} />
        <YAxis stroke="#666" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar dataKey="count" fill="#FF6000" name="Değerlendirme Sayısı" />
      </BarChart>
    </ResponsiveContainer>
  );
}
