import { EmailLogo } from "@/assets/EmailLogo.tsx";
import s from "@/features/auth/Sign-up/Signup.module.scss";
import { Button, Paper } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CheckEmail = () => {
  const redirect = useNavigate();
  const onClick = () => {
    redirect("/signin");
  };

  return (
    <div className={s.container}>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Check Email</div>
        <EmailLogo />
        <p>We’ve sent an Email with instructions to example@mail.com</p>
        <Button className={s.submitButton} onClick={onClick}>
          Back to sign in
        </Button>
      </Paper>
    </div>
  );
};
