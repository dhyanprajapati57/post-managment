import { useDispatch } from "react-redux";
import { login } from "../redux/authslice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../components/commencomponents/inputfaild";
import { Button } from "../components/ui/button";

import { loginSchema, type LoginForm } from "../utils/schemas/loginschema";
import axiosInstance from "../services/axios.publicapi";

import "../assets/Login.css";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {

    try {

      const res = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password
      });

      const token = res.data.accessToken;

      // store in localStorage
      localStorage.setItem("authUser", res.data.username);
      localStorage.setItem("token", token);

      // redux store
      dispatch(
        login({
          user: res.data.username,
          token
        })
      );

      navigate("/");

    } catch (error) {

      console.error("Login error:", error);
      alert("Invalid username or password");

    }

  };

  return (
    <div className="login-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">

        <InputField
          type="text"
          placeholder="Username"
          register={register("username")}
          error={errors.username}
        />

        <InputField
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password}
        />

        <Button type="submit">Login</Button>

      </form>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>

    </div>
  );
};

export default Login;