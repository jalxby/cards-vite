import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import s from "@/features/filters/Filters.module.scss";
import { Paper } from "@mantine/core";
import React, { FC } from "react";

type PropsType = {
  clearAllFilters: () => void;
};
export const ClearFilterButton: FC<PropsType> = ({ clearAllFilters }) => {
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
