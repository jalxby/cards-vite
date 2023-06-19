import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import s from "@/features/filters/Filters.module.scss";
import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectRangeMinMaxCards,
} from "@/features/packs/packs.selectors.ts";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { Input, RangeSlider } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type PropsType = {
  setRangeValue: (value: [number, number]) => void;
  rangeValue: [number, number];
};

export const PacksNumber: FC<PropsType> = ({ setRangeValue, rangeValue }) => {
  const dispatch = useAppDispatch();
  const debouncedDispatch = useDebouncedCallback((min: number, max: number) => {
    dispatch(
      packsActions.setQueryParams({
        params: {
          min,
          max,
        },
      })
    );
    dispatch(packsThunks.getPacks());
  }, 800);

  const handleRangeValueChange = (value: [number, number]) => {
    setRangeValue(value);
    debouncedDispatch(value[0], value[1]);
  };

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
          onChange={handleRangeValueChange}
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
