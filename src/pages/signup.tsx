import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import InputField from "../components/commen/inputfaild";
import Button from "../components/commen/button";

import { signupSchema, type SignupForm } from "../utils/schemas/signupSchema";

const Signup = () => {
  const navigate = useNavigate();
  //react hook fromwith zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {
    // Save signup user in localStorage
    localStorage.setItem("signupUser", JSON.stringify(data));

    toast.success("Signup successful! Please login");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Signup
        </h2>

        <InputField
          type="text"
          placeholder="Username"
          register={register("username")}
          error={errors.username}
        />

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

        <Button type="submit" label="Signup" />
      </form>
    </div>
  );
};

export default Signup;