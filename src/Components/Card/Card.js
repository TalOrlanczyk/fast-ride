import React from "react";
import SubTitle from "./SubTitle/SubTitle";
import Title from "./Title/Title";
import './Card.css'
import { IsMobile } from "../../utils/gadgetUtils";
import clsx from "clsx";

const Card = ({ children, handleOnClick, cardSizeClass, style }) => {
  return (
    <div
      className={clsx("card", "card-bg", [cardSizeClass ? cardSizeClass : ""] ,[IsMobile()? "card-moblie":""])}
      onClick={handleOnClick ? () => handleOnClick() : null}
      style={style}
    >
      {children}
    </div>
  );
};
Card.SubTitle = SubTitle;
Card.Title = Title;
export default Card;
