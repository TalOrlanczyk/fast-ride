import React from "react";
import SubTitle from "./SubTitle/SubTitle";
import Title from "./Title/Title";
import './Card.css'
import { IsMobile } from "../../utils/gadgetUtils";

const Card = ({ children, handleOnClick, cardSizeClass, style }) => {
  return (
    <div
      className={`card card-bg ${cardSizeClass ? cardSizeClass : ""} ${IsMobile()? "card-moblie":"card"}`}
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
