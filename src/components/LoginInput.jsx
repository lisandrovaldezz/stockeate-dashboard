export function LoginInput({
  label,
  placeholder,
  cssClass,
  value,
  onChange,
  error,
  svg,
  button,
  type,
}) {
  return (
    <div className="login-form-input-container">
      <p>{label}</p>
      <div className="login-input-container">
        {svg}
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${cssClass || "login"}-input ${
            error ? "input-error" : ""
          }`}
        />
        {button}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
