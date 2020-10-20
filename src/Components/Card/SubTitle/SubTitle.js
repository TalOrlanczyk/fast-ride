import React from "react";

const SubTitle = ({style,title, titleColorClass, titleFloatSideClass}) => {
  return (
    <div
      style={style}
    >
      <span className={`${titleFloatSideClass ? titleFloatSideClass : "float-right"} ${titleColorClass ? titleColorClass: "text-grayish"}`}>{title}</span>
    </div>
  );
};

export default SubTitle;
