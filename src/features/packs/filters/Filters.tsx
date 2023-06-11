import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Input, Paper, RangeSlider } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectIsLoading } from "@/app/app.selectors.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import s from "./Filters.module.scss";

type PropsType = {
  setActivePage: (value: number) => void;
  setPacksPerPage: (value: string) => void;
};

export const Filters: FC<PropsType> = ({ setActivePage, setPacksPerPage }) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [search, setSearch] = useState<string>("");
  const [myPacks, setMyPacks] = useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const myUserId = useAppSelector(selectMyUserId);
  const dispatch = useAppDispatch();

  const clearAllFilters = useCallback(() => {
    dispatch(packsActions.clearQueryParams());
    setActivePage(1);
    setPacksPerPage("5");
    setRangeValue([0, 100]);
    setSearch("");
    setMyPacks(false);
  }, []);

  const toggleMyPacks = useCallback((isMy: boolean) => {
    setMyPacks(isMy);
    dispatch(
      packsActions.setQueryParams({
        params: { user_id: isMy ? myUserId : "" },
      })
    );
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        packsActions.setQueryParams({
          params: {
            packName: search,
            min: rangeValue[0],
            max: rangeValue[1],
          },
        })
      );
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, rangeValue]);

  return (
    <div className={s.filters}>
      <Input.Wrapper label="Search">
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          icon={<IconSearch />}
          placeholder={"provide yours text"}
        />
      </Input.Wrapper>
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

      <Input.Wrapper label="Number of cards">
        <div className={s.slider}>
          <Input
            className={s.numberInput}
            value={rangeValue[0]}
            onChange={(e) => setRangeValue([+e, rangeValue[1]])}
          />
          <RangeSlider
            className={s.rangeSlider}
            thumbSize={14}
            label={null}
            value={rangeValue}
            onChange={setRangeValue}
          />
          <Input
            className={s.numberInput}
            value={rangeValue[1]}
            onChange={(e) => setRangeValue([rangeValue[0], +e])}
          />
        </div>
      </Input.Wrapper>
      <Paper
        className={s.clearFilters}
        onClick={clearAllFilters}
        shadow="xs"
        radius="xs"
      >
        <FilterLogo />
      </Paper>
    </div>
  );
};
