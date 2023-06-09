import { SortAscIcon } from "@/assets/SortAscIcon.tsx";
import { SortDescIcon } from "@/assets/SortDescIcon.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { useSortColumn } from "@/common/utils/useSortColumn.tsx";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { selectPacks } from "@/features/packs/packs.selectors.ts";
import { Table } from "@mantine/core";
import React, { useState } from "react";

export const PacksTable = React.memo(() => {
  const packs = useAppSelector(selectPacks);
  const [dirName, setDirName] = useSortColumn("name");
  const [dirUpdated, setDirUpdated] = useSortColumn("updated");
  const [dirCardsCount, setDirCardsCount] = useSortColumn("cardsCount");
  const [dirUserName, setDirUserName] = useSortColumn("user_name");
  const [hoveredColumnName, setHoveredColumnName] = useState<string | null>(
    null
  );
  return (
    <Table withBorder>
      <thead>
        <tr>
          <th>
            <span
              onClick={setDirName}
              onMouseEnter={() => setHoveredColumnName("Name")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              Name
              {hoveredColumnName === "Name" && (
                <React.Fragment>
                  {dirName === 1 ? <SortAscIcon /> : <SortDescIcon />}
                </React.Fragment>
              )}
            </span>
          </th>
          <th>
            <span
              onClick={setDirCardsCount}
              onMouseEnter={() => setHoveredColumnName("Cards")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              Cards
              {hoveredColumnName === "Cards" && (
                <React.Fragment>
                  {dirCardsCount === 1 ? <SortAscIcon /> : <SortDescIcon />}
                </React.Fragment>
              )}
            </span>
          </th>
          <th>
            <span
              onClick={setDirUpdated}
              onMouseEnter={() => setHoveredColumnName("Last Updated")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              Last Updated
              {hoveredColumnName === "Last Updated" && (
                <React.Fragment>
                  {dirUpdated === 1 ? <SortAscIcon /> : <SortDescIcon />}
                </React.Fragment>
              )}
            </span>
          </th>
          <th>
            <span
              onClick={setDirUserName}
              onMouseEnter={() => setHoveredColumnName("Created By")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              Created By
              {hoveredColumnName === "Created By" && (
                <React.Fragment>
                  {dirUserName === 1 ? <SortAscIcon /> : <SortDescIcon />}
                </React.Fragment>
              )}
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {packs.length !== 0 ? (
          packs.map((element) => {
            const date = formatDate(new Date(element.updated));
            return (
              <tr key={element._id}>
                <td>{element.name}</td>
                <td>{element.cardsCount}</td>
                <td>{date}</td>
                <td>{element.user_name}</td>
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
