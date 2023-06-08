import { useAppSelector } from "@/common/hooks/hooks.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { Table } from "@mantine/core";
import React from "react";

export const PacksTable = React.memo(() => {
  const packs = useAppSelector((state) => state.packs.cardsData.cardPacks);

  return (
    <Table withBorder>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cards</th>
          <th>Last Updated</th>
          <th>Created By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {packs.map((element) => {
          const date = formatDate(new Date(element.updated));
          return (
            <tr key={element._id}>
              <td>{element.name}</td>
              <td>{element.cardsCount}</td>
              <td>{date}</td>
              <td>{element.user_name}</td>
              <td>{<AllowedActs />}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});
