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
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
