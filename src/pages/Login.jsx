import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export function Login() {
  const { login, register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ok = await login(email, password);
      if (ok) {
        toast.success("Iniciaste sesión exitosamente");
        setTimeout(() => {
          window.location.href = "/branches";
        }, 700);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const ok = await register(email, password);
      if (ok) {
        toast.success("Cuenta creada exitosamente");
        setTimeout(() => {
          window.location.href = "/branches";
        }, 700);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };

  return (
    <div className="login-container">
      <header className="app-header">
        <h1>Stockeate - Acceso</h1>
      </header>

      <div className="login-form-container">
        <h1>Stockeate</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-form-input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-buttons login-button"
            type="submit"
            disabled={loading}
          >
            Ingresar
          </button>

          <button
            className="login-buttons register-button"
            type="button"
            onClick={handleRegister}
            disabled={loading}
          >
            Crear cuenta
          </button>

          <button type="button" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      </div>
    </div>
  );
}
