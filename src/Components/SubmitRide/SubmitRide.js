import React, { useContext, useEffect, useState } from "react";
import "./SubmitRide.css";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import { IsMobile } from "../../utils/gadgetUtils";
import MobileSubmit from "./MobileSubmit/MobileSubmit";
import PCSubmit from "./PCSubmit/PCSubmit.js";
import { useHistory } from "react-router-dom";
import { isPinUnValid } from "../../utils/stringUtils";
import submit from "../../images/submit.png";
import submit_g from "../../images/submit_g.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import InfoSnackbar from "../InfoSnackbar/InfoSnackbar";

const SubmitRide = () => {
  const { PIN, RideID, ownTickects } = useContext(PINandRideContext);
  const [pinInput, setPinInput] = useState("");
  let history = useHistory();
  useEffect(() => {
    setPinInput(PIN);
  }, [PIN]);
  const pinInputHandler = (e) => {
    if (
      e.currentTarget.value.length === 2 ||
      e.currentTarget.value.length === 7 ||
      e.currentTarget.value.length === 12
    )
      setPinInput(e.currentTarget.value + "-");
    else setPinInput(e.currentTarget.value);
  };
  const HandleDelete = (e) => {
    let tempInput = pinInput;
    if (e.key === "Backspace")
      if (
        e.currentTarget.value.length === 3 ||
        e.currentTarget.value.length === 8 ||
        e.currentTarget.value.length === 13
      ) {
        setPinInput(tempInput.substring(0, tempInput.length - 2));
      }
  };
  const handleSubmit = () => {
    history.push({
      pathname: "/SubmitedOrder",
      state: { pinCode: pinInput },
    });
  };
  const TooltipSubmit = () => {
    if (ownTickects > 0)
      return "can't have more then one tickte in a given time";
    else if (isPinUnValid(pinInput)) return "Invalid PIN format";
    else if (RideID === 0) return "please pick one ride to submit";
    else return;
  };
  const checkIsDisabled = () => {
    if (isPinUnValid(pinInput) || ownTickects > 0 || RideID === 0) return true;
    else return false;
  };
  return (
    <>
      {checkIsDisabled() ? (
        <InfoSnackbar content={TooltipSubmit()}/>
      ) : null}
      <div className="text-center p1">
        <input
          placeholder="PIN"
          className={IsMobile() ? "input-height-mobile" : "input-height"}
          value={pinInput}
          onChange={(e) => pinInputHandler(e)}
          maxLength={15}
          onKeyUp={(e) => HandleDelete(e)}
        />
        {IsMobile() ? (
          <MobileSubmit onClick={handleSubmit} isDisabled={checkIsDisabled()}>
            Submit
            {checkIsDisabled() ? (
              <img className="image-small" src={submit_g} alt="submit icon" />
            ) : (
              <img className="image-small" src={submit} alt="submit icon" />
            )}
          </MobileSubmit>
        ) : (
          <PCSubmit onClick={handleSubmit} isDisabled={checkIsDisabled()}>
            Submit
            {checkIsDisabled() ? (
              <img className="image-small" src={submit_g} alt="submit icon" />
            ) : (
              <img className="image-small" src={submit} alt="submit icon" />
            )}
          </PCSubmit>
        )}
      </div>
    </>
  );
};
export default SubmitRide;
