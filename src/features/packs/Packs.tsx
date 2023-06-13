import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import {
  selectItemsPerPageData,
  selectPageCount,
  selectQueryParams,
  selectTotalPacks,
} from "@/features/packs/packs.selectors.ts";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { UniversalTable } from "@/features/packs/universalTable/UniversalTable.tsx";
import { Pagination, Select } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacksHeader } from "@/features/packs/PacksHeader.tsx";
import { Filters } from "@/features/packs/filters/Filters.tsx";

const Packs = () => {
  console.log("packs rendering");
  const [activePage, setActivePage] = useState<number>(1);
  const [packsPerPage, setPacksPerPage] = useState<string | null>("5");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalPacks = useAppSelector(selectTotalPacks);
  const pageCount = useAppSelector(selectPageCount);
  const queryParams = useAppSelector(selectQueryParams);
  const selectData = useAppSelector(selectItemsPerPageData);
  const totalPages = Math.ceil(totalPacks / pageCount);

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

  useEffect(() => {
    dispatch(packsThunks.getPacks());
  }, [dispatch, queryParams]);

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
      <PacksHeader addButtonTitle={"Add new pack"} title={"Packs List"} />
      <Filters
        setActivePage={setActivePage}
        setPacksPerPage={setPacksPerPage}
      />
      <UniversalTable />
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
    </div>
  );
};

export default React.memo(Packs);
