import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PINandRideContext } from "../../../contextAPI/PinAndRideContext";
import { ConvertToArray } from "../../../utils/numberUtils";
import { getCalculationForASCII } from "../../../utils/stringUtils";
import Tooltip from "../../Tooltip/Tooltip";
import submit_g from "../../../images//submit_g.png";
import submit from "../../../images//submit.png";
import "./MobileSubmit.css";

const MobileSubmit = ({ pinInput }) => {
  const { RideID, ownTickects } = useContext(PINandRideContext);
  const [isHide, setIsHide] = useState(true);
  let history = useHistory();
  let prev = 0;
  // let d= window.innerWidth/screen.width;
  
  useEffect(() => {
    window.addEventListener("scroll", () => hideBar());
    return () => {
      window.removeEventListener("scroll", () => hideBar());

    };
  }, []);


  const hideBar = () => {
    if (window.scrollY > prev) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }

    prev = window.scrollY;
  };
  const isPinUnValid = (PIN) => {
    let tempPinArr = PIN.split("-");
    if (tempPinArr.length !== 4) return true;
    if (tempPinArr[0] !== "JN") return true;
    let FirstLeter = getCalculationForASCII(ConvertToArray(tempPinArr[1]), 1);
    let SecondLetter = getCalculationForASCII(ConvertToArray(tempPinArr[2]), 1);
    if (
      PIN !==
      `JN-${tempPinArr[1]}-${tempPinArr[2]}-${FirstLeter + SecondLetter}`
    )
      return true;
    return false;
  };

  const handleSubmit = () => {
    history.push({
      pathname: "/SubmitedOrder",
      state: { pinCode: pinInput },
    });
  };
  return (
    <>
      {isPinUnValid(pinInput) || ownTickects > 0 || RideID === 0 ? (
        <button
          className={`Submit-mobile text-grayish ${isHide ? "hide" : "active"}`}
          disabled={true}
        >
          Submit
          <img className="image-small" src={submit_g} alt="submit icon" />
        </button>
      ) : (
        <button
          className={`Submit-mobile text-white ${isHide ? "hide" : "active"}`}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
          <img className="image-small" src={submit} alt="submit icon" />
        </button>
      )}
    </>
  );
};
export default MobileSubmit;
