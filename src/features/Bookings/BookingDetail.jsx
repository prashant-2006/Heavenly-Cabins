import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaBed,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useCheckin } from "../Check-in-out/useCheckin";
import { useCheckout } from "../Check-in-out/useCheckout";
import { useSetting } from "../Settings.jsx/useSetting";

function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: booking, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
  });

  const { checkin, isCheckingIn } = useCheckin();
  const { checkout, isCheckingOut } = useCheckout();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isLoading: isLoadingSettings, settings } = useSetting();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error) return <p>Error loading booking.</p>;
  if (!booking) return <p>No booking found with ID {id}</p>;

  const {
    guests,
    cabins,
    status,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    isPaid,
    observations,
  } = booking;

  const breakfastCost =
    settings.breakfastPrice * numNights * numGuests;

  const showFinalExtras = addBreakfast ? extrasPrice + breakfastCost : extrasPrice;
  const showFinalTotal = addBreakfast ? totalPrice + breakfastCost : totalPrice;

  function handleCheckIn() {
    const updatedFields = {
      id,
      breakfast: {},
    };

    if (addBreakfast) {
      updatedFields.breakfast = {
        hasBreakfast: true,
        extrasPrice: showFinalExtras,
        totalPrice: showFinalTotal,
      };
    }

    checkin(updatedFields);
  }

  function handleCheckout() {
    checkout(id);
  }

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800">
        Booking #{booking.id}
      </h1>

      <div className="flex items-center space-x-4 text-gray-700">
        <FaUser />
        <span className="font-medium">{guests.fullName}</span>
        {guests.nationality && (
          <img
            src={`https://flagcdn.com/24x18/${guests.nationality.toLowerCase()}.png`}
            alt="Flag"
            className="w-6 h-4"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="bg-green-50 rounded-xl p-4 w-full md:w-1/3">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-lg font-semibold capitalize">{status}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 w-full md:w-1/3">
          <p className="text-sm text-gray-500">Payment</p>
          <p className="text-lg font-semibold">
            {isPaid ? "Paid" : "Not Paid"}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 shadow">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaCalendarAlt className="mr-2" /> Dates
          </div>
          <p>
            {new Date(startDate).toLocaleDateString()} →{" "}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaBed className="mr-2" /> Cabin
          </div>
          <p>{cabins.name}</p>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow">
          <div className="text-sm text-gray-600 mb-2">Nights & Guests</div>
          <p>
            {numNights} nights, {numGuests} guest(s)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4 shadow w-full md:w-1/3">
        <p className="text-sm text-gray-500">Breakfast</p>
        <p className="text-lg font-medium">
          {hasBreakfast ? "Included" : "Not Included"}
        </p>
      </div>

      {observations && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
          <p className="text-gray-800 font-medium">Notes:</p>
          <p>{observations}</p>
        </div>
      )}

      {/* Optional breakfast checkbox */}
      {!hasBreakfast && (status === "unconfirmed" || status === "checked-in") && (
        <label className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            className="accent-green-600"
            checked={addBreakfast}
            onChange={() => setAddBreakfast((prev) => !prev)}
          />
          <span className="text-sm text-gray-700">
            Add breakfast for all guests (${breakfastCost})
          </span>
        </label>
      )}

      <div className="bg-green-100 rounded-xl p-6 shadow-md w-full md:w-1/2">
        <div className="flex items-center text-gray-700 mb-2">
          <FaMoneyBillWave className="mr-2" />
          <span className="font-semibold">Total Price to Pay</span>
        </div>
        <p className="text-2xl font-bold text-green-800">${showFinalTotal}</p>
        <p className="text-sm text-gray-500">
          Cabin: ${cabinPrice} + Extras: ${showFinalExtras}
        </p>
      </div>

      {/* Unconfirmed: Check-in flow */}
      {status === "unconfirmed" && (
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-green-600"
              checked={isPaid || confirmPaid}
              disabled={isPaid}
              onChange={() => setConfirmPaid((prev) => !prev)}
            />
            <span className="text-sm text-gray-700">
              {isPaid
                ? "Payment already confirmed"
                : "Confirm payment before check-in"}
            </span>
          </label>

          <button
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              !isPaid && !confirmPaid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={!isPaid && !confirmPaid}
            onClick={handleCheckIn}
          >
            {isCheckingIn ? "Checking in..." : "Check In"}
          </button>
        </div>
      )}

      {/* Checked-in with no breakfast: offer update */}
      {status === "checked-in" && !hasBreakfast && addBreakfast && (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          onClick={handleCheckIn}
        >
          {isCheckingIn ? "Updating..." : "Update Check-in with Breakfast"}
        </button>
      )}

      {/* ✅ Checked-in: Show checkout button */}
      {status === "checked-in" && (
        <button
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Checking out..." : "Check Out"}
        </button>
      )}
    </div>
  );
}

export default BookingDetail;
