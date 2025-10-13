import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/mainLayout";
import ProductList from "../pages/ProductsList";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: () => <Navigate to="/products" replace /> },
      {
        path: "products",
        Component: ProductList,
      },
      { index: true, Component: ProductList },
      { path: "product/:id", Component: ProductDetails },
      {
        path: "cart",
        Component: Cart,
      },
    ],
  },
]);
export default router;
