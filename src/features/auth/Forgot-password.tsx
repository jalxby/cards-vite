import { emailContent } from "@/common/emailContent.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import s from "@/features/auth/Sign-up/Signup.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Paper } from "@mantine/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
});
type FormData = yup.InferType<typeof schema>;
export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    await dispatch(authThunks.newPassRequest({ email, message: emailContent }));
    redirect("/checkEmail");
  };

  return (
    <div className={s.container}>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <p className={s.title} style={{ whiteSpace: "nowrap" }}>
          Forgot your password?
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Email">
            <Input {...register("email")} />
          </Input.Wrapper>
          <p>
            Enter your email address and we will send you further instructions
          </p>
          <Button className={s.submitButton} type={"submit"}>
            Send instructions
          </Button>
        </form>
        <p>Did you remember your password?</p>
        <NavLink style={{ display: "block" }} to={"/signin"}>
          Try logging in
        </NavLink>
      </Paper>
    </div>
  );
};
// href={
//     ${import.meta.env.DEV}
//     ? ${import.meta.env.VITE_DEV_URL} + "/$token$"
//     : ${import.meta.env.VITE_PROD_URL} + "/$token$"
// }
