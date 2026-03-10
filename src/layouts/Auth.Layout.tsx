import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {

  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthLayout;