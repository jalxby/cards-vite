import BasicModal from "@/features/modals/BasicModal";
import { AddNewPack } from "@/features/modals/packs/AddNewPack";
import React, { FC, ReactNode } from "react";

type PropsType = {
  title: string;
};
export const TitleButton: FC<PropsType> = ({ title }) => {
  return (
    <BasicModal buttonTitle={title} modalTitle={title}>
      {(close) => <AddNewPack closeModal={close} />}
    </BasicModal>
  );
};
