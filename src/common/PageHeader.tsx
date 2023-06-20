import { PageTitle } from "@/common/pageHeader/PageTitle";
import BasicModal from "@/features/modals/BasicModal.tsx";
import { AddNewPack } from "@/features/modals/packs/AddNewPack.tsx";
import React, { FC, ReactNode } from "react";

type PropsType = {
  pageTitle: string;
  buttonTitle: string;
  modalTitle: string;
  modalType: (close: () => void) => ReactNode;
};

export const PageHeader: FC<PropsType> = ({
  pageTitle,
  modalTitle,
  buttonTitle,
  modalType,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <PageTitle title={pageTitle} />
      <BasicModal buttonTitle={buttonTitle} modalTitle={modalTitle}>
        {modalType}
      </BasicModal>
    </div>
  );
};
