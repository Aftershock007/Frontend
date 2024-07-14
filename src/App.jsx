import "./App.css"
import HomePage from "./Pages/HomePage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import ForgotPasswordPage from "./Pages/ForgotPasswordPage"
import OtpPage from "./Pages/OtpPage"
import ProtectedRoute from "./Routes/ProtectedRoute"
import PublicRoute from "./Routes/PublicRoute"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      )
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      )
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    },
    {
      path: "/forgotpassword",
      element: (
        // <PublicRoute>
        <ForgotPasswordPage />
        // </PublicRoute>
      )
    },
    {
      path: "/otp",
      element: (
        // <PublicRoute>
        <OtpPage />
        // </PublicRoute>
      )
    }
  ])
  return <RouterProvider router={router} />
}
