import { NavigateFunction } from "react-router-dom";
//object makes possible to use hook useNavigate in axios interceptors
export const globalRouter = { navigate: null } as {
  navigate: null | NavigateFunction;
};
