import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import s from "@/features/auth/Sign-up/Signup.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, PasswordInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
type FormData = yup.InferType<typeof schema>;

export const CreateNewPassword = () => {
  const params = useParams<{ token: string }>();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { password } = data;
    if (params.token) {
      dispatch(
        authThunks.setNewPass({ password, resetPasswordToken: params.token })
      );
    }
  };

  return (
    <div className={s.container}>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <p className={s.title} style={{ whiteSpace: "nowrap" }}>
          Create new password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            label="Password"
            {...register("password")}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
          />
          <p>
            Create new password and we will send you further instructions to
            email
          </p>
          <Button className={s.submitButton} type={"submit"}>
            Create new password
          </Button>
        </form>
      </Paper>
    </div>
  );
};
