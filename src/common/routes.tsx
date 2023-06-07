import { Layout } from "@/app/Layout.tsx";
import { SignIn } from "@/features/auth/Sign-in/Sign-in.tsx";
import { SignUp } from "@/features/auth/Sign-up/Sign-up.tsx";
import { CheckEmail } from "@/features/Check-email.tsx";
import { ForgotPassword } from "@/features/Forgot-password.tsx";
import Packs from "@/features/packs/Packs.tsx";
import { Profile } from "@/features/Profile/Profile.tsx";
import { CreateNewPassword } from "@/features/Set-new-password.tsx";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
            path: "/packs",
            element: <Packs />,
          },
        ],
      },
    ],
  },
]);
