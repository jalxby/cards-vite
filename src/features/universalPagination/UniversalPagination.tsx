import { Pagination, Select } from "@mantine/core";
import React, { FC } from "react";

type PropsType = {
  page: number | undefined;
  setPage: (page: number) => void;
  selectData: string[];
  totalPages: number;
  itemsPerPage: string;
  setItemsPerPage: (itemsNumber: string) => void;
};

export const UniversalPagination: FC<PropsType> = ({
  page,
  selectData,
  totalPages,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Pagination value={page} onChange={setPage} total={totalPages} />{" "}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {" Show "}
        <Select
          sx={{ width: "70px" }}
          value={itemsPerPage}
          onChange={setItemsPerPage}
          data={selectData}
        />
        Cards per Page
      </div>
    </div>
  );
};
