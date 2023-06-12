import React from "react";
import BasicModal from "@/features/modals/BasicModal.tsx";
import { AddNewPack } from "@/features/modals/AddNewPack.tsx";
import { NavLink } from "react-router-dom";

export const PacksHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <NavLink to={"/packs"}>{"<--- Back to Packs List"}</NavLink>
        <h3>Packs List</h3>
      </div>

      <BasicModal buttonTitle={"Add new pack"} title={"Add new pack"}>
        {(close) => <AddNewPack closeModal={close} />}
      </BasicModal>
    </div>
  );
};
