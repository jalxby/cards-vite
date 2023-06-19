import { selectIsLoading } from "@/app/app.selectors";
import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { Button, Progress } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector(selectName);
  //const avatar = useAppSelector(state => state.auth.profile.)
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();
  const toSignIn = () => {
    navigate("/signin");
  };

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerContainer}>
          <HeaderLogo />
          {name ? (
            <>
              <NavLink to={"/profile"}>{name}</NavLink>
            </>
          ) : (
            <Button onClick={toSignIn}>Sign in</Button>
          )}
        </div>
      </div>
      <div className={s.progress}>
        <Progress
          radius="xs"
          size="xs"
          value={100}
          animate
          hidden={!isLoading}
        />
      </div>
    </div>
  );
};
