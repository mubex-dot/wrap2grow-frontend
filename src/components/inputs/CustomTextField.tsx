import { type FieldError } from "react-hook-form";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CustomTextFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  errorMessage?: FieldError | undefined;
  className?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  checkPassword?: boolean;
}

const CustomTextField = ({
  label,
  type,
  register,
  placeholder,
  errorMessage,
  className,
  value,
  defaultValue,
  disabled,
  checkPassword,
}: CustomTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${className}`}>
      <label htmlFor={label} className="text-base text-text-primary">
        {label}
      </label>
      <div className="relative w-full my-1">
        <input
          id={label}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue}
          {...register}
          className={`border border-[#E2E8F0] text-text-primary rounded w-full p-4 text-sm h-10 focus:border-primary focus:border-2 focus:outline-none`}
        />
        {checkPassword && (
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            variant={"default"}
            size={"icon"}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent text-primary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        )}
      </div>
      {errorMessage?.message && (
        <p className="text-red-500 text-sm my-1">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default CustomTextField;
