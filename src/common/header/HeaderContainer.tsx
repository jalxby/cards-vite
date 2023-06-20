import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

import { selectIsLoading } from "@/app/app.selectors";
import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { LogoutMenu } from "@/assets/LogoutMenu";
import { UserMenu } from "@/assets/UserMenu";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { authThunks } from "@/features/auth/auth.slice";
import { Avatar, Button, Menu, Progress } from "@mantine/core";

export const HeaderContainer = () => {
  const name = useAppSelector(selectName);
  const avatar = useAppSelector((state) => state.auth.profile?.avatar);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toSignIn = () => {
    navigate("/signin");
  };

  const toProfile = () => {
    navigate("/profile");
  };

  const signOut = () => {
    dispatch(authThunks.signOut())
      .unwrap()
      .then(() => {
        navigate("/signin");
      });
  };

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerContainer}>
          <HeaderLogo />
          {name ? (
            <div className={s.profileLink}>
              <NavLink to={"/profile"}>{name}</NavLink>
              <Menu trigger="hover" openDelay={100} closeDelay={400}>
                <Menu.Target>
                  <Avatar
                    variant="outline"
                    radius="50%"
                    size="md"
                    src={avatar}
                    className={s.avatar}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={toProfile}
                    className={s.menuItem}
                    icon={<UserMenu />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    onClick={signOut}
                    className={s.menuItem}
                    icon={<LogoutMenu />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
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
