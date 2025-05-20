import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
    return (
      <>
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="p-6 bg-gray-100 min-h-screen overflow-autos">
            <Outlet />
          </main>
        </div>
      </>
    );
  };

export default AppLayout;