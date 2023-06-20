import { CameraIcon } from "@/assets/CameraIcon.tsx";
import { myAvatar } from "@/assets/myAvatar.ts";
import { Avatar } from "@mantine/core";
import React, { ChangeEvent, useRef } from "react";
import s from "./EditableAvatar.module.scss";

export const EditableAvatar = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    ref.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    // Здесь вы можете выполнить дополнительные действия с выбранным файлом, например, загрузить его на сервер или выполнить другую обработку.

    console.log("Выбранный файл:", selectedFile);
  };

  return (
    <div className={s.container}>
      <Avatar variant="outline" radius="50%" size="xl" src={myAvatar} />
      <input
        type="file"
        ref={ref}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div onClick={handleButtonClick} className={s.icon}>
        <CameraIcon />
      </div>
    </div>
  );
};
