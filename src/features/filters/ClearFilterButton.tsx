import React, { useCallback } from "react";
import { Paper } from "@mantine/core";
import s from "@/features/filters/Filters.module.scss";
import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";

export const ClearFilterButton = () => {
  const dispatch = useAppDispatch();
  const clearAllFilters = useCallback(() => {
    dispatch(packsActions.clearQueryParams());
  }, []);
  return (
    <Paper
      className={s.clearFilters}
      onClick={clearAllFilters}
      shadow="xs"
      radius="xs"
    >
      <FilterLogo />
    </Paper>
  );
};
