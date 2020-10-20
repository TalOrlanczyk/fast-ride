import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PINandRideContext } from "../../../contextAPI/PinAndRideContext";
import { ConvertToArray } from "../../../utils/numberUtils";
import { getCalculationForASCII } from "../../../utils/stringUtils";
import Tooltip from "../../Tooltip/Tooltip";

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
    if (ownTickects > 0) {
      return "can't have more then one tickte in a given time";
    } else if (isPinUnValid(pinInput)) {
      return "Invalid PIN format";
    } else {
      return;
    }
  };

  const handleSubmit = () => {
    history.push("/SubmitedOrder");
  };
  return (
    <>
      <Tooltip title={TooltipSubmit()}>
        <button
          className="submit-button"
          onClick={() => handleSubmit()}
          disabled={isPinUnValid(pinInput) || ownTickects > 0 || RideID === 0}
        >
          Submit
        </button>
      </Tooltip>
    </>
  );
};
export default PCSubmit;
