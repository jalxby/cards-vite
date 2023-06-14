import React from "react";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { PageHeader } from "@/common/PageHeader.tsx";
import { Search } from "@/features/filters/search/Search.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";
import { CardsTable } from "@/features/cards/cardsTable/CardsTable.tsx";
import {
  selectIsMyPackSelected,
  selectPackName,
} from "@/features/cards/cards.selectors.ts";
import { selectIsLoading } from "@/app/app.selectors.ts";

const Cards = () => {
  const selectedIsMyPack = useAppSelector(selectIsMyPackSelected);
  const packName = useAppSelector(selectPackName);
  const isLoading = useAppSelector(selectIsLoading);
  const buttonTitle = selectedIsMyPack ? "Add new card" : "Learn to pack";

  return (
    <div>
      <PageHeader addButtonTitle={buttonTitle} title={packName} />
      <Search />
      {!isLoading && (
        <>
          <CardsTable />
          <UniversalPagination />
        </>
      )}
    </div>
  );
};

export default Cards;
