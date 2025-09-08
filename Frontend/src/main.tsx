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
import ProviderDashBoard from "./pages/ProviderDashBoard.tsx";
import ProviderReviewPending from "./components/ProviderReviewPending.tsx";
import HomePage from "./pages/HomePage.tsx";
import FindProviders from "./pages/FindProviders.tsx";
import CreateCustomerRequest from "./pages/CreateCustomerRequest.tsx";
import ProviderProfile from "./pages/ProviderProfile.tsx";
import ServicePackage from "./pages/ProviderPackages.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
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
  {
    path: "/providerDashBoard",
    element: <ProviderDashBoard />,
  },
  {
    path: "/providerReviews/:id",
    element: <ProviderReviewPending />,
  },
  {
    path: "/findProviders",
    element: <FindProviders />,
  },
  {
    path: "/postRequirement",
    element: <CreateCustomerRequest />,
  },
  {
    path: "/providerProfile/:id",
    element: <ProviderProfile />,
  },
  {
    path: "/packages",
    element: <ServicePackage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
