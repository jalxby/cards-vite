import { useAppSelector } from "@/common/hooks/hooks.ts";
import { selectToken } from "@/features/auth/auth.selectors.ts";
import { Navigate } from "react-router-dom";

const Packs = () => {
  const token = useAppSelector(selectToken);
  if (!token) {
    return <Navigate to={"/signin"} />;
  }
  return <div>Packs</div>;
};

export default Packs;
