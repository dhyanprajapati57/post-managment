import { useDispatch } from "react-redux";
import { signup } from "../redux/authslice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../components/commencomponents/inputfaild";
import Button from "../components/commencomponents/button";

import { signupSchema, type SignupForm } from "../utils/schemas/signupSchema";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {

    localStorage.setItem("signupUser", JSON.stringify(data));

    dispatch(
      signup({
        user: data.email
      })
    );

    navigate("/login");
  };

  return (
    <div>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

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

        <Button label="Signup" />

      </form>

    </div>
  );
};

export default Signup;