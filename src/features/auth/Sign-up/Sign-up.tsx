import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { authThunks } from "@/features/auth/auth.slice.ts";
import s from "./Signup.module.scss";

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    let email = "ja@gmail.com";
    let password = "password";
    dispatch(authThunks.signUp({ email, password }));
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
