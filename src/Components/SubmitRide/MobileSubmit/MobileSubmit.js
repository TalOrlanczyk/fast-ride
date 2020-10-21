import React, { useEffect, useState } from "react";
import "./MobileSubmit.css";

const MobileSubmit = ({ onSubmit, isDisabled, children }) => {
  const [isHide, setIsHide] = useState(true);
  let prev = 0;

  useEffect(() => {
    window.addEventListener("scroll", () => hideBar());

    return () => {
      window.removeEventListener("scroll", () => hideBar());
    };
  }, []);

  const hideBar = () => {
    if (window.scrollY > prev && window.scrollY >= 0) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
    if (window.scrollY >= 0) prev = window.scrollY;
  };

  return (
    <>
      <button
        className={`Submit-mobile ${
          isDisabled ? "text-grayish" : "text-white"
        } ${isHide ? "hide" : "active"}`}
        disabled={isDisabled}
        onClick={() => onSubmit()}
      >
        {children}
      </button>
    </>
  );
};
export default MobileSubmit;
