import { SignIn } from "@/features/auth/Sign-in/Sign-in.tsx";
import { SignUp } from "@/features/auth/Sign-up/Sign-up.tsx";
import { CheckEmail } from "@/features/Check-email.tsx";
import { ForgotPassword } from "@/features/Forgot-password.tsx";
import Packs from "@/features/Packs.tsx";
import { Profile } from "@/features/Profile/Profile.tsx";
import { CreateNewPassword } from "@/features/Set-new-password.tsx";

export const routes = [
  {
    path: "/cards-vite",
    element: <Packs />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/checkEmail",
    element: <CheckEmail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cards-vite/createnewpass/:token",
    element: <CreateNewPassword />,
  },
  {
    path: "/*",
    element: <div>404 not found</div>,
  },
];
