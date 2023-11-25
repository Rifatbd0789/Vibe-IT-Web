import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import Provider from "./ContextProvider/Provider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "react-modal";
const queryClient = new QueryClient();
Modal.setAppElement(document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
