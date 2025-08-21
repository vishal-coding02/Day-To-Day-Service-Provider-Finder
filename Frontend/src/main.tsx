import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUp from "./pages/SignUp.tsx";
import { Provider } from "react-redux";
import store from "./redux/Store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SignUp />
    </Provider>
  </StrictMode>
);
