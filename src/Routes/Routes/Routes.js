import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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
      },
      {
        path: '/dashboard',
        element: <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    ]
  }
])




export default router;



