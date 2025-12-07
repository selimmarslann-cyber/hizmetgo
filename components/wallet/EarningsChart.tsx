"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EarningsChartProps {
  data: { date: string; amount: number }[];
  title?: string;
}

export default function EarningsChart({
  data,
  title = "Kazanç Trendi",
}: EarningsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center text-slate-500">
            Veri bulunamadı
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount), 0);
  const chartHeight = 200;
  const chartWidth = 100;
  const padding = 20;

  // Generate points for line chart
  const points = data.map((item, index) => {
    const x =
      padding + (index * (chartWidth - 2 * padding)) / (data.length - 1 || 1);
    const y =
      chartHeight -
      padding -
      (item.amount / maxAmount) * (chartHeight - 2 * padding);
    return { x, y, amount: item.amount, date: item.date };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox={`0 0 ${chartWidth + padding * 2} ${chartHeight + padding * 2}`}
            className="w-full h-48"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding + ratio * (chartHeight - 2 * padding);
              return (
                <line
                  key={ratio}
                  x1={padding}
                  y1={y}
                  x2={chartWidth + padding}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              );
            })}

            {/* Area fill */}
            <path
              d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`}
              fill="url(#gradient)"
              opacity={0.3}
            />

            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke="#FF6000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#FF6000"
                className="hover:r-6 transition-all"
              />
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6000" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FF6000" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            {data.map((item, index) => (
              <span key={index} className="truncate">
                {new Date(item.date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
