import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface Props {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ type, placeholder, register, error }: Props) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="input-field"
      />
      {error && <span className="input-error">{error.message}</span>}
    </div>
  );
};

export default InputField;