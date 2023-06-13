import React, { useCallback, useState } from "react";
import { Button, Input } from "@mantine/core";
import s from "@/features/filters/Filters.module.scss";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectIsLoading } from "@/app/app.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import { selectIsMyPacksSelected } from "@/features/packs/packs.selectors.ts";

export const ButtonGroup = () => {
  const isMyPacks = useAppSelector(selectIsMyPacksSelected);
  const isLoading = useAppSelector(selectIsLoading);
  const myUserId = useAppSelector(selectMyUserId);
  const dispatch = useAppDispatch();
  const toggleMyPacks = (isMy: boolean) => {
    dispatch(
      packsActions.setQueryParams({
        params: { user_id: isMy ? myUserId : "" },
      })
    );
  };
  return (
    <Input.Wrapper label="Show packs cards">
      <Button.Group className={s.buttonGroup}>
        <Button
          disabled={isLoading}
          onClick={() => toggleMyPacks(true)}
          variant={isMyPacks ? "filled" : "outline"}
        >
          My
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => toggleMyPacks(false)}
          variant={!isMyPacks ? "filled" : "outline"}
        >
          All
        </Button>
      </Button.Group>
    </Input.Wrapper>
  );
};
