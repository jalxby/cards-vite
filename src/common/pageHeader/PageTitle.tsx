import { BackArrowIcon } from "@/assets/BackArrowIcon";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
type PropsType = {
  title: string;
};
export const PageTitle: FC<PropsType> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
        <BackArrowIcon />
        {" Back to Packs List"}
      </div>
      <h3>{title}</h3>
    </div>
  );
};
