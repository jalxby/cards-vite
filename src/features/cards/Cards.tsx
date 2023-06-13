import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { cardsThunks } from "@/features/cards/cards.slice.ts";
import { PageHeader } from "@/common/PageHeader.tsx";
import { Search } from "@/features/filters/search/Search.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";
import { CardsTable } from "@/features/cards/cardsTable/cardsTable.tsx";
import { selectIsMyPackSelected } from "@/features/cards/cards.selectors.ts";

const Cards = () => {
  const packName = useAppSelector((state) => state.cards.cardsData.packName);
  const selectedIsMyPack = useAppSelector(selectIsMyPackSelected);
  const buttonTitle = selectedIsMyPack ? "Add new card" : "Learn to pack";
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsThunks.getCards());
  }, []);
  return (
    <div>
      <PageHeader addButtonTitle={buttonTitle} title={packName} />
      <Search />
      <CardsTable />
      <UniversalPagination />
    </div>
  );
};

export default Cards;
