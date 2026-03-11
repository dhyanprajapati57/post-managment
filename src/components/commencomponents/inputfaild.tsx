import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ type, placeholder, register, error }: Props) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={type === "password" ? "current-password" : "username"}
        {...register}
      />

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default InputField;