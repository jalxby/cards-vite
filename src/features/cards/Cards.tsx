import React, { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { cardsThunks } from "@/features/cards/cards.slice.ts";
import { NavLink } from "react-router-dom";
import { PacksHeader } from "@/features/packs/PacksHeader.tsx";

const Cards = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsThunks.getCards());
  }, []);
  return (
    <div>
      <PacksHeader addButtonTitle={"Add new card"} title={"PackTitle"} />
      Cards
    </div>
  );
};

export default Cards;
