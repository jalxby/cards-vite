import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectPackTitle } from "@/features/packs/packs.selectors.ts";
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { Button } from "@mantine/core";
import React, { FC } from "react";

type PropsType = {
  pack_id: string;
};
export const DeletePack: FC<PropsType> = ({ pack_id }) => {
  const cardTitle = useAppSelector(selectPackTitle);
  const dispatch = useAppDispatch();
  const deletePack = () => {
    dispatch(packsThunks.deletePack(pack_id));
  };
  return (
    <div>
      {`Do you really want to remove`} <b>{cardTitle(pack_id)}</b>
      {`? All cards will be deleted.`}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={close}
          color={"white"}
          variant="outline"
          sx={{ borderRadius: "30px" }}
        >
          Cancel
        </Button>
        <Button
          variant={"filled"}
          color={"red"}
          onClick={deletePack}
          sx={{ borderRadius: "30px" }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};