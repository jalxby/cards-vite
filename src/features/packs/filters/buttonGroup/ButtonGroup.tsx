import React, { useCallback, useState } from "react";
import { Button, Input } from "@mantine/core";
import s from "@/features/packs/filters/Filters.module.scss";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectIsLoading } from "@/app/app.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";

export const ButtonGroup = () => {
  const [myPacks, setMyPacks] = useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const myUserId = useAppSelector(selectMyUserId);
  const dispatch = useAppDispatch();
  const toggleMyPacks = useCallback((isMy: boolean) => {
    setMyPacks(isMy);
    dispatch(
      packsActions.setQueryParams({
        params: { user_id: isMy ? myUserId : "" },
      })
    );
  }, []);
  return (
    <Input.Wrapper label="Show packs cards">
      <Button.Group className={s.buttonGroup}>
        <Button
          disabled={isLoading}
          onClick={() => toggleMyPacks(true)}
          variant={myPacks ? "filled" : "outline"}
        >
          My
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => toggleMyPacks(false)}
          variant={!myPacks ? "filled" : "outline"}
        >
          All
        </Button>
      </Button.Group>
    </Input.Wrapper>
  );
};
