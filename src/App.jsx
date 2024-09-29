import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardProtectedRoute from "./components/guard-protected-route";
import LoginPage from "./pages/login-page/login-page";
import "./App.css";
import ProtectedRoute from "./components/protected-route";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <div>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuardProtectedRoute>
                <LoginPage />
              </GuardProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
