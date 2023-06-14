import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";

export const Search = React.memo(() => {
  console.log("search rendering");
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(packsActions.setQueryParams({ params: { packName: search } }));
      dispatch(packsThunks.getPacks());
    }, 800);
    return () => clearTimeout(timeout);
  }, [search]);

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
