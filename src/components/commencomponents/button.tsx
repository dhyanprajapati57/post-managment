interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled,...props }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        margin: "5px",
        cursor: "pointer",
      }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;