import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecentBookings } from "../features/Dashboard/useRecentBooking";
import { useRecentStays } from "../features/Dashboard/useRecentStays";
import { getCabins } from "../services/apiCabins";
import Spinner from "../ui/Spinner";

import {
  MdCalendarToday,
  MdAttachMoney,
  MdCheckCircle,
  MdBarChart,
} from "react-icons/md";
import { SalesChart } from "../ui/SalesChart";
import { DurationChart } from "../ui/DurationChart";

const daysOptions = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

function Dashboard() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    isLoading: isLoading1,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const {
    isLoading: isLoading2,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLast = searchParams.get("last") || "7";

  const handleFilterChange = (days) => {
    searchParams.set("last", days);
    setSearchParams(searchParams);
  };

  if (isLoading || isLoading1 || isLoading2) return <Spinner />;

  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (0.01 * numDays * cabins.length);

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="mb-6 flex items-center space-x-3">
        {daysOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleFilterChange(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-150 ${
              selectedLast === value
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          label="Bookings"
          value={numBookings}
          icon={<MdCalendarToday size={28} />}
          color="text-blue-600 bg-blue-100"
        />
        <StatCard
          label="Sales"
          value={`$${sales.toFixed(2)}`}
          icon={<MdAttachMoney size={28} />}
          color="text-green-600 bg-green-100"
        />
        <StatCard
          label="Check-ins"
          value={checkins}
          icon={<MdCheckCircle size={28} />}
          color="text-purple-600 bg-purple-100"
        />
        <StatCard
          label="Occupancy Rate"
          value={`${occupancyRate.toFixed(2)}%`}
          icon={<MdBarChart size={28} />}
          color="text-yellow-600 bg-yellow-100"
        />
      </div>
      <SalesChart bookings={bookings} numDays={numDays} />
      <DurationChart stays={confirmedStays} />
    </div>
  );
}

const StatCard = ({ label, value, icon, color }) => (
  <div className="p-5 rounded-xl shadow bg-white flex items-center space-x-4">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
