import { Checkbox, Input } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";

export const AddNewPack = () => {
  const [input, setInput] = useState<string>("");
  const [prvt, setPrvt] = useState<boolean>(false);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };
  const togglePrvt = (e: ChangeEvent<HTMLInputElement>) => {
    setPrvt(e.currentTarget.checked);
  };
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 30,
      }}
    >
      <Input.Wrapper label="Name Pack">
        <Input value={input} onChange={onChangeInput} placeholder="Name Pack" />
      </Input.Wrapper>
      <Checkbox onChange={togglePrvt} checked={prvt} label={"Private pack"} />
    </div>
  );
};
