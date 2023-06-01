import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectToken } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Button, Checkbox, Input, Paper, PasswordInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { useFormik } from "formik";
import { Navigate, NavLink } from "react-router-dom";
import s from "./Signin.module.scss";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(authThunks.signIn(values));
    },
  });
  console.log(token);
  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={s.container}>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Sign In</div>
        <form onSubmit={formik.handleSubmit}>
          <Input.Wrapper label="Email">
            <Input {...formik.getFieldProps("email")} />
          </Input.Wrapper>
          <PasswordInput
            label="Password"
            {...formik.getFieldProps("password")}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
          />
          <Checkbox
            label="Remember me"
            {...formik.getFieldProps("rememberMe")}
          />
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
