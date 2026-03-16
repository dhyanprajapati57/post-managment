interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
   className?: string;
}

const Button = ({ label, onClick, disabled, type = "button",className = ""  }: ButtonProps) => {
  return (
    <button
      type={type}         // set type here explicitly
      onClick={onClick}
      disabled={disabled}
     className={`px-4 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 ${className}`} //  apply it
    >
      {label}
    </button>
  );
};

export default Button;