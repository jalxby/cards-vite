import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { AllowedActs } from "@/common/AllowedActs.tsx";
import { Skeleton, Table } from "@mantine/core";
import React from "react";
import { selectIsLoading } from "@/app/app.selectors.ts";
import { ColumnHeader } from "@/features/columnHeader/ColumnHeader.tsx";
import s from "./CardsTable.module.scss";
import {
  selectIsMyPackSelected,
  selectPacksFormatDate,
} from "@/features/cards/cards.selectors.ts";

export enum CardsColumn {
  QUESTION = "Question",
  ANSWER = "Answer",
  LAST_UPDATED = "Last Updated",
  GRADE = "Grade",
}

type ValuesToSort = "question" | "answer" | "updated" | "rating";

export const CardsTable = React.memo(() => {
  const cards = useAppSelector(selectPacksFormatDate);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedIsMyPack = useAppSelector(selectIsMyPackSelected);
  const dispatch = useAppDispatch();
  const thead_columns = Array.from(Object.values(CardsColumn)).map(
    (column_name) => {
      return (
        <th key={column_name}>
          <ColumnHeader title={column_name} />
        </th>
      );
    }
  );

  const rows = cards.map(
    ({ question, answer, _id, updated, grade, user_id }) => (
      <tr key={_id}>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {question}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {answer}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {updated}
          </Skeleton>
        </td>
        <td>
          <Skeleton visible={isLoading} animate={false}>
            {grade}
          </Skeleton>
        </td>
        {selectedIsMyPack && (
          <td>
            <AllowedActs user_id={user_id} pack_id={_id} />
          </td>
        )}
      </tr>
    )
  );

  const tbody_rows = cards.length !== 0 ? rows : <>{"NO PACKS FOUND"}</>;

  return (
    <div className={s.tableContainer}>
      <Table withBorder>
        <thead className={s.thead}>
          <tr>
            {thead_columns}
            {selectedIsMyPack && (
              <th style={{ backgroundColor: "#EFEFEF", width: "100%" }}></th>
            )}
          </tr>
        </thead>
        <tbody className={s.tbody}>{tbody_rows}</tbody>
      </Table>
    </div>
  );
});
