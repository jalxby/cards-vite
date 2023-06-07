import { CameraIcon } from "@/assets/CameraIcon.tsx";
import { Avatar } from "@nextui-org/react";
import React from "react";
import s from "./EditableAvatar.module.scss";

export const EditableAvatar = () => {
  const onClick = () => {
    console.log("edit mode avatar!");
  };
  return (
    <div className={s.container}>
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        css={{ size: "$20", zIndex: 0 }}
      />
      <div onClick={onClick} className={s.icon}>
        <CameraIcon />
      </div>
    </div>
  );
};
