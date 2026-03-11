import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import RouteChangeHandler from "@/components/RouteChangeHandler";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));
const CouriersPage = lazy(() => import("./pages/CouriersPage"));
const FinancePage = lazy(() => import("./pages/FinancePage"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));
const WebsitesPage = lazy(() => import("./pages/WebsitesPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
