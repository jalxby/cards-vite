import React, { FC } from "react";
import BasicModal from "@/features/modals/BasicModal.tsx";
import { AddNewPack } from "@/features/modals/AddNewPack.tsx";
import { NavLink, useNavigate } from "react-router-dom";

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
        <h4 onClick={() => navigate(-1)}>{"<--- Back to Packs List"}</h4>
        <h3>{title}</h3>
      </div>

      <BasicModal buttonTitle={addButtonTitle} title={addButtonTitle}>
        {(close) => <AddNewPack closeModal={close} />}
      </BasicModal>
    </div>
  );
};
