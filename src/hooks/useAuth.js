// src/hooks/useAuth.js
import { useState } from "react";
import { api } from "../api";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const parseError = (e) => {
    if (e.response?.data?.message) {
      return Array.isArray(e.response.data.message)
        ? e.response.data.message.join(", ")
        : e.response.data.message;
    }
    return e.message || "Error inesperado. Intenta nuevamente.";
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      return true;
    } catch (e) {
      throw new Error(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { email, password });
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      return true;
    } catch (e) {
      throw new Error(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, loading, login, register, logout };
}
