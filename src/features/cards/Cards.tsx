import React, { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/hooks.ts";
import { cardsThunks } from "@/features/cards/cards.slice.ts";
import { NavLink } from "react-router-dom";

const Cards = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cardsThunks.getCards());
  }, []);
  return (
    <div>
      <NavLink to={"/packs"}>{"<--- Back to Packs List"}</NavLink>
      Cards
    </div>
  );
};

export default Cards;
