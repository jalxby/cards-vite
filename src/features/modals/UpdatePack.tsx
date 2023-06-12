import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import {
  selectIsPrivate,
  selectPackTitle,
} from "@/features/packs/packs.selectors.ts";
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { Button, Checkbox, Input } from "@mantine/core";
import React, { ChangeEvent, FC, useState } from "react";

type PropsType = {
  pack_id: string;
  closeModal: () => void;
};
export const UpdatePack: FC<PropsType> = ({ pack_id, closeModal }) => {
  const dispatch = useAppDispatch();
  const cardTitle = useAppSelector(selectPackTitle);
  const isPrivate = useAppSelector(selectIsPrivate);
  const [input, setInput] = useState<string>(cardTitle(pack_id));
  const [prvt, setPrvt] = useState<boolean>(isPrivate(pack_id));

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };
  const togglePrvt = (e: ChangeEvent<HTMLInputElement>) => {
    setPrvt(e.currentTarget.checked);
  };
  const updatePack = () => {
    dispatch(packsThunks.updatePack({ _id: pack_id, name: input }));
    closeModal();
  };

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 30,
      }}
    >
      <Input.Wrapper label="Name Pack">
        <Input value={input} onChange={onChangeInput} placeholder="Name Pack" />
      </Input.Wrapper>
      <Checkbox onChange={togglePrvt} checked={prvt} label={"Private pack"} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={closeModal}
          color={"white"}
          variant="outline"
          sx={{ borderRadius: "30px" }}
        >
          Cancel
        </Button>
        <Button onClick={updatePack} sx={{ borderRadius: "30px" }}>
          Save
        </Button>
      </div>
    </div>
  );
};
