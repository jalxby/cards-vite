import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { useDebouncedCallback } from "use-debounce";

type PropsType = {
  debouncedSearchCallback: (search: string) => void;
};

export const Search: FC<PropsType> = React.memo(
  ({ debouncedSearchCallback }) => {
    console.log("search rendering");
    const [search, setSearch] = useState<string>("");

    const debouncedDispatch = useDebouncedCallback(() => {
      debouncedSearchCallback(search);
    }, 800);

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
      debouncedDispatch();
    };

    return (
      <Input.Wrapper label="Search">
        <Input
          value={search}
          onChange={searchHandler}
          icon={<IconSearch />}
          placeholder={"provide yours text"}
        />
      </Input.Wrapper>
    );
  }
);
