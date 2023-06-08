import { selectIsLoading } from "@/app/app.selectors.ts";
import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import {
  selectPageCount,
  selectTotalPacks,
} from "@/features/packs/packs.selectors.ts";
import { packsActions, packsThunks } from "@/features/packs/packs.slice.ts";
import { PacksTable } from "@/features/packs/PacksTable.tsx";
import {
  Button,
  Input,
  NumberInput,
  Pagination,
  Paper,
  RangeSlider,
  rem,
  Select,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

const Packs = () => {
  const [activePage, setPage] = useState<number>(1);
  const [value, setValue] = useState<string | null>("5");
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const totalPacks = useAppSelector(selectTotalPacks);
  const pageCount = useAppSelector(selectPageCount);
  const totalPages = Math.ceil(totalPacks / pageCount);

  debounce(() => {
    dispatch(
      packsActions.setQueryParams({
        params: {
          pageCount: Number(value),
          packName: search,
          page: activePage,
          min: rangeValue[0],
          max: rangeValue[1],
        },
      })
    );
  }, 800);
  const debouncedValue = useDebounce(
    () => {},

    500
  );

  useEffect(() => {
    dispatch(
      packsActions.setQueryParams({
        params: {
          pageCount: Number(value),
          packName: search,
          page: activePage,
          min: rangeValue[0],
          max: rangeValue[1],
        },
      })
    );
    dispatch(packsThunks.getPacks());
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3>Packs List</h3>
        <Button>Add new pack</Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Input.Wrapper label="Search">
          <Input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            icon={<IconSearch />}
            placeholder={"provide yours text"}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Show packs cards">
          <Button.Group>
            <Button variant="outline">My</Button>
            <Button variant="filled">All</Button>
          </Button.Group>
        </Input.Wrapper>

        <Input.Wrapper label="Number of cards">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 200,
              alignItems: "center",
            }}
          >
            <NumberInput
              hideControls
              size={"sm"}
              sx={{ input: { width: rem(50), textAlign: "center" } }}
              value={rangeValue[0]}
              onChange={(e) => setRangeValue([+e, rangeValue[1]])}
            />
            <RangeSlider
              style={{
                width: "100%",
                margin: 0,
              }}
              thumbSize={14}
              mt="xl"
              label={null}
              value={rangeValue}
              onChange={setRangeValue}
            />
            <NumberInput
              value={rangeValue[1]}
              onChange={(e) => setRangeValue([rangeValue[0], +e])}
              hideControls
              size={"sm"}
              sx={{ input: { width: rem(50), textAlign: "center" } }}
            />
          </div>
        </Input.Wrapper>
        <Paper
          shadow="xs"
          radius="xs"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: 36,
            width: 36,
          }}
        >
          <FilterLogo />
        </Paper>
      </div>
      <Paper mt={20} shadow="xs" radius="xs" p="sm">
        {!isLoading && <PacksTable />}
      </Paper>
      <div style={{ display: "flex" }}>
        <Pagination value={activePage} onChange={setPage} total={totalPages} />{" "}
        {" Show "}
        <Select
          sx={{ width: "70px" }}
          value={value}
          onChange={setValue}
          data={["5", "10", "15", "20"]}
        />
        Cards per Page
      </div>
    </div>
  );
};

export default Packs;
