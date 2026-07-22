import "./button.css";

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ui-btn ui-btn-${variant} ${
        fullWidth ? "ui-btn-full" : ""
      }`}
    >
      {icon && <span className="ui-btn-icon">{icon}</span>}

      <span>{children}</span>
    </button>
  );
}

export default Button;