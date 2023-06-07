import { Pencil } from "@/assets/Pencil.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Input } from "@mantine/core";
import React, { ChangeEvent, useState } from "react";

export const EditableSpan = () => {
  const name = useAppSelector(selectName);
  console.log(name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(name);
  const dispatch = useAppDispatch();

  const onBlur = () => {
    dispatch(authThunks.changeProfile({ name: value }));
    setEditMode(false);
  };
  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  const toggleEditMode = () => {
    setEditMode(true);
    setValue(name);
  };

  return (
    <>
      {editMode ? (
        <Input
          autoFocus={true}
          value={value}
          onChange={changeValue}
          onBlur={onBlur}
        />
      ) : (
        <span onDoubleClick={toggleEditMode}>
          {name}
          <Pencil />
        </span>
      )}
    </>
  );
};
