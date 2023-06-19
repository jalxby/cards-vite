import { EditableAvatar } from "@/common/components/editableAvatar/Avatar.tsx";
import { EditableSpan } from "@/common/EditableSpan.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectEmail } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Button, Paper } from "@mantine/core";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Profile.module.scss";

export const Profile = () => {
  const email = useAppSelector(selectEmail);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // @TODO change signOut signature
  const signOut = () => {
    dispatch(authThunks.signOut())
      .unwrap()
      .then(() => {
        navigate("/signin");
      });
  };

  return (
    <div className={s.container}>
      <NavLink style={{ display: "block" }} to={"/"}>
        {"<-- Profile"}
      </NavLink>
      <Paper className={s.paper} shadow="xs" radius="xs" p="sm">
        <div className={s.title}>Personal Information</div>
        <EditableAvatar />
        <EditableSpan />
        <div>{email}</div>
        <Button onClick={signOut} className={s.submitButton}>
          Sign out
        </Button>
      </Paper>
    </div>
  );
};
