import { CameraIcon } from "@/assets/CameraIcon.tsx";
import { Avatar } from "@mantine/core";
import React from "react";
import s from "./EditableAvatar.module.scss";
import { myAvatar } from "@/assets/myAvatar.ts";

export const EditableAvatar = () => {
  const onClick = () => {
    console.log("edit mode avatar!");
  };
  return (
    <div className={s.container}>
      <Avatar variant="outline" radius="xl" size="lg" src={myAvatar} />
      <div onClick={onClick} className={s.icon}>
        <CameraIcon />
      </div>
    </div>
  );
};
