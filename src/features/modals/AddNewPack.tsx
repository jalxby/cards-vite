import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { Button, Checkbox, Input } from "@mantine/core";
import React, { ChangeEvent, FC, useState } from "react";

type PropsType = {
  closeModal: () => void;
};

export const AddNewPack: FC<PropsType> = ({ closeModal }) => {
  const [input, setInput] = useState<string>("");
  const [prvt, setPrvt] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };
  const togglePrvt = (e: ChangeEvent<HTMLInputElement>) => {
    setPrvt(e.currentTarget.checked);
  };
  const addNewPack = () => {
    dispatch(packsThunks.createPack({ name: input, private: prvt }));
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
        <Button onClick={closeModal} color={"white"} variant="outline">
          Cancel
        </Button>
        <Button onClick={addNewPack}>Save</Button>
      </div>
    </div>
  );
};
