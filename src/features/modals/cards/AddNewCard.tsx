import { useAppDispatch } from "@/common/hooks/hooks";
import { Button, Checkbox, Input, Select } from "@mantine/core";
import React, { ChangeEvent, FC, useState } from "react";

type PropsType = {
  closeModal: () => void;
};

const inputData = [{ value: "1", label: "Text" }];
export const AddNewCard: FC<PropsType> = ({ closeModal }) => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
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
      <Select label={"Choose a question format"} data={inputData} value="1" />
      <Input.Wrapper label="Name Pack">
        <Input value={input} onChange={onChangeInput} placeholder="Name Pack" />
      </Input.Wrapper>
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
        <Button>Save</Button>
      </div>
    </div>
  );
};
