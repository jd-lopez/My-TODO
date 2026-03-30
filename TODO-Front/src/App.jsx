import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./features/boards/pages/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SingUp";
import Landing from "./pages/landing/Landing";
import PublicLayout from "./layouts/PublicLayout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Board from "./features/boards/components/board/Board";

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
          <Route path="boards/:boardId" element={<Board />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
