import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const dailyBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at))
    );

    return {
      label: format(date, "MMM dd"),
      totalSales: dailyBookings.reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: dailyBookings.reduce(
        (acc, curr) => acc + curr.extrasPrice,
        0
      ),
    };
  });

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExtras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
          />
          <CartesianGrid strokeDasharray="3 3" />

          <Tooltip
            contentStyle={{ fontSize: "14px" }}
            formatter={(value, name) => [
              `$${value.toFixed(2)}`,
              name === "totalSales" ? "Total Sales" : "Extras Sales",
            ]}
            labelStyle={{ fontWeight: "bold", fontSize: "14px" }}
          />

          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Total Sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#colorExtras)"
            name="Extras Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
