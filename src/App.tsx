import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Get basename from Vite config (import.meta.env.BASE_URL)
const basename = "/agendamentoparanapiacaba/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
    },
    // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  { basename }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
