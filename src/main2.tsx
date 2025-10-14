import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./globalRedux/store";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import router from "./api-data-fetching/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ChakraProvider } from "./components/ui/provider";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-left" />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
