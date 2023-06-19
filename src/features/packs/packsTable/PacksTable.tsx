import { AllowedActs } from "@/common/AllowedActs.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { TableDataItem } from "@/common/TableDataItem.tsx";
import { cardsActions } from "@/features/cards/cards.slice.ts";
import { ColumnHeader } from "@/features/columnHeader/ColumnHeader.tsx";
import { selectPacksFormatDate } from "@/features/packs/packs.selectors.ts";
import { Table } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./PacksTable.module.scss";

export enum Column {
  NAME = "Name",
  CARDS = "Cards",
  LAST_UPDATED = "Last Updated",
  CREATED_BY = "Created By",
  ACTIONS = "Actions",
}

type ValuesToSort = "name" | "cardsCount" | "updated" | "user_name";

export const CurrentSorted: Record<string, ValuesToSort> = {
  Name: "name",
  Cards: "cardsCount",
  "Last Updated": "updated",
  "Created By": "user_name",
};

export const PacksTable = () => {
  console.log("packs table rendering");
  const packs = useAppSelector(selectPacksFormatDate);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickPackTitle = (cardsPack_id: string) => {
    navigate(`/cards/${cardsPack_id}`);
  };

  const thead_columns = Array.from(Object.values(Column)).map((column_name) => {
    return (
      <th key={column_name}>
        <ColumnHeader title={column_name} />
      </th>
    );
  });

  const rows = packs.map(
    ({ _id, name, cardsCount, updated, user_name, user_id }) => (
      <tr key={_id}>
        <td onClick={() => onClickPackTitle(_id)}>
          <TableDataItem>{name}</TableDataItem>
        </td>
        <td>
          <TableDataItem>{cardsCount}</TableDataItem>
        </td>
        <td>
          <TableDataItem>{updated}</TableDataItem>
        </td>
        <td>
          <TableDataItem>{user_name}</TableDataItem>
        </td>
        <td>
          <AllowedActs user_id={user_id} pack_id={_id} />
        </td>
      </tr>
    )
  );

  const tbody_rows = packs.length !== 0 ? rows : <>{"NO PACKS FOUND"}</>;

  return (
    <div className={s.tableContainer}>
      <Table withBorder>
        <thead className={s.thead}>
          <tr>{thead_columns}</tr>
        </thead>
        <tbody className={s.tbody}>{tbody_rows}</tbody>
      </Table>
    </div>
  );
};
