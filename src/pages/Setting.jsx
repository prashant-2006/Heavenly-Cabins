import React from "react";
import { useForm } from "react-hook-form";
import { useSetting } from "../features/Settings.jsx/useSetting";
import { UpdateSetting } from "../features/Settings.jsx/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

const HotelSettingsForm = () => {
  const { isLoading, settings = {} } = useSetting();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: settings.minBookingLength,
      maxBookingLength: settings.maxBookingLength,
      maxGuestPerBooking: settings.maxGuestPerBooking,
      breakfastPrice: settings.breakfastPrice,
    },
    values: settings, // allow sync when data loads
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error("Failed to update settings");
      console.error(err);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Update Hotel Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Min nights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum nights per booking
          </label>
          <input
            type="number"
            {...register("minBookingLength", { required: "This is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.minBookingLength && (
            <p className="text-red-500 text-sm">{errors.minBookingLength.message}</p>
          )}
        </div>

        {/* Max nights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum nights per booking
          </label>
          <input
            type="number"
            {...register("maxBookingLength", { required: "This is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.maxBookingLength && (
            <p className="text-red-500 text-sm">{errors.maxBookingLength.message}</p>
          )}
        </div>

        {/* Max guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum guests per booking
          </label>
          <input
            type="number"
            {...register("maxGuestPerBooking", { required: "This is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.maxGuestPerBooking && (
            <p className="text-red-500 text-sm">{errors.maxGuestPerBooking.message}</p>
          )}
        </div>

        {/* Breakfast price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Breakfast price ($)
          </label>
          <input
            type="number"
            {...register("breakfastPrice", { required: "This is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.breakfastPrice && (
            <p className="text-red-500 text-sm">{errors.breakfastPrice.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
};

export default HotelSettingsForm;
