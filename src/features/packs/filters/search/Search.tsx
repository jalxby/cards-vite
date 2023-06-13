import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { packsActions } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        packsActions.setQueryParams({
          params: {
            packName: search,
          },
        })
      );
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
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
};
