import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import RouteChangeHandler from "@/components/RouteChangeHandler";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import InventoryPage from "./pages/InventoryPage";
import CustomersPage from "./pages/CustomersPage";
import CouriersPage from "./pages/CouriersPage";
import FinancePage from "./pages/FinancePage";
import MarketingPage from "./pages/MarketingPage";
import WebsitesPage from "./pages/WebsitesPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange={false}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteChangeHandler />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/missing" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/barcodes" element={<InventoryPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/couriers" element={<CouriersPage />} />
            <Route path="/couriers/zones" element={<CouriersPage />} />
            <Route path="/couriers/config" element={<CouriersPage />} />
            <Route path="/finance/accounts" element={<FinancePage />} />
            <Route path="/finance/transactions" element={<FinancePage />} />
            <Route path="/finance/expenses" element={<FinancePage />} />
            <Route path="/finance/invoices" element={<FinancePage />} />
            <Route path="/marketing/sms" element={<MarketingPage />} />
            <Route path="/marketing/credits" element={<MarketingPage />} />
            <Route path="/marketing/promotions" element={<MarketingPage />} />
            <Route path="/marketing/ai" element={<MarketingPage />} />
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/websites/templates" element={<WebsitesPage />} />
            <Route path="/websites/ai" element={<WebsitesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings/business" element={<SettingsPage />} />
            <Route path="/settings/warehouse" element={<SettingsPage />} />
            <Route path="/settings/brand" element={<SettingsPage />} />
            <Route path="/settings/role" element={<SettingsPage />} />
            <Route path="/settings/employee" element={<SettingsPage />} />
            <Route path="/settings/supplier" element={<SettingsPage />} />
            <Route path="/settings/invoice" element={<SettingsPage />} />
            <Route path="/settings/courier-api" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
