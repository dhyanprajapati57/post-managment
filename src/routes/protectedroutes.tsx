import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
//Props for ProtectedRoute
interface Props {
  children: ReactNode;

//   children: JSX.Element;

}

const ProtectedRoute = ({ children }: Props) => {
  //access token
  const { token } = useSelector((state: RootState) => state.auth);
  //autenticated direct loading
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  //if autenticated so access a achild compo
  return <>{children}</>;
};

export default ProtectedRoute;