import { Pencil } from "@/assets/Pencil.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Input } from "@mantine/core";
import React, { useState } from "react";

export const EditableSpan = () => {
  const name = useAppSelector((state) => state.auth.profile?.name);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(name);
  const dispatch = useAppDispatch();

  const onBlur = () => {
    dispatch(authThunks.changeProfile({ name: value }));
    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={onBlur}
        />
      ) : (
        <span onDoubleClick={() => setEditMode(true)}>
          {name}
          <Pencil />
        </span>
      )}
    </>
  );
};
