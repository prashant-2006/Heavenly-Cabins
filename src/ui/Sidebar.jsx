// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBook, FaBed, FaUsers, FaCog } from "react-icons/fa";
import logo from "../Images/logo.png";

const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Booking", path: "/booking", icon: <FaBook /> },
    { name: "Cabins", path: "/cabin", icon: <FaBed /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Settings", path: "/setting", icon: <FaCog /> },
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-md fixed flex flex-col">
      <div className="p-0 flex justify-center">
        <img src={logo} alt="Havenly Rooms Logo" className="h-40 w-40 mt-4" />
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors 
              ${isActive ? "bg-green-100 text-green-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
