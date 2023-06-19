import { selectIsLoading } from "@/app/app.selectors";
import { DeleteLogo } from "@/assets/DeleteLogo.tsx";
import { EditLogo } from "@/assets/EditLogo.tsx";
import { TeacherLogo } from "@/assets/TeacherLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import BasicModal from "@/features/modals/BasicModal.tsx";
import { DeletePack } from "@/features/modals/DeletePack.tsx";
import { UpdatePack } from "@/features/modals/UpdatePack.tsx";
import { Skeleton } from "@mantine/core";
import React, { FC } from "react";

type PropsType = {
  user_id: string;
  pack_id: string;
};
export const AllowedActs: FC<PropsType> = ({ user_id, pack_id }) => {
  const myUserId = useAppSelector(selectMyUserId);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <Skeleton visible={isLoading}>
      <span style={{ display: "flex" }}>
        <TeacherLogo />
        {user_id === myUserId && (
          <div>
            <BasicModal title={"Edit Pack"} childrenButtonIcon={<EditLogo />}>
              {(close) => <UpdatePack pack_id={pack_id} closeModal={close} />}
            </BasicModal>
            <BasicModal
              title={"Delete Pack"}
              childrenButtonIcon={<DeleteLogo />}
            >
              {(close) => <DeletePack pack_id={pack_id} closeModal={close} />}
            </BasicModal>
          </div>
        )}
      </span>
    </Skeleton>
  );
};
