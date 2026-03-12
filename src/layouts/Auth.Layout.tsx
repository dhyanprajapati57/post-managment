import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
//children means whatever component is inside AuthLayout.
  const { token } = useSelector((state: RootState) => state.auth);
  //redux store->auth->token
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
  //Show the protected page
};

export default AuthLayout;