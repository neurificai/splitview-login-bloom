
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrdersSimple from "./pages/OrdersSimple";
import SubOrderDetails from "./pages/SubOrderDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { isUserLoggedIn } from "./utils/auth";
import Logout from "./pages/Logout";
import InstallationImages from "./pages/InstallationImages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Index />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/orders" /> : <Index />} /> */}
          {/* <Route path="/" element={<ProtectedRoute><OrdersSimple /></ProtectedRoute>} /> */}
          {/* Home Page, redirect to login if not logged in */}
          {/* <Route path="/" element={isUserLoggedIn() ? <Navigate to="/orders" /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path="/orders-old" element={<ProtectedRoute><OrdersSimple /></ProtectedRoute>} />
          <Route path="/order-old/:id" element={<ProtectedRoute><SubOrderDetails /></ProtectedRoute>} />
          <Route path="/installation-images" element={<ProtectedRoute><InstallationImages /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
