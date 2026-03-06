import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SingUp";
import Landing from "./pages/landing/Landing";
import PublicLayout from "./PublicLayout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route
            path="login"
            element={
              isAuthenticated ? <Navigate to="/app" replace /> : <Login />
            }
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? <Navigate to="/app" replace /> : <SignUp />
            }
          />
        </Route>

        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
