import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { Button, Checkbox, Input } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";

export const AddNewPack = () => {
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
    close();
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
          onClick={close}
          color={"white"}
          variant="outline"
          sx={{ borderRadius: "30px" }}
        >
          Cancel
        </Button>
        <Button onClick={addNewPack} sx={{ borderRadius: "30px" }}>
          Save
        </Button>
      </div>
    </div>
  );
};