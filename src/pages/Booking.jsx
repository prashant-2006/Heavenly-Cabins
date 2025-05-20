import React, { useState } from "react";
import BookingTable from "../features/Bookings/BookingTable";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("status") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "startDate-desc");

  function handleFilterChange(value) {
    setFilter(value);
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  function handleSortChange(value) {
    setSortBy(value);
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4">
        <h1 className="text-2xl font-medium ml-3">Bookings</h1>

        <div className="flex flex-wrap items-center justify-end gap-2 mt-4 sm:mt-0">
          {/* Filter Buttons */}
          {["all", "checked-in", "checked-out", "unconfirmed"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-1 rounded-full font-medium text-sm transition duration-200 ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-green-50"
              }`}
            >
              {status === "all" ? "All" : status.replace("-", " ")}
            </button>
          ))}

          {/* Sort Dropdown Styled as Button */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-1 mr-3 rounded-b-sm font-medium text-sm border border-gray-300 bg-white text-gray-800 hover:bg-green-50 cursor-pointer"
          >
            <option value="startDate-desc">Date (new → old)</option>
            <option value="startDate-asc">Date (old → new)</option>
            <option value="totalPrice-desc">Amount (high → low)</option>
            <option value="totalPrice-asc">Amount (low → high)</option>
          </select>
        </div>
      </div>

      {/* Booking Table */}
      <div className="w-full overflow-x-auto px-4 md:px-8">
        <BookingTable />
      </div>
    </>
  );
}

export default Booking;
