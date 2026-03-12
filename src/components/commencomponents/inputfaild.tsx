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
    <div style={{ marginBottom: "10px", position: "relative", width: "100%" }}>
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        autoComplete={isPassword ? "current-password" : "username"}
        {...register}
        style={{
          width: "100%",
          padding: isPassword ? "8px 40px 8px 8px" : "8px", // leave space for eye icon
          border: "1px solid #ccc",
          borderRadius: "4px",
           boxSizing: "border-box",
            fontSize: "14px",
        }}
      />

      {/* Eye toggle button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
           {showPassword ? (
            <EyeOff size={20} color="black" />
          ) : (
            <Eye size={20} color="black" />
          )}
        </button>
      )}

      {/* Error message */}
      {error && <p style={{ color: "red", marginTop: "4px" }}>{error.message}</p>}
    </div>
  );
};

export default InputField;