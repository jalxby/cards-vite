import { selectIsLoading } from "@/app/app.selectors.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { PageHeader } from "@/common/PageHeader.tsx";
import {
  selectActivePage,
  selectCardsPageCount,
  selectIsMyPackSelected,
  selectItemsPerPageData,
  selectPackName,
  selectTotalPages,
} from "@/features/cards/cards.selectors.ts";
import { cardsActions, cardsThunks } from "@/features/cards/cards.slice";
import { CardsTable } from "@/features/cards/cardsTable/CardsTable.tsx";
import { Search } from "@/features/filters/search/Search.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./Cards.module.scss";

const Cards = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { packId } = useParams();
  const id = packId || "";
  const selectedIsMyPack = useAppSelector(selectIsMyPackSelected);
  const packName = useAppSelector(selectPackName);
  const isLoading = useAppSelector(selectIsLoading);
  const totalPages = useAppSelector(selectTotalPages);
  const itemsPerPage = useAppSelector(selectCardsPageCount);
  const activePage = useAppSelector(selectActivePage);
  const itemsPerPageList = useAppSelector(selectItemsPerPageData);
  const buttonTitle = selectedIsMyPack ? "Add new card" : "Learn to pack";

  const debouncedSearchCallback = useCallback((search: string) => {
    dispatch(
      cardsActions.setQueryParams({
        params: { cardsPack_id: id, cardQuestion: search },
      })
    );
    dispatch(cardsThunks.getCards());
  }, []);

  const setItemsPerPage = (itemsNumber: string) => {
    dispatch(
      cardsActions.setQueryParams({
        params: {
          cardsPack_id: id,
          pageCount: +itemsNumber,
          page: 1,
        },
      })
    );
    dispatch(cardsThunks.getCards());
  };
  const setPage = (page: number) => {
    dispatch(
      cardsActions.setQueryParams({ params: { cardsPack_id: id, page: page } })
    );
    dispatch(cardsThunks.getCards());
  };

  useEffect(() => {
    dispatch(
      cardsActions.setQueryParams({
        params: { cardsPack_id: packId || "" },
      })
    );
    dispatch(cardsThunks.getCards())
      .unwrap()
      .catch((error) => {
        if (error.error.response.status === 401) {
          navigate(`/signin`);
        }
      });
  }, []);

  return (
    <div className={s.cardsContainer}>
      <PageHeader addButtonTitle={buttonTitle} title={packName} />
      <Search
        debouncedSearchCallback={debouncedSearchCallback}
        search={search}
        setSearch={setSearch}
      />
      {!isLoading && (
        <>
          <CardsTable />
          <UniversalPagination
            itemsPerPage={`${itemsPerPage}`}
            page={activePage}
            selectData={itemsPerPageList}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Cards;
