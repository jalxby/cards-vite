import { DeleteLogo } from "@/assets/DeleteLogo.tsx";
import { EditLogo } from "@/assets/EditLogo.tsx";
import { TeacherLogo } from "@/assets/TeacherLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import { DeletePack } from "@/features/modals/DeletePack.tsx";
import { UpdatePack } from "@/features/modals/UpdatePack.tsx";
import React, { FC } from "react";
import BasicModal from "@/features/modals/BasicModal.tsx";

type PropsType = {
  user_id: string;
  pack_id: string;
};
export const AllowedActs: FC<PropsType> = ({ user_id, pack_id }) => {
  const myUserId = useAppSelector(selectMyUserId);

  return (
    <span style={{ display: "flex" }}>
      <TeacherLogo />
      {user_id === myUserId && (
        <div>
          <BasicModal title={"Edit Pack"} childrenButtonIcon={<EditLogo />}>
            <UpdatePack pack_id={pack_id} />
          </BasicModal>
          <BasicModal title={"Delete Pack"} childrenButtonIcon={<DeleteLogo />}>
            <DeletePack pack_id={pack_id} />
          </BasicModal>
        </div>
      )}
    </span>
  );
};
