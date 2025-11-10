import toastSuccess from "@/assets/icons/toast-success.svg";
import toastError from "@/assets/icons/toast-error.svg";

type ToastProps = {
  open: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ open, message, type, onClose }: ToastProps) => {
  if (!open) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-md shadow-lg text-white ${
        type === "success" ? "bg-[#4AC000]" : "bg-[#E72B2B]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex gap-2 items-center">
          {type === "error" ? (
            <img src={toastError} alt="error" />
          ) : (
            <img src={toastSuccess} alt="success" />
          )}
          {message}
        </span>
        <button
          className="ml-4 text-white hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
