import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { selectQueryParams } from "@/features/packs/packs.selectors.ts";
import { packsThunks } from "@/features/packs/packs.slice.ts";
import { PacksTable } from "@/features/packs/packsTable/PacksTable.tsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/common/PageHeader.tsx";
import { Filters } from "@/features/filters/Filters.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";

const Packs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryParams = useAppSelector(selectQueryParams);

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .then(() => {
        dispatch(packsThunks.getPacks());
      })
      .catch(() => {
        navigate("/signin");
      });
  }, [queryParams]);

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
      <PageHeader addButtonTitle={"Add new pack"} title={"Packs List"} />
      <Filters />
      <PacksTable />
      <UniversalPagination />
    </div>
  );
};

export default React.memo(Packs);
