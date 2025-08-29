import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import PPC from "./pages/ProviderProfileCreation.tsx";
import Address from "./components/Address.tsx";
import { Provider } from "react-redux";
import store from "./redux/Store.ts";
import OTPVerification from "./pages/Otp.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashBoard.tsx";
import ReviewProviderProfile from "./admin/ReviewProviderProfile.tsx";
const router = createBrowserRouter([
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/providerProfileCreation",
    element: <PPC />,
  },
  {
    path: "/otpVerification",
    element: <OTPVerification />,
  },
  {
    path: "/adminDashBoard",
    element: <AdminDashboard />,
  },
  {
    path: "/reviewProviderProfile/:id",
    element: <ReviewProviderProfile />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
