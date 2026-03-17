import { useEffect } from "react";

// reusable toast notification
function Toast({ type = "success", message, onClose }) {

  // auto close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // base styling - moved lower and bigger
  const baseStyle =
    "fixed top-20 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl text-base z-50 animate-toast";

  const successStyle =
    "bg-green-600 text-white";

  const errorStyle =
    "bg-red-600 text-white";

  return (
    <div
      className={`${baseStyle} ${
        type === "success" ? successStyle : errorStyle
      }`}
    >
      {message}
    </div>
  );
}

export default Toast;