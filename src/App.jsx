import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import "./App.css";
import "sonner/dist/styles.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AuthPage from "./components/Pages/Auth/AuthPage";
import Unauthorized from "./components/Pages/Unauthorized/Unauthorized";
import NotFound from "./components/Pages/NotFound/NotFound";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Homepage from "./components/Pages/Home/Homepage";
import ThemeProvider from "./components/context/Theme/ThemeProvider";
import ProductListing from "./components/Pages/Product/ProductListing";
import Orders from "./components/Pages/Orders/Orders";
import { TooltipProvider } from "@/components/ui/tooltip";
import Customers from "./components/Pages/Customers/Customers";
import RouteManagement from "./components/Pages/Route/RouteManagement";
import PageManagement from "./components/Pages/Page/PageManagement";
import ContentManagement from "./components/Pages/Content/ContentManagement";
import SettingsManagement from "./components/Pages/Settings/SettingsManagement";

function App() {
  return (
    <>
      <TooltipProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Toaster
              theme="dark"
              position="top-center"
              richColors
              expand
              closeButton
              visibleToasts={4}
              duration={3000}
              toastOptions={{
                unstyled: false,

                style: {
                  background: "#020617",
                  border: "1px solid #1e293b",
                  color: "#f8fafc",
                  borderRadius: "18px",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                },

                classNames: {
                  title: "text-sm font-semibold",
                  description: "text-xs text-slate-400",
                  actionButton:
                    "!bg-emerald-500 !text-white hover:!bg-emerald-600",
                  cancelButton:
                    "!bg-slate-800 !text-slate-200 hover:!bg-slate-700",
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/home" element={<Homepage />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductListing />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="routes" element={<RouteManagement />} />
                <Route path="pages" element={<PageManagement />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="settings" element={<SettingsManagement />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
}

export default App;
