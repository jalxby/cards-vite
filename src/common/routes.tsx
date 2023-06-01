import { SignIn } from "@/features/auth/Sign-in/Sign-in.tsx";
import { SignUp } from "@/features/auth/Sign-up/Sign-up.tsx";
import { CheckEmail } from "@/features/Check-email.tsx";
import { ForgotPassword } from "@/features/Forgot-password.tsx";
import Packs from "@/features/Packs.tsx";
import { Profile } from "@/features/Profile/Profile.tsx";
import { CreateNewPassword } from "@/features/Set-new-password.tsx";

const basePath = "/cards-vite";
export const routes = [
  {
    path: `${basePath}`,
    element: <Packs />,
  },
  {
    path: `${basePath}/signup`,
    element: <SignUp />,
  },
  {
    path: `${basePath}/signin`,
    element: <SignIn />,
  },
  {
    path: `${basePath}/forgotpassword`,
    element: <ForgotPassword />,
  },
  {
    path: `${basePath}/checkemail`,
    element: <CheckEmail />,
  },
  {
    path: `${basePath}/profile`,
    element: <Profile />,
  },
  {
    path: `${basePath}/createnewpass/:token`,
    element: <CreateNewPassword />,
  },
  {
    path: "*",
    element: <div>404 not found</div>,
  },
];
