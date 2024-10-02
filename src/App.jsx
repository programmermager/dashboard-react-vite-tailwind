import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuardProtectedRoute from "./components/GuardProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/AdminPage";

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
