import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectPacks } from "@/features/packs/packs.selectors.ts";
import { formatDate } from "@/common/utils/formatDate.ts";
import { AllowedActs } from "@/features/packs/AllowedActs.tsx";

export default function BasicTable() {
  const packs = useAppSelector(selectPacks);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map((row) => {
            const date = formatDate(new Date(row.updated));
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cardsCount}</TableCell>
                <TableCell align="right">{date}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">
                  {<AllowedActs user_id={row.user_id} pack_id={row._id} />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
