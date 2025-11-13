import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import stockeateIcon from "../assets/stockeate-icon.png";
import { LoginInput } from "../components/LoginInput.jsx";
import {
  nameIcon,
  dniIcon,
  emailIcon,
  passwordIcon,
  passwordToggleIcon,
  passwordToggleIcon2,
} from "../assets/svgs.jsx";

export function Login() {
  const { login, register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (isRegistering) {
      if (!firstName.trim()) {
        newErrors.firstName = "Ingresá tu nombre";
        isValid = false;
      }
      if (!lastName.trim()) {
        newErrors.lastName = "Ingresá tu apellido";
        isValid = false;
      }
      if (!dni.trim()) {
        newErrors.dni = "Ingresá tu DNI";
        isValid = false;
      }
    }

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
    if (!isValid) {
      setTimeout(() => {
        setErrors({ email: "", password: "" });
      }, 3000);
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isRegistering) {
        const ok = await register(email, password, firstName, lastName, dni);
        if (ok) {
          toast.success("Cuenta creada exitosamente");
          setTimeout(() => (window.location.href = "/branches"), 700);
        }
      } else {
        const ok = await login(email, password);
        if (ok) {
          toast.success("Iniciaste sesión exitosamente");
          setTimeout(() => (window.location.href = "/branches"), 700);
        }
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
        <form
          className={`${isRegistering ? "login-form-register" : "login-form"}`}
          onSubmit={handleSubmit}
        >
          {isRegistering && (
            <>
              <LoginInput
                label="Nombre"
                svg={nameIcon}
                placeholder="Tu nombre"
                error={errors.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <LoginInput
                label="Apellido"
                svg={nameIcon}
                placeholder="Tu apellido"
                error={errors.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <LoginInput
                label="DNI"
                svg={dniIcon}
                placeholder="Tu DNI"
                error={errors.dni}
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
            </>
          )}
          <LoginInput
            label="Email"
            svg={emailIcon}
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <LoginInput
            label="Contraseña"
            svg={passwordIcon}
            placeholder="●●●●●●●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            type={showPassword ? "text" : "password"}
            button={
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? passwordToggleIcon : passwordToggleIcon2}
              </button>
            }
          />

          {!isRegistering && (
            <button type="button" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </button>
          )}
          <button
            className="login-buttons login-button"
            type="submit"
            disabled={loading}
          >
            {isRegistering ? "Registrarse" : "Ingresar"}
          </button>

          {!isRegistering && (
            <button
              className="login-buttons register-button"
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrors({ email: "", password: "" });
              }}
              disabled={loading}
            >
              Crear cuenta
            </button>
          )}
        </form>
      </div>
      <h5>© 2025 Stockeate</h5>
    </div>
  );
}
