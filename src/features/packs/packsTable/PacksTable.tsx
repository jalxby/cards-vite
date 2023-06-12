import { useAppSelector } from "@/common/hooks/hooks.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { selectPacksFormatDate } from "@/features/packs/packs.selectors.ts";
import { Skeleton, Table } from "@mantine/core";
import React from "react";
import { selectIsLoading } from "@/app/app.selectors.ts";
import { ColumnHeader } from "@/features/packs/ColumnHeader.tsx";
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

export const PacksTable = React.memo(() => {
  const packs = useAppSelector(selectPacksFormatDate);
  const isLoading = useAppSelector(selectIsLoading);
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
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {name}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {cardsCount}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {updated}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {user_name}
          </Skeleton>
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
});
