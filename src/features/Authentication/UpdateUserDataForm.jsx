import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDataForm = () => {
  const { user } = useUser();
  const { email, fullName, avatar } = user.user_metadata;
  const {updateUser, isUpdating} = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: fullName || "",
    },
  });

  function onSubmit(data) {
    console.log("User data to update:", data);
    const {fullName, avatar} = data;
    const avatarFile = data.avatar?.[0];
    if(!fullName){
      return;
    }
    updateUser({fullName, avatar: avatarFile} );
  }

  return (
    <div className="max-w-full mx-6 mt-5 p-6 shadow-lg rounded-lg bg-white">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-300 focus:outline-none"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar Image
          </label>
          <input
            {...register("avatar")}
            type="file"
            accept="image/*"
            className="w-full px-2 py-1 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUserDataForm;
