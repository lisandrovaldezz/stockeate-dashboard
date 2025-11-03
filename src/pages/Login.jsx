import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import stockeateIcon from "../assets/stockeate-icon.png";

export function Login() {
  const { login, register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Ingresá tu email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Ingresá tu contraseña";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const ok = await login(email, password);
      if (ok) {
        toast.success("Iniciaste sesión exitosamente");
        setTimeout(() => {
          window.location.href = "/branches";
        }, 700);
      }
    } catch (e) {
      if (e.message === "email must be an email") {
        toast.error("Formato de email inválido");
      } else {
        toast.error(e.message);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      <div className="login-form-header">
        <div className="login-form-header-img">
          <img src={stockeateIcon} alt="Logo de Stockeate" />
        </div>
        <h1>Stockeate</h1>
        <p>Acceso a tu inventario</p>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-input-container">
            <p>Email</p>
            <div className="email-input-container">
              <svg
                className="email-icon-left"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="text"
                placeholder="tu@email.com"
                className={`email-input ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="login-form-input-container">
            <p>Contraseña</p>
            <div className="password-input-container">
              <svg
                className="password-icon-left"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                placeholder="●●●●●●●●●●●●●●"
                className={`password-input ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="button" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </button>
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
        </form>
      </div>
      <h5>© 2025 Stockeate</h5>
    </div>
  );
}
