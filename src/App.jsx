import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import DashboardLayout from "./Component/Layouts/DashboardLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";

import Flights from "./pages/Flights/Flights";
import Hotels from "./pages/Hotels/Hotels";
import Messages from "./pages/Messages/Messages";
import Users from "./pages/Users/Users";

import FlightListings from "./pages/FlightListings/FlightListings";
import HotelListings from "./pages/HotelListings/HotelListings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,       // gatekeeper wraps everything below
    children: [
      {
        element: <DashboardLayout />,  // shell (Sidebar + Topbar + Outlet)
        children: [
          { path: "/", element: <Navigate to="/overview" replace /> },
          { path: "/overview", element: <Overview /> },
          { path: "/flights", element: <Flights /> },
          { path: "/hotels", element: <Hotels /> },
          { path: "/messages", element: <Messages /> },
          { path: "/users", element: <Users /> },
          { path: "/flightListings", element: <FlightListings /> },
          { path: "/hotelListings" , element: <HotelListings /> }
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}