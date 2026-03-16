import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ type, placeholder, register, error }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full mb-2">
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        autoComplete={isPassword ? "current-password" : "username"}
        {...register}
        className={`w-full p-2 ${
          isPassword ? "pr-10" : ""
        } border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />

      {/* Eye toggle button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {/* Error message */}
      {error && <p className="text-red-600 mt-1 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;