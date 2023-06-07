import { selectIsLoading } from "@/app/app.selectors.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { HeaderContainer } from "@/features/Header/HeaderContainer.tsx";
import { AppShell, Header, Loader } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);
  useEffect(() => {
    dispatch(authThunks.me())
      .unwrap()
      .catch(() => {
        navigate("/signin");
      });
  }, []);
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
        {isLoading && (
          <div
            style={{
              zIndex: 10,
              width: "100%",
              height: "100%",
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Прозрачный черный фон
            }}
          >
            <Loader size="xl" variant="bars" />
          </div>
        )}
        <Outlet />
        <Notifications />
      </AppShell>
    </div>
  );
};
