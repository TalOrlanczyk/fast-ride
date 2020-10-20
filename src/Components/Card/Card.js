import React from "react";
import SubTitle from "./SubTitle/SubTitle";
import Title from "./Title/Title";
import './Card.css'

const Card = ({ children, handleOnClick, cardSizeClass, style }) => {
  return (
    <div
      className={`card card-bg ${cardSizeClass ? cardSizeClass : ""}`}
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
