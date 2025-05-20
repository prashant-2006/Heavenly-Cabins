import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

const FormRow = ({ label, children }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const {login, isLoading} = useLogin();

  const onSubmit = ({email, password}) => {
    if(!email || !password){
        return;
    }
    console.log(`${email} ${password}`)
    login({email, password});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className="w-full max-w-md bg-white rounded-xl p-8 shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

        <FormRow label="Email Address">
          <input
          disabled={isLoading}
            type="email"
            autoComplete="email"
            className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 transition w-full ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-300 focus:border-green-400"
            }`}
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </FormRow>

        <FormRow label="Password">
          <input
          disabled={isLoading}
            type="password"
            autoComplete="current-password"
            className={`border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 transition w-full ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-300 focus:border-green-400"
            }`}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
          )}
        </FormRow>

        <div className="flex justify-between items-center">
          <button
            type="reset"
            disabled={isLoading}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl transition duration-200 border-2 border-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
