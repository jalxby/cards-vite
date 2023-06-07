import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectTokenDeathTime } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import s from "@/features/auth/Sign-in/Signin.module.scss";
import {
  Button,
  Input,
  NumberInput,
  Paper,
  RangeSlider,
  rem,
  Table,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Packs = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));
  const navigate = useNavigate();
  const tokenDeathTime = useAppSelector(selectTokenDeathTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tokenDeathTime || tokenDeathTime < Number(new Date())) {
      dispatch(authThunks.me())
        .unwrap()
        .catch(() => {
          navigate("/signin");
        });
    }
  }, [dispatch, tokenDeathTime]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3>Packs List</h3>
        <Button>Add new pack</Button>
      </div>
      <div style={{ display: "flex" }}>
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
          <div style={{ display: "flex" }}>
            <NumberInput
              hideControls
              sx={{ input: { width: rem(54), textAlign: "center" } }}
            />
            <RangeSlider thumbSize={14} mt="xl" defaultValue={[20, 80]} />
            <NumberInput
              hideControls
              sx={{ input: { width: rem(54), textAlign: "center" } }}
            />
          </div>
        </Input.Wrapper>
      </div>
      <Paper shadow="xs" radius="xs" p="sm">
        <Table withBorder>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default Packs;
