import React, { FC, useCallback } from "react";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import s from "./Filters.module.scss";
import { Search } from "@/features/filters/search/Search.tsx";
import { PacksNumber } from "@/features/filters/packsNumber/PacksNumber.tsx";
import { ButtonGroup } from "@/features/filters/buttonGroup/ButtonGroup.tsx";
import { ClearFilterButton } from "@/features/filters/ClearFilterButton.tsx";

export const Filters = () => {
  return (
    <div className={s.filters}>
      <Search />
      <ButtonGroup />
      <PacksNumber />
      <ClearFilterButton />
    </div>
  );
};
