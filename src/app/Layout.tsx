import { selectIsLoading } from "@/app/app.selectors.ts";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { routes } from "@/common/routes.tsx";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { HeaderContainer } from "@/features/Header/HeaderContainer.tsx";
import { AppShell, Header, Loader } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  globalRouter.navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);

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
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10%",
            }}
          >
            <Loader size="xl" variant="bars" />
          </div>
        ) : (
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        )}

        <Notifications />
        <div>
          {routes.map((route) => (
            <NavLink
              to={"http://localhost:5173/" + route.path.slice(2)}
              key={route.path}
            >
              {route.path.slice(1)} |{" "}
            </NavLink>
          ))}
        </div>
      </AppShell>
    </div>
  );
};
