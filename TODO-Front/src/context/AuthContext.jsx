import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

// This context is the shared auth state container for the entire frontend app.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Rehydrate the user from localStorage so refreshes keep the current session in memory.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Store the JWT in state too, so route guards and components react immediately to login/logout.
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [loading, setLoading] = useState(false);

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });

      // Persist auth data in localStorage and state so the session survives refreshes.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function signup(first, last, email, password) {
    setLoading(true);
    try {
      const data = await registerUser({
        first,
        last,
        email,
        password,
      });

      // Signup behaves like login: a successful registration immediately creates a signed-in session.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  // Route guards only need to know whether both pieces of auth state exist.
  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // This hook is the single public API for auth state inside React components.
  return useContext(AuthContext);
}
