import { useAppSelector } from "@/common/hooks/hooks.ts";
import { globalRouter } from "@/common/utils/globalRouter.ts";
import { selectToken } from "@/features/auth/auth.selectors.ts";
import { Navigate, useNavigate } from "react-router-dom";

const Packs = () => {
  globalRouter.navigate = useNavigate();
  const token = useAppSelector(selectToken);
  if (!token) {
    return <Navigate to={"/signin"} />;
  }
  return <div>Packs</div>;
};

export default Packs;
