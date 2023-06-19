import { HeaderContainer } from "@/common/header/HeaderContainer";
import { Notifications } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  return (
    <div>
      <HeaderContainer />
      <Outlet />
      <Notifications />
    </div>
  );
};
