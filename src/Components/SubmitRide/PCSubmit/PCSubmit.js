import React from "react";
import "./PCSubmit.css";

const PCSubmit = ({ onClick, isDisabled = false, children }) => {
  return (
    <>
      <button
        className={`submit-button ${
          isDisabled ? "text-grayish" : "text-white"
        } ps-absolute`}
        disabled={isDisabled}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  );
};
export default PCSubmit;
