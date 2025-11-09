import { createContext, type ReactNode, useContext, useState } from "react";

import Toast from "../../components/toast/Toast.tsx";

type ToastItem = {
  id: number;
  type: "success" | "error";
  message: string;
  autoHideDuration?: number;
};

interface ToastContextType {
  showToast: (
    type: "success" | "error",
    message: string,
    autoHideDuration?: number,
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (
    type: "success" | "error",
    message: string,
    autoHideDuration = 5000,
  ) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message, autoHideDuration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            type={t.type}
            message={t.message}
            onClose={() => removeToast(t.id)}
            autoHideDuration={t.autoHideDuration}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
};
