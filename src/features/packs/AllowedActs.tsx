import { DeleteLogo } from "@/assets/DeleteLogo.tsx";
import { EditLogo } from "@/assets/EditLogo.tsx";
import { TeacherLogo } from "@/assets/TeacherLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import React, { FC } from "react";

type PropsType = {
  user_id: string;
};
export const AllowedActs: FC<PropsType> = ({ user_id }) => {
  const myUserId = useAppSelector(selectMyUserId);
  return (
    <div style={{ display: "flex" }}>
      <TeacherLogo />
      {user_id === myUserId && (
        <div>
          <EditLogo />
          <DeleteLogo />
        </div>
      )}
    </div>
  );
};
