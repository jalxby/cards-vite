import { selectIsLoading } from "@/app/app.selectors.ts";
import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectMyUserId } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import {
  selectPageCount,
  selectQueryParams,
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Packs = React.memo(() => {
  const [activePage, setActivePage] = useState<number>(1);
  const [packsPerPage, setPacksPerPage] = useState<string | null>("5");
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [search, setSearch] = useState<string>("");
  const [myPacks, setMyPacks] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const totalPacks = useAppSelector(selectTotalPacks);
  const pageCount = useAppSelector(selectPageCount);
  const queryParams = useAppSelector(selectQueryParams);
  const myUserId = useAppSelector(selectMyUserId);
  const totalPages = Math.ceil(totalPacks / pageCount);

  const clearAllFilters = () => {
    dispatch(packsActions.clearQueryParams());
    setActivePage(1);
    setPacksPerPage("5");
    setRangeValue([0, 100]);
    setSearch("");
    setMyPacks(false);
  };

  const toggleMyPacks = (isMy: boolean) => {
    setMyPacks(isMy);
    dispatch(
      packsActions.setQueryParams({
        params: { user_id: isMy ? myUserId : "" },
      })
    );
  };
  const setPage = (e: number) => {
    setActivePage(e);
    dispatch(packsActions.setQueryParams({ params: { page: e } }));
  };

  const setPackCount = (e: string) => {
    setPacksPerPage(e);
    dispatch(packsActions.setQueryParams({ params: { pageCount: +e } }));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        packsActions.setQueryParams({
          params: {
            packName: search,
            min: rangeValue[0],
            max: rangeValue[1],
          },
        })
      );
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, rangeValue]);

  useEffect(() => {
    dispatch(packsThunks.getPacks());
  }, [dispatch, queryParams]);

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
            <Button
              onClick={() => toggleMyPacks(true)}
              variant={myPacks ? "filled" : "outline"}
            >
              My
            </Button>
            <Button
              onClick={() => toggleMyPacks(false)}
              variant={!myPacks ? "filled" : "outline"}
            >
              All
            </Button>
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
          onClick={clearAllFilters}
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
        <Pagination
          value={activePage}
          onChange={(e) => setPage(e)}
          total={totalPages}
        />{" "}
        {" Show "}
        <Select
          sx={{ width: "70px" }}
          value={packsPerPage}
          onChange={(e: string) => setPackCount(e)}
          data={["5", "10", "15", "20"]}
        />
        Cards per Page
      </div>
    </div>
  );
});

export default Packs;
