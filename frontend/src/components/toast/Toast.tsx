import "./Toast.css";

import { useEffect } from "react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

const Toast = ({
  type,
  message,
  onClose,
  autoHideDuration = 5000,
}: ToastProps) => {
  useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoHideDuration]);

  return (
    <div className={`toast ${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
