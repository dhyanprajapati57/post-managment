import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface BaseProps {
  type: string;
  placeholder: string;
  error?: string | FieldError;
  isTextarea?: boolean;
}

// Props for React Hook Form usage
interface RHFProps extends BaseProps {
  register: UseFormRegisterReturn;
  value?: never;
  onChange?: never;
}

// Props for useState usage
interface StateProps extends BaseProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register?: never;
}

type Props = RHFProps | StateProps;

const InputField = ({
  type,
  placeholder,
  error,
  isTextarea,
  register,
  value,
  onChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Decide which props to spread: register OR value/onChange
  const inputProps = register ? { ...register } : { value, onChange };

  if (isTextarea) {
    return (
      <div className="relative w-full mb-2">
        <textarea
          placeholder={placeholder}
          {...inputProps}
          rows={6}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-red-600 mt-1 text-sm">
            {typeof error === "string" ? error : error?.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full mb-2">
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        {...inputProps}
        className={`w-full p-2 ${isPassword ? "pr-10" : ""} border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && (
        <p className="text-red-600 mt-1 text-sm">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;