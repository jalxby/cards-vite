import { FilterLogo } from "@/assets/FilterLogo.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Packs = () => {
  const [activePage, setPage] = useState(1);
  const [value, setValue] = useState<string | null>("5");
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
          <Input icon={<IconSearch />} placeholder={"provide yours text"} />
        </Input.Wrapper>
        <Input.Wrapper label="Show packs cards">
          <Button.Group>
            <Button variant="default">My</Button>
            <Button variant="default">All</Button>
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
              sx={{ input: { width: rem(36), textAlign: "center" } }}
            />
            <RangeSlider
              style={{
                width: "100%",

                margin: 0,
              }}
              thumbSize={14}
              mt="xl"
              defaultValue={[20, 80]}
              label={null}
            />
            <NumberInput
              hideControls
              size={"sm"}
              sx={{ input: { width: rem(36), textAlign: "center" } }}
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
        <Pagination value={activePage} onChange={setPage} total={10} /> Show
        <Select
          sx={{ width: "60px" }}
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
