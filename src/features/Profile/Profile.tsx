import { EditableSpan } from "@/common/EditableSpan.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectTokenDeathTime } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Avatar, Button, Paper } from "@mantine/core";
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import s from "./Profile.module.scss";

export const Profile = () => {
  const email = useAppSelector((state) => state.auth.profile?.email);
  const tokenDeathTime = useAppSelector(selectTokenDeathTime);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(authThunks.signOut());
  };

  if (!tokenDeathTime || tokenDeathTime < Number(new Date())) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className={s.container}>
      <NavLink style={{ display: "block" }} to={"/"}>
        {"<-- Profile"}
      </NavLink>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Personal Information</div>
        <Avatar src="avatar.png" alt="it's me" radius={"md"} />
        <EditableSpan />
        <div>{email}</div>
        <Button onClick={signOut} className={s.submitButton}>
          Sign out
        </Button>
      </Paper>
    </div>
  );
};
