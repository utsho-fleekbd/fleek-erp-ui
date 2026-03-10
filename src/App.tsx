import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/create" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/categories" element={<ProductsPage />} />
          <Route path="/products/create" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/warehouses" element={<InventoryPage />} />
          <Route path="/inventory/movements" element={<InventoryPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/suppliers" element={<CustomersPage />} />
          <Route path="/couriers" element={<CouriersPage />} />
          <Route path="/couriers/zones" element={<CouriersPage />} />
          <Route path="/couriers/config" element={<CouriersPage />} />
          <Route path="/finance/accounts" element={<FinancePage />} />
          <Route path="/finance/transactions" element={<FinancePage />} />
          <Route path="/finance/expenses" element={<FinancePage />} />
          <Route path="/finance/invoices" element={<FinancePage />} />
          <Route path="/payments/gateways" element={<CouriersPage />} />
          <Route path="/payments/settings" element={<CouriersPage />} />
          <Route path="/marketing/sms" element={<MarketingPage />} />
          <Route path="/marketing/credits" element={<MarketingPage />} />
          <Route path="/marketing/promotions" element={<MarketingPage />} />
          <Route path="/marketing/ai" element={<MarketingPage />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/websites/templates" element={<WebsitesPage />} />
          <Route path="/websites/ai" element={<WebsitesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/roles" element={<UsersPage />} />
          <Route path="/business/profile" element={<UsersPage />} />
          <Route path="/business/subscription" element={<UsersPage />} />
          <Route path="/business/packages" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/security" element={<SettingsPage />} />
          <Route path="/settings/notifications" element={<SettingsPage />} />
          <Route path="/settings/api-keys" element={<SettingsPage />} />
          <Route path="/settings/branding" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
