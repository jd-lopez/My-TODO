import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SingUp";
import Landing from "./pages/landing/Landing";
import PublicLayout from "./layouts/PublicLayout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoutes";
import Board from "./features/boards/components/Board";

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
          <Route path="board/:id" element={<Board />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
