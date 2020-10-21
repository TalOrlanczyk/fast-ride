import React, { useEffect, useState } from "react";
import "./MobileSubmit.css";

const MobileSubmit = ({ onClick, isDisabled, children }) => {
  const [isHide, setIsHide] = useState(true);
  
  useEffect(() => {
    let prev = 0;
    const hideBar = () => {
      if (window.scrollY > prev && window.scrollY >= 0) setIsHide(true);
      else setIsHide(false);
  
      if (window.scrollY >= 0) prev = window.scrollY;
    };
    window.addEventListener("scroll", () => hideBar());

    return () => {
      window.removeEventListener("scroll", () => hideBar());
    };
  }, []);

  return (
    <>
      <button
        className={`Submit-mobile ${
          isDisabled ? "text-grayish" : "text-white"
        } ${isHide ? "hide" : "active"}`}
        disabled={isDisabled}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  );
};
export default MobileSubmit;
