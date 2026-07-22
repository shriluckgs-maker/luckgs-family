import "./toast.css";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

function Toast({
  show = false,
  type = "success",
  title = "",
  message = "",
  onClose,
}) {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={24} />;
      case "error":
        return <AlertCircle size={24} />;
      case "info":
        return <Info size={24} />;
      default:
        return <CheckCircle size={24} />;
    }
  };

  return (
    <div className={`toast toast-${type}`}>

      <div className="toast-icon">
        {getIcon()}
      </div>

      <div className="toast-body">

        <h3>{title}</h3>

        <p>{message}</p>

      </div>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
      >
        <X size={18} />
      </button>

    </div>
  );
}

export default Toast;
