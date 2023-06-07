import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Input, Paper, PasswordInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import s from "./Signin.module.scss";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .test("valid-email", "Please enter a valid email", function (value) {
      if (value) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
      }
      return true;
    }),
  password: yup.string().required("Please enter a password"),
  rememberMe: yup.boolean().default(false),
});
type FormData = yup.InferType<typeof schema>;

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(authThunks.signIn(data))
      .unwrap()
      .then(() => {
        navigate("/packs");
      })
      .catch((error) => {
        toast(error);
      });
  };

  return (
    <div className={s.container}>
      <div>
        <NavLink to={"/packs"}>packs</NavLink>
      </div>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Sign In</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Email">
            <Input {...register("email")} />
            {touchedFields.email && errors.email?.message}
          </Input.Wrapper>
          <PasswordInput
            label="Password"
            {...register("password")}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
          />

          {touchedFields.email && errors.password?.message}
          <Checkbox label="Remember me" {...register("rememberMe")} />
          <NavLink style={{ display: "block" }} to={"/forgotpassword"}>
            Forgot Password?
          </NavLink>
          <Button className={s.submitButton} type={"submit"}>
            Sign in
          </Button>
        </form>
        <p>Don't have an account?</p>
        <NavLink style={{ display: "block" }} to={"/signup"}>
          Sign Up
        </NavLink>
      </Paper>
    </div>
  );
};
