import { CameraIcon } from "@/assets/CameraIcon.tsx";
import { myAvatar } from "@/assets/myAvatar.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks";
import { authThunks } from "@/features/auth/auth.slice";
import { Avatar } from "@mantine/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import s from "./EditableAvatar.module.scss";

export const EditableAvatar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.auth.profile?.avatar);

  const handleButtonClick = () => {
    ref.current?.click();
  };

  const [base64Image, setBase64Image] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
      console.log();
    }
  };

  useEffect(() => {
    dispatch(authThunks.changeProfile({ avatar: base64Image }));
  }, [base64Image]);

  return (
    <div className={s.container}>
      <Avatar variant="outline" radius="50%" size="xl" src={avatar} />
      <input
        type="file"
        ref={ref}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div onClick={handleButtonClick} className={s.icon}>
        <CameraIcon />
      </div>
    </div>
  );
};
