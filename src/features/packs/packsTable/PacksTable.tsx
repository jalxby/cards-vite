import { useAppSelector } from "@/common/hooks/hooks.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { selectPacks } from "@/features/packs/packs.selectors.ts";
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
  const packs = useAppSelector(selectPacks);
  const isLoading = useAppSelector(selectIsLoading);
  const columns = Array.from(Object.values(Column)).map((column_name) => {
    return (
      <th>
        <ColumnHeader key={column_name} title={column_name} />
      </th>
    );
  });
  return (
    <Table withBorder>
      <thead className={s.thead}>
        <tr>{columns}</tr>
      </thead>
      <tbody className={s.tbody}>
        {packs.length !== 0 ? (
          packs.map((element) => {
            const date = formatDate(new Date(element.updated));
            return (
              <tr key={element._id}>
                <td>
                  <Skeleton visible={isLoading} animate={false}>
                    {element.name}
                  </Skeleton>
                </td>
                <td>
                  <Skeleton visible={isLoading} animate={false}>
                    {element.cardsCount}
                  </Skeleton>
                </td>
                <td>
                  <Skeleton visible={isLoading} animate={false}>
                    {date}
                  </Skeleton>
                </td>
                <td>
                  <Skeleton visible={isLoading} animate={false}>
                    {element.user_name}
                  </Skeleton>
                </td>
                <td>
                  {
                    <AllowedActs
                      user_id={element.user_id}
                      pack_id={element._id}
                    />
                  }
                </td>
              </tr>
            );
          })
        ) : (
          <>{"NO PACKS FOUND"}</>
        )}
      </tbody>
    </Table>
  );
});
