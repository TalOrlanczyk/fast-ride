import React from "react";
import './SubTitle.css'
const SubTitle = ({style,title, titleColorClass, titleFloatSideClass}) => {
  return (
    <div
      style={style}
    >
      <span className={`${titleFloatSideClass ? titleFloatSideClass : "float-right"} ${titleColorClass ? titleColorClass: "text-grayish"} span-padding`}>{title}</span>
    </div>
  );
};

export default SubTitle;
