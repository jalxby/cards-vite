import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector(selectName);

  const toSignIn = () => {
    globalRouter.navigate && globalRouter.navigate("/signin");
  };

  return (
    <div className={s.headerContainer}>
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
