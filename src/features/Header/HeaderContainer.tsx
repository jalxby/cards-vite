import { Button, Title } from "@mantine/core";
import React from "react";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  return (
    <div className={s.headerContainer} style={{}}>
      <Title variant="h2">IT-Incubator</Title>
      <Button>Sign in</Button>
    </div>
  );
};
