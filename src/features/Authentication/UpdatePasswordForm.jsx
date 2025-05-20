import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

const UpdatePasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateUser({ password: data.password });
    reset(); // Clear fields after submit
  };

  return (
    <div className="max-w-full mt-6 mx-6 p-6 shadow-lg rounded-lg bg-white">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={isUpdating}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
