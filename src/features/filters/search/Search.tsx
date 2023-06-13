import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { useDebounce } from "usehooks-ts";

export const Search = React.memo(() => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  // const debouncedSearch = useDebounce(() => {
  //   dispatch(
  //     packsActions.setQueryParams({
  //       params: {
  //         packName: search,
  //       },
  //     })
  //   );
  // }, 800);

  return (
    <Input.Wrapper label="Search">
      <Input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        icon={<IconSearch />}
        placeholder={"provide yours text"}
      />
    </Input.Wrapper>
  );
});
