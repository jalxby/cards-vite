import { useAppSelector } from "@/common/hooks/hooks.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { Table } from "@mantine/core";
import React from "react";

export const PacksTable = React.memo(() => {
  const packs = useAppSelector((state) => state.packs.cardPacks);
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
          const unixDate = element.updated;
          //const date = `${unixDate.getDate()}.${unixDate.getMonth()}.${unixDate.getFullYear()}`;
          return (
            <tr key={element._id}>
              <td>{element.name}</td>
              <td>{element.cardsCount}</td>
              <td>{"date"}</td>
              <td>{element.user_name}</td>
              <td>{<AllowedActs />}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});
