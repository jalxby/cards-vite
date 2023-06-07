import { DeleteLogo } from "@/assets/DeleteLogo.tsx";
import { EditLogo } from "@/assets/EditLogo.tsx";
import { TeacherLogo } from "@/assets/TeacherLogo.tsx";
import React from "react";

export const AllowedActs = () => {
  return (
    <div style={{ display: "flex" }}>
      <TeacherLogo />
      <EditLogo />
      <DeleteLogo />
    </div>
  );
};
