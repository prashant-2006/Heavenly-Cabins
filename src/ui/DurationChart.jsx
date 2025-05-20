import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Initial chart data with durations, initial count, and colors
const startData = [
  { duration: "1 night", value: 0, color: "#10b981" },
  { duration: "2 nights", value: 0, color: "#3b82f6" },
  { duration: "3 nights", value: 0, color: "#8b5cf6" },
  { duration: "4-5 nights", value: 0, color: "#ec4899" },
  { duration: "6-7 nights", value: 0, color: "#f97316" },
  { duration: "8-14 nights", value: 0, color: "#eab308" },
  { duration: "15-21 nights", value: 0, color: "#14b8a6" },
  { duration: "21+ nights", value: 0, color: "#f43f5e" },
];

function incrementDuration(arr, field) {
  return arr.map((obj) =>
    obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
  );
}

export function DurationChart({ stays }) {
  const chartData = stays
    .reduce((arr, curr) => {
      const nights = curr.numNights;
      if (nights === 1) return incrementDuration(arr, "1 night");
      if (nights === 2) return incrementDuration(arr, "2 nights");
      if (nights === 3) return incrementDuration(arr, "3 nights");
      if ([4, 5].includes(nights)) return incrementDuration(arr, "4-5 nights");
      if ([6, 7].includes(nights)) return incrementDuration(arr, "6-7 nights");
      if (nights >= 8 && nights <= 14)
        return incrementDuration(arr, "8-14 nights");
      if (nights >= 15 && nights <= 21)
        return incrementDuration(arr, "15-21 nights");
      if (nights > 21) return incrementDuration(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0); // Remove zero values

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Stay Duration Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="duration"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.duration} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} stays`, name]}
            labelStyle={{ fontSize: "14px", fontWeight: "bold" }}
            contentStyle={{ fontSize: "14px" }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
