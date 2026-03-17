import { useDispatch } from "react-redux";
import { login } from "../redux/authslice";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../components/commen/inputfaild";
import { Button } from "../components/ui/button";

import { loginSchema, type LoginForm } from "../utils/schemas/loginschema";
import axiosInstance from "../services/axios";
import { toast } from "react-toastify";

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
      // Send login request to API
      const res = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      console.log(res.data);

      // Optional chaining to safely access API response
      const token = res?.data?.accessToken;
      const user = {
        id: res?.data?.id, // safe access
        name: `${res?.data?.firstName ?? ""} ${res?.data?.lastName ?? ""}`,
        email: res?.data?.email,
        username: res?.data?.username,
        gender: res?.data?.gender,
        image: res?.data?.image,
        role: "User",
      };

      // Save to localStorage safely
      if (user?.id && token) {
        localStorage.setItem("authuser", JSON.stringify(user));
        localStorage.setItem("token", token);

        // Save in Redux store
        dispatch(login({ user, token }));
        navigate("/");
      } else {
        toast.error("Invalid login response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl text-gray-800 mb-4 font-semibold">Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-80 p-6 bg-white rounded-xl shadow-md"
      >
        <InputField
          type="text"
          placeholder="Username"
          register={register("username")}
          error={errors?.username} // optional chaining
        />

        <InputField
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors?.password} // optional chaining
        />

        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Login
        </Button>
      </form>

      <p className="mt-3 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;