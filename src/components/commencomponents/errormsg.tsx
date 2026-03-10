interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {

  return (
    <div style={{ color: "red", padding: "10px" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;