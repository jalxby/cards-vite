import { useAppDispatch } from "@/common/hooks/hooks";
import { authThunks } from "@/features/auth/auth.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Paper, PasswordInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ref } from "yup";
import s from "./Signup.module.scss";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required("Please enter a password"),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
});
type FormData = yup.InferType<typeof schema>;
export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    dispatch(authThunks.signUp({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/signin");
      });
  };

  return (
    <div className={s.container}>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Sign Up</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Email">
            <Input {...register("email")} />
          </Input.Wrapper>
          <PasswordInput
            label="Password"
            {...register("password")}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
          />
          <PasswordInput
            label="ConfirmPassword"
            {...register("confirmPassword")}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
          />
          <NavLink style={{ display: "block" }} to={"/forgotpassword"}>
            Forgot Password?
          </NavLink>
          <Button className={s.submitButton} type={"submit"}>
            Sign Up
          </Button>
        </form>
        <p>Already have an account?</p>
        <NavLink style={{ display: "block" }} to={"/signin"}>
          Sign In
        </NavLink>
      </Paper>
    </div>
  );
};
