import React from "react";
import BasicModal from "@/features/modals/BasicModal.tsx";
import { AddNewPack } from "@/features/modals/AddNewPack.tsx";

export const PacksHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Packs List</h3>
      <BasicModal buttonTitle={"Add new pack"} title={"Add new pack"}>
        {(close) => <AddNewPack closeModal={close} />}
      </BasicModal>
    </div>
  );
};
