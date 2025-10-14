import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import Quotes from "../pages/Quotes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: () => <Navigate to="/quotes" replace /> },
      {
        path: "quotes",
        Component: Quotes,
      },
      //   { index: true, Component: ProductList },
      //   { path: "product/:id", Component: ProductDetails },
      //   {
      //     path: "cart",
      //     Component: Cart,
      //   },
    ],
  },
]);

export default router;
