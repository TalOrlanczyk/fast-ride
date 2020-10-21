import clsx from "clsx";
import React from "react";
import "./PCSubmit.css";

const PCSubmit = ({ onClick, isDisabled = false, children }) => {
  return (
    <>
      <button
        className={clsx("submit-button", [
          isDisabled ? "text-grayish" : "text-white"
         ], "ps-absolute")}
        disabled={isDisabled}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  );
};
export default PCSubmit;
