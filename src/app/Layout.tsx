import { GlobalError } from "@/common/GlobalError.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { routes } from "@/common/routes.tsx";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectTokenDeathTime } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { HeaderContainer } from "@/features/Header/HeaderContainer.tsx";
import { AppShell, Header } from "@mantine/core";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  globalRouter.navigate = useNavigate();
  const tokenDeathTime = useAppSelector(selectTokenDeathTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tokenDeathTime || tokenDeathTime < Number(new Date())) {
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
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <GlobalError />
      </AppShell>
    </div>
  );
};
