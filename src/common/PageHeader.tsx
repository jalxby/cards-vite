import { BackArrowIcon } from "@/assets/BackArrowIcon";
import { AddNewPack } from "@/features/modals/AddNewPack.tsx";
import BasicModal from "@/features/modals/BasicModal.tsx";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  addButtonTitle: string;
  title: string;
};

export const PageHeader: FC<PropsType> = ({ title, addButtonTitle }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <BackArrowIcon />
          {" Back to Packs List"}
        </div>
        <h3>{title}</h3>
      </div>

      <BasicModal buttonTitle={addButtonTitle} title={addButtonTitle}>
        {(close) => <AddNewPack closeModal={close} />}
      </BasicModal>
    </div>
  );
};
