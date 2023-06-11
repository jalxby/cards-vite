import { useAppSelector } from "@/common/hooks/hooks.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { useSortColumn } from "@/common/utils/useSortColumn.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";
import { selectPacks } from "@/features/packs/packs.selectors.ts";
import { Skeleton, Table } from "@mantine/core";
import React, { useState } from "react";
import { selectIsLoading } from "@/app/app.selectors.ts";
import s from "./PacksTable.module.scss";

enum Column {
  NAME = "Name",
  CARDS = "Cards",
  LAST_UPDATED = "Last Updated",
  CREATED_BY = "Created By",
  ACTIONS = "Actions",
}

enum SortDirection {
  ASCENDING = 0,
  DESCENDING = 1,
  NEUTRAL = 2,
}

export const PacksTable = React.memo(() => {
  console.log("Table rendering");
  const packs = useAppSelector(selectPacks);
  const [sortedColumn, sortDirection, setSort] = useSortColumn("name");
  const isLoading = useAppSelector(selectIsLoading);
  const [hoveredColumnName, setHoveredColumnName] = useState<string | null>(
    null
  );
  const isCurrentSorted = hoveredColumnName?.toLowerCase() === sortedColumn;
  return (
    <Table withBorder>
      <thead style={{ height: "48px", backgroundColor: "#EFEFEF" }}>
        <tr>
          <th style={{ width: "250px" }}>
            <span
              onClick={(e) => setSort(e.currentTarget.innerText)}
              onMouseEnter={(e) => {
                setHoveredColumnName(e.currentTarget.innerText);
              }}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              {Column.NAME}
              {isCurrentSorted && (
                <>
                  {sortDirection === 0 && (
                    <div className={` ${s.ascending}`}></div>
                  )}
                  {sortDirection === 1 && (
                    <div className={`${s.descending} `}></div>
                  )}
                  {sortDirection === 2 && (
                    <div className={`${s.descending} ${s.ascending}`}></div>
                  )}
                </>
              )}
            </span>
          </th>
          <th>
            <span
              onClick={(e) => setSort(e.currentTarget.innerText)}
              onMouseEnter={(e) => {
                setHoveredColumnName(e.currentTarget.innerText);
              }}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              {Column.CARDS}
              {isCurrentSorted && (
                <>
                  {sortDirection === 0 && (
                    <div className={` ${s.ascending}`}></div>
                  )}
                  {sortDirection === 1 && (
                    <div className={`${s.descending} `}></div>
                  )}
                  {sortDirection === 2 && (
                    <div className={`${s.descending} ${s.ascending}`}></div>
                  )}
                </>
              )}
            </span>
          </th>
          <th>
            <span
              // onClick={sortDirUpdated}
              onMouseEnter={() => setHoveredColumnName("Last Updated")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              {Column.LAST_UPDATED}
              {/*{hoveredColumnName === Column.LAST_UPDATED && (*/}
              {/*  <React.Fragment>*/}
              {/*    {dirUpdated === 1 ? <SortAscIcon /> : <SortDescIcon />}*/}
              {/*  </React.Fragment>*/}
              {/*)}*/}
            </span>
          </th>
          <th>
            <span
              // onClick={sortDirUserName}
              onMouseEnter={() => setHoveredColumnName("Created By")}
              onMouseLeave={() => setHoveredColumnName(null)}
            >
              {Column.CREATED_BY}
              {/*{hoveredColumnName === Column.CREATED_BY && (*/}
              {/*  <React.Fragment>*/}
              {/*    {dirUserName === 1 ? <SortAscIcon /> : <SortDescIcon />}*/}
              {/*  </React.Fragment>*/}
              {/*)}*/}
            </span>
          </th>
          <th>{Column.ACTIONS}</th>
        </tr>
      </thead>
      <tbody>
        {packs.length !== 0 ? (
          packs.map((element) => {
            const date = formatDate(new Date(element.updated));
            return (
              <tr
                style={{
                  height: "48px",
                  backgroundColor: "#FFFFFF",
                }}
                key={element._id}
              >
                <td
                  style={{
                    maxHeight: "48px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "250px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.name}
                  <Skeleton visible={isLoading} animate={false}></Skeleton>
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
