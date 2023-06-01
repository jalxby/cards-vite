import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector((state) => state.auth.profile?.name);

  const toSignIn = () => {
    globalRouter.navigate && globalRouter.navigate("/signin");
  };

  return (
    <div className={s.headerContainer} style={{}}>
      <HeaderLogo />
      {name ? (
        <>
          <NavLink style={{ display: "block" }} to={"/profile"}>
            {name}
          </NavLink>
        </>
      ) : (
        <Button onClick={toSignIn}>Sign in</Button>
      )}
    </div>
  );
};
