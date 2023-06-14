import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { selectQueryParams } from "@/features/packs/packs.selectors.ts";
import { PacksTable } from "@/features/packs/packsTable/PacksTable.tsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/common/PageHeader.tsx";
import { Filters } from "@/features/filters/Filters.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";

const Packs = () => {
  console.log("packs rendering");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .catch(() => {
        navigate("/signin");
      });
  }, []);

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
