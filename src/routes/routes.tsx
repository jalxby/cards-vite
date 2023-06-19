import { Layout } from "@/app/Layout.tsx";
import { SignIn } from "@/features/auth/Sign-in/Sign-in.tsx";
import { SignUp } from "@/features/auth/Sign-up/Sign-up.tsx";
import { CheckEmail } from "@/features/auth/Check-email.tsx";
import { ForgotPassword } from "@/features/auth/Forgot-password.tsx";
import Packs from "@/features/packs/Packs.tsx";
import { Profile } from "@/features/profile/Profile.tsx";
import { CreateNewPassword } from "@/features/auth/Set-new-password.tsx";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Cards from "@/features/cards/Cards.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: `/packs`,
        element: <Packs />,
      },
      {
        path: `/cards/:packId`,
        element: <Cards />,
      },
      {
        path: `/signup`,
        element: <SignUp />,
      },
      {
        path: `/signin`,
        element: <SignIn />,
      },
      {
        path: `/forgotpassword`,
        element: <ForgotPassword />,
      },
      {
        path: `/checkemail`,
        element: <CheckEmail />,
      },
      {
        path: `/profile`,
        element: <Profile />,
      },
      {
        path: `/createnewpass/:token`,
        element: <CreateNewPassword />,
      },
      {
        path: "*",
        element: <div>404 not found</div>,
      },
      {
        element: <Outlet />,
        children: [
          {
            path: "/",
            element: <Packs />,
          },
        ],
      },
    ],
  },
]);
