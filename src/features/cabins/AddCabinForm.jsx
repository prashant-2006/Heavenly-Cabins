import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import ErrorMessage from "../../ui/Error";

const FormRow = ({ label, children }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const AddCabinForm = ({onClose}) => {
  const {register, handleSubmit, reset, getValues, formState} = useForm()
  const {errors} = formState
  const queryClient = useQueryClient()
  const {mutate, isLoading} = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
        toast.success("New cabin created successfully")
        queryClient.invalidateQueries({queryKey: ['cabins']})
        reset()
        onClose()
    },
    onError: (err) => {
        toast.error(err.message)
    },
  })


  function onSubmit(data){
    mutate({...data, image: data.image[0]})
  }

  function onError(err){
    console.log(err)
  }

  return (
    <form className="min-w-full mx-auto bg-white rounded-xl p-3 space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin Name">
        <input
          name="name"
          type="text"
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="e.g. Mountain Breeze"
          {...register("name",{
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <ErrorMessage message={errors.name.message} />}
      </FormRow>

      <FormRow label="Max Capacity">
        <input
          name="maxCapacity"
          type="number"
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="e.g. 4"
          {...register("maxCapacity",{
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1"
            }
          })}
        />
        {errors?.maxCapacity?.message && <ErrorMessage message={errors.maxCapacity.message} />}
      </FormRow>

      <FormRow label="Regular Price ($)">
        <input
          name="regularPrice"
          type="number"
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="e.g. 120"
          {...register("regularPrice",{
            required: "This field is required",
          })}
        />
        {errors?.regularPrice?.message && <ErrorMessage message={errors.regularPrice.message} />}
      </FormRow>

      <FormRow label="Discount ($)">
        <input
          name="discount"
          type="number"
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="e.g. 20"
          {...register("discount",{
            required: "This field is required",
            validate: (value) => value < getValues().regularPrice || "Discount should be less than the regular price"
          })}
        />
        {errors?.discount?.message && <ErrorMessage message={errors.discount.message} />}
      </FormRow>

      <FormRow label="Description">
        <textarea
          name="description"
          rows={4}
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="Short description for website..."
        />
        {errors?.description?.message && <ErrorMessage message={errors.description.message} />}
      </FormRow>

      <FormRow label="Cabin Photo (Image URL)">
        <input
          name="image"
          type="file"
          accept="image/*"
          disabled={isLoading}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition w-full"
          placeholder="https://example.com/photo.jpg"
          {...register("image",{
            required: "This field is required",
          })}
        />
        {errors?.image?.message && <ErrorMessage message={errors.image.message} />}
      </FormRow>

      <div className="pt-4">
        <button
            onClick={onClose}
            type="reset"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl transition duration-200 mr-4 border-2 border-gray-300"
        >
            Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
        >
          Add Cabin
        </button>
      </div>
    </form>
  );
};

export default AddCabinForm;
