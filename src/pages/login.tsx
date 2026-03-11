import { useDispatch } from "react-redux";
import { login } from "../redux/authslice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../components/commencomponents/inputfaild";
import { Button } from "../components/ui/button";

import { loginSchema, type LoginForm } from "../utils/schemas/loginschema";
import "../assets/Login.css"; // import CSS

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

  const onSubmit = (data: LoginForm) => {
    const storedUser = localStorage.getItem("signupUser");
    if (!storedUser) {
      alert("Please signup first");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === data.email && user.password === data.password) {
      const token = btoa(`${data.email}:${Date.now()}`);
      localStorage.setItem("authUser", data.email);
      localStorage.setItem("token", token);

      dispatch(
        login({
          user: data.email,
          token
        })
      );

      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <InputField
          type="email"
          placeholder="Email"
          register={register("email")}
          error={errors.email}
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