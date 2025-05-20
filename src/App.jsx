import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabin from "./pages/Cabin";
import User from "./pages/User";
import Setting from "./pages/Setting";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Booking from "./pages/Booking";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import BookingDetail from "./features/Bookings/BookingDetail";
import Login from "./features/Authentication/Login";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60*1000,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient} >
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="/bookingdetail/:id" element={<BookingDetail />} />
        <Route path="cabin" element={<Cabin />} />
        <Route path="users" element={<User />} />
        <Route path="setting" element={<Setting />} />
        <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <Toaster 
      position="top-center"
      gutter={12}
      containerStyle={{margin: "8px"}}
      toastOptions={{
        success: {
          duration: 3000
        },
        error: {
          duration: 5000
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: 'white',
          color: 'black'
        },
      }}
    />
    </QueryClientProvider>
  )
}

export default App;
