import { selectIsLoading } from "@/app/app.selectors";
import { HeaderLogo } from "@/assets/HeaderLogo.tsx";
import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectName } from "@/features/auth/auth.selectors.ts";
import { Avatar, Button, Menu, Progress } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HeaderContainer.module.scss";

export const HeaderContainer = () => {
  const name = useAppSelector(selectName);
  const avatar = useAppSelector((state) => state.auth.profile?.avatar);
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <NavLink to={"/profile"}>{name}</NavLink>
              <Menu trigger="hover" openDelay={100} closeDelay={400}>
                <Menu.Target>
                  <Avatar
                    variant="outline"
                    radius="50%"
                    size="md"
                    src={avatar}
                    style={{ border: "1px solid black" }}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconMessageCircle size={14} />}>
                    Messages
                  </Menu.Item>
                  <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                  <Menu.Item icon={<IconSearch size={14} />}>Search</Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                    Transfer my data
                  </Menu.Item>
                  <Menu.Item color="red" icon={<IconTrash size={14} />}>
                    Delete my account
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
