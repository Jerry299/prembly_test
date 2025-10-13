import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { RouterProvider } from "react-router";
import router from "./shopping-cart-ts/routes";
import { Provider } from "react-redux";
import { store } from "./globalRedux/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-left" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
