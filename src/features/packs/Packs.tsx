import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import {
  selectPageCount,
  selectQueryParams,
  selectTotalPacks,
} from "@/features/packs/packs.selectors.ts";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { PacksTable } from "@/features/packs/packsTable/PacksTable.tsx";
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
  const totalPages = Math.ceil(totalPacks / pageCount);

  const setPage = useCallback((e: number) => {
    setActivePage(e);
    dispatch(packsActions.setQueryParams({ params: { page: e } }));
  }, []);
  const setPackCount = useCallback((e: string) => {
    setPacksPerPage(e);
    dispatch(packsActions.setQueryParams({ params: { pageCount: +e } }));
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
      <PacksHeader />
      <Filters
        setActivePage={setActivePage}
        setPacksPerPage={setPacksPerPage}
      />
      <PacksTable />
      <div style={{ display: "flex" }}>
        <Pagination
          value={activePage}
          onChange={(e) => setPage(e)}
          total={totalPages}
        />{" "}
        {" Show "}
        <Select
          sx={{ width: "70px" }}
          value={packsPerPage}
          onChange={(e: string) => setPackCount(e)}
          data={["5", "10", "15", "20"]}
        />
        Cards per Page
      </div>
    </div>
  );
};

export default React.memo(Packs);
