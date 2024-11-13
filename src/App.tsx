import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

import LoginPage from "./pages/Login";
import NotFound from "./pages/404";
import Layout from "./components/Layout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;
