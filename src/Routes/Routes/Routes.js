import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
// import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <DisplayError />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/appointment',
        element: <Appointment />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    errorElement: <DisplayError />,
    children: [
      {
        path: '/dashboard',
        element: <MyAppointment />
      },
      {
        path: '/dashboard/allusers',
        element: <AdminRoute>
          <AllUsers />
        </AdminRoute>
      },
      {
        path: '/dashboard/add_doctor',
        element: <AdminRoute>
          <AddDoctor />
        </AdminRoute>
      },
      {
        path: '/dashboard/managedoctors',
        element: <AdminRoute>
          <ManageDoctors />
        </AdminRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment />,
        loader: ({ params }) => fetch(`https://doctors-portal-server-eosin-xi.vercel.app/api/bookings/${params.id}`)
      },
    ]
  }
])




export default router;



