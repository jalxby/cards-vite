import React, { useCallback, useState } from "react";
import { Pagination, Select } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import {
  selectItemsPerPageData,
  selectPageCount,
  selectTotalPacks,
} from "@/features/packs/packs.selectors.ts";
import { packsActions } from "@/features/packs/packs.slice.ts";

export const UniversalPagination = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [packsPerPage, setPacksPerPage] = useState<string | null>("5");
  const selectData = useAppSelector(selectItemsPerPageData);
  const totalPacks = useAppSelector(selectTotalPacks);
  const pageCount = useAppSelector(selectPageCount);
  const totalPages = Math.ceil(totalPacks / pageCount);
  const dispatch = useAppDispatch();

  const setPage = useCallback((page: number) => {
    setActivePage(page);
    dispatch(packsActions.setQueryParams({ params: { page: page } }));
  }, []);
  const setPackCount = useCallback((packsNumber: string) => {
    setPacksPerPage(packsNumber);
    dispatch(
      packsActions.setQueryParams({ params: { pageCount: +packsNumber } })
    );
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Pagination
        value={activePage}
        onChange={(e) => setPage(e)}
        total={totalPages}
      />{" "}
      <div style={{ display: "flex" }}>
        {" Show "}
        <Select
          sx={{ width: "70px" }}
          value={packsPerPage}
          onChange={(e: string) => setPackCount(e)}
          data={selectData}
        />
        Cards per Page
      </div>
    </div>
  );
};
