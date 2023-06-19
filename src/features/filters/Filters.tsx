import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { ButtonGroup } from "@/features/filters/buttonGroup/ButtonGroup.tsx";
import { ClearFilterButton } from "@/features/filters/ClearFilterButton.tsx";
import { PacksNumber } from "@/features/filters/packsNumber/PacksNumber.tsx";
import { Search } from "@/features/filters/search/Search.tsx";
import { selectRangeMinMaxCards } from "@/features/packs/packs.selectors";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Filters.module.scss";

export const Filters = () => {
  const range = useAppSelector(selectRangeMinMaxCards);
  const [rangeValue, setRangeValue] = useState<[number, number]>(range);
  const dispatch = useAppDispatch();
  const debouncedSearchCallback = useCallback((search: string) => {
    dispatch(packsActions.setQueryParams({ params: { packName: search } }));
    dispatch(packsThunks.getPacks());
  }, []);

  const clearAllFilters = useCallback(() => {
    dispatch(packsActions.clearQueryParams());
    dispatch(packsThunks.getPacks());
  }, []);

  useEffect(() => {
    setRangeValue(range);
  }, [range]);

  return (
    <div className={s.filters}>
      <Search debouncedSearchCallback={debouncedSearchCallback} />
      <ButtonGroup />
      <PacksNumber rangeValue={rangeValue} setRangeValue={setRangeValue} />
      <ClearFilterButton clearAllFilters={clearAllFilters} />
    </div>
  );
};
