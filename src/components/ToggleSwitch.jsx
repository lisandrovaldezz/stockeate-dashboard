export const ToggleSwitch = ({
  checked = true,
  onChange,
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label className={`toggle-switch ${disabled ? "disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="toggle-input"
      />
      <span className="toggle-slider"></span>
    </label>
  );
};
