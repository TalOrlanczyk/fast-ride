import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PINandRideContext } from "../../../contextAPI/PinAndRideContext";
import { ConvertToArray } from "../../../utils/numberUtils";
import { getCalculationForASCII } from "../../../utils/stringUtils";
import submit_g from "../../../images//submit_g.png";
import submit from "../../../images//submit.png";
import Tooltip from "../../Tooltip/Tooltip";
import "./PCSubmit.css";

const PCSubmit = ({ pinInput }) => {
  const { PIN, ownTickects, RideID } = useContext(PINandRideContext);
  let history = useHistory();
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

  const TooltipSubmit = () => {
    if (ownTickects > 0)
      return "can't have more then one tickte in a given time";
    else if (isPinUnValid(pinInput)) return "Invalid PIN format";
    else if (RideID === 0) return "please pick one ride to submit";
    else return;
  };

  const handleSubmit = () => {
    history.push({
      pathname:'/SubmitedOrder',
      state: {pinCode: pinInput}})
  };
  return (
    <>
      <Tooltip title={TooltipSubmit()}>
        {isPinUnValid(pinInput) || ownTickects > 0 || RideID === 0 ? (
          <button className="submit-button text-grayish" disabled={true}>
            Submit
            <img className="image-small" src={submit_g} alt="submit icon" />
          </button>
        ) : (
          <button
            className="submit-button  text-white"
            onClick={() => handleSubmit()}
          >
            Submit
            <img className="image-small" src={submit} alt="submit icon" />
          </button>
        )}
      </Tooltip>
    </>
  );
};
export default PCSubmit;
