import React from "react";
import { useLogout } from "../features/Authentication/useLogout";
import { useUser } from "../features/Authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { MdLogout, MdAccountCircle } from "react-icons/md";

const Header = () => {
  const { logout, isLoading } = useLogout();
  const { user } = useUser();
  const navigate = useNavigate();

  const { fullName, avatar } = user?.user_metadata || {};

  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 border-b border-gray-100">
      {/* Left Side: Avatar + Name */}
      <div className="flex items-center gap-3 text-gray-800 font-semibold">
        <div
          className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-1 ring-gray-300"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <MdAccountCircle size={30} className="text-gray-500" />
          )}
        </div>
        <span className="text-base sm:text-lg">{fullName}</span>
      </div>

      {/* Right Side: Edit + Logout */}
      <div className="flex items-center gap-4">
        {/* Account link */}
        <button
          onClick={() => navigate("/account")}
          title="Edit account"
          className="text-green-600 p-2 rounded-full hover:ring-2 hover:ring-green-300 transition"
        >
          <MdAccountCircle size={26} />
        </button>

        {/* Logout icon */}
        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <button
            onClick={logout}
            title="Logout"
            className="text-red-500 p-2 rounded-full hover:ring-2 hover:ring-red-300 transition"
          >
            <MdLogout size={24} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
