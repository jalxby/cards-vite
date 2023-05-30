import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import { Button, Title } from "@mantine/core";
import s from "./HeaderContainer.module.scss";

type PropsType = {
  toSignIn: (url: string) => void;
};

export const HeaderContainer = (props: PropsType) => {
  const name = useAppSelector((state) => state.auth.profile?.name);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(authThunks.signOut());
  };

  const toSignIn = () => {
    props.toSignIn("/login");
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
