interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;