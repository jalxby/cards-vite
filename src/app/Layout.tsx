import { BodyApp } from "@/app/BodyApp.tsx";
import { GlobalError } from "@/common/GlobalError.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectTokenDeathTime } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { HeaderContainer } from "@/features/Header/HeaderContainer.tsx";
import { AppShell, Header } from "@mantine/core";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  const tokenDeathTime = useAppSelector(selectTokenDeathTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tokenDeathTime || tokenDeathTime > Number(new Date())) {
      dispatch(authThunks.me());
    }
  }, [dispatch, tokenDeathTime]);

  return (
    <div>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <HeaderContainer />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <BodyApp />
        <GlobalError />
      </AppShell>
    </div>
  );
};
