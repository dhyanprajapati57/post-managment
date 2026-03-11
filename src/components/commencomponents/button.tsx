interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
}

const Button = ({ label, onClick, disabled, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}       // set type here explicitly
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        margin: "5px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Button;