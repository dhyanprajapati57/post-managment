interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: Props) => {
  return (
    <button
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