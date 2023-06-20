import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { PageHeader } from "@/common/PageHeader.tsx";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Filters } from "@/features/filters/Filters.tsx";
import { AddNewPack } from "@/features/modals/packs/AddNewPack";
import {
  selectActivePage,
  selectItemsPerPageData,
  selectPageCount,
  selectTotalPacks,
} from "@/features/packs/packs.selectors";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { PacksTable } from "@/features/packs/packsTable/PacksTable.tsx";
import { UniversalPagination } from "@/features/universalPagination/UniversalPagination.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Packs.module.scss";

const Packs = () => {
  console.log("packs rendering");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activePage = useAppSelector(selectActivePage);
  const itemsPerPageList = useAppSelector(selectItemsPerPageData);
  const totalPacks = useAppSelector(selectTotalPacks);
  const pageCount = useAppSelector(selectPageCount);
  const totalPages = Math.ceil(totalPacks / pageCount);
  const [packsPerPage, setPacksPerPage] = useState<string>("5");

  const setPage = (page: number) => {
    dispatch(packsActions.setQueryParams({ params: { page: page } }));
    dispatch(packsThunks.getPacks());
  };
  const setItemsPerPage = (itemsNumber: string) => {
    setPacksPerPage(itemsNumber);
    dispatch(
      packsActions.setQueryParams({
        params: { pageCount: +itemsNumber, page: 1 },
      })
    );
    dispatch(packsThunks.getPacks());
  };

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .then(() => {
        dispatch(packsThunks.getPacks())
          .unwrap()
          .catch((error) => {
            if (error.error.response.status === 401) {
              navigate(`/signin`);
            }
          });
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return (
    <div className={s.packsContainer}>
      <PageHeader
        buttonTitle={"Add new pack"}
        modalTitle={"Add new pack"}
        modalType={(close) => <AddNewPack closeModal={close} />}
        pageTitle={"Packs List"}
      />
      <Filters />
      <PacksTable />
      <UniversalPagination
        itemsPerPage={packsPerPage}
        setPage={setPage}
        totalPages={totalPages}
        page={activePage}
        selectData={itemsPerPageList}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default React.memo(Packs);
