import React, { useEffect, useState } from "react";
import s from "@/features/packs/filters/Filters.module.scss";
import { Input, RangeSlider } from "@mantine/core";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectRangeMinMaxCards } from "@/features/packs/packs.selectors.ts";

export const PacksNumber = () => {
  const minMaxCardsRange = useAppSelector(selectRangeMinMaxCards);
  const [rangeValue, setRangeValue] =
    useState<[number, number]>(minMaxCardsRange);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        packsActions.setQueryParams({
          params: {
            min: rangeValue[0],
            max: rangeValue[1],
          },
        })
      );
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [rangeValue]);
  return (
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
  );
};
