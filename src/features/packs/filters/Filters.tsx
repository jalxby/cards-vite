import React, { FC, useCallback } from "react";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import s from "./Filters.module.scss";
import { Search } from "@/features/packs/filters/search/Search.tsx";
import { PacksNumber } from "@/features/packs/filters/packsNumber/PacksNumber.tsx";
import { ButtonGroup } from "@/features/packs/filters/buttonGroup/ButtonGroup.tsx";
import { ClearFilterButton } from "@/features/packs/filters/ClearFilterButton.tsx";

type PropsType = {
  setActivePage: (value: number) => void;
  setPacksPerPage: (value: string) => void;
};

export const Filters: FC<PropsType> = ({ setActivePage, setPacksPerPage }) => {
  return (
    <div className={s.filters}>
      <Search />
      <ButtonGroup />
      <PacksNumber />
      <ClearFilterButton />
    </div>
  );
};
