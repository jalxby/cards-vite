import { selectIsLoading } from "@/app/app.selectors";
import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { Progress } from "@mantine/core";
import { NavLink } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector(selectName);
  const isLoading = useAppSelector(selectIsLoading);
  const toSignIn = () => {
    globalRouter.navigate && globalRouter.navigate("/signin");
  };

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerContainer}>
          <HeaderLogo />
          {name && (
            <>
              <NavLink to={"/profile"}>{name}</NavLink>
            </>
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
