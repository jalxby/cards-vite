import { GlobalError } from "@/common/GlobalError.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectTokenDeathTime } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { SignIn } from "@/features/auth/Sign-in/Sign-in.tsx";
import { SignUp } from "@/features/auth/Sign-up/Sign-up.tsx";
import { CheckEmail } from "@/features/Check-email.tsx";
import { ForgotPassword } from "@/features/Forgot-password.tsx";
import { HeaderContainer } from "@/features/Header/HeaderContainer.tsx";
import Packs from "@/features/Packs.tsx";
import { Profile } from "@/features/Profile/Profile.tsx";
import { CreateNewPassword } from "@/features/Set-new-password.tsx";
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
          <Route path={"/"} element={<Packs />} />
          <Route path={"/signUp"} element={<SignUp />} />
          <Route path={"/signIn"} element={<SignIn />} />
          <Route path={"/forgotPassword"} element={<ForgotPassword />} />
          <Route path={"/checkEmail"} element={<CheckEmail />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route
            path={"/createNewPass/:token"}
            element={<CreateNewPassword />}
          />
          <Route path={"/*"} element={<div>404 not found</div>} />
        </Routes>
        <GlobalError />
      </AppShell>
    </div>
  );
};