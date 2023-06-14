import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { PacksTable } from "@/features/packs/packsTable/PacksTable.tsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/common/PageHeader.tsx";
import { Filters } from "@/features/filters/Filters.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";
import s from "./Packs.module.scss";
import { packsThunks } from "@/features/packs/packs.slice.ts";

const Packs = () => {
  console.log("packs rendering");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .then(() => {
        dispatch(packsThunks.getPacks());
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return (
    <div className={s.packsContainer}>
      <PageHeader addButtonTitle={"Add new pack"} title={"Packs List"} />
      <Filters />
      <PacksTable />
      <UniversalPagination />
    </div>
  );
};

export default React.memo(Packs);
