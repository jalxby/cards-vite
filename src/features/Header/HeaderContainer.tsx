import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Button, Title } from "@mantine/core";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector((state) => state.auth.profile?.name);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(authThunks.signOut());
  };

  const toSignIn = () => {
    globalRouter.navigate && globalRouter.navigate("/signin");
  };

  return (
    <div className={s.headerContainer} style={{}}>
      <Title variant="h2">IT-Incubator</Title>
      {name ? (
        <>
          {name}
          <Button onClick={signOut}>Sign out</Button>
        </>
      ) : (
        <Button onClick={toSignIn}>Sign in</Button>
      )}
    </div>
  );
};
