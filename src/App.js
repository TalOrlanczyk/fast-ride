import React, { useEffect, useState } from "react";
import "./App.css";
import { ConvertToArray } from "./utils/numberUtils";
import { getCalculationForASCII } from "./utils/stringUtils";
import { PINandRideContext } from "./contextAPI/PinAndRideContext";
import HomePage from "./Components/HomePage/HomePage";
import OverlayDialog from "./Components/OverlayDialog/OverlayDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faTimes } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./Components/Tooltip/Tooltip";
import { Redirect, Route, Switch } from "react-router-dom";
import OrderTransaction from "./Components/OrderTransaction/OrderTransaction";
import OpenDialog from "./Components/OpenDialog/OpenDialog";

const { Provider } = PINandRideContext;
const App = () => {
  const [rideID, setRideID] = useState(0);
  const [PIN, setPIN] = useState("");
  const [ownTicktes, setOwnTickets] = useState(0);
  const [open, setOpen] = useState(true);
  const [isServiceClose, setIsServiceClose] = useState(true);

  const PinGenerator = () => {
    let tempFirst4digit = Math.floor(1000 + Math.random() * 9000);
    let tempSecond4digit = Math.floor(1000 + Math.random() * 9000);
    let FirstLeter = getCalculationForASCII(ConvertToArray(tempFirst4digit), 1);
    let SecondLetter = getCalculationForASCII(
      ConvertToArray(tempSecond4digit),
      1
    );
    return `JN-${tempFirst4digit}-${tempSecond4digit}-${
      FirstLeter + SecondLetter
    }`;
  };
  const HandleSubmitedTickes = (returnTime) => {
    setOwnTickets(1);
    let dateWaited = new Date(returnTime);
    let milisecondToWait = dateWaited.getTime() - Date.now();
    setTimeout(() => {
      setOwnTickets(0);
      setRideID(0);
    }, milisecondToWait);
  };

  const CheckifCloseTime = () => {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5);
    let currentHourUTC = currentDate.getUTCHours();
    if (currentHourUTC < 9 || currentHourUTC >= 19) setIsServiceClose(true);
  };
  useEffect(() => {
    CheckifCloseTime();
    setPIN(PinGenerator());
  }, []);
  return (
    <>
      <h1 className="text-center text-white">The Jungle™ FastRider Service</h1>
      {!isServiceClose ? (
        <>
          <OpenDialog PIN={PIN} open={open} setOpen={setOpen} />
          <Provider
            value={{
              PIN: PIN,
              RideID: rideID,
              ownTickects: ownTicktes,
              HandleOwnTickets: (date) => HandleSubmitedTickes(date),
              HandleIdUpdater: (id) => setRideID(id),
            }}
          >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/SubmitedOrder" component={OrderTransaction} />
              <Redirect from="*" to="/" />
            </Switch>
          </Provider>
        </>
      ) : (
        <>
        <div className="text-center text-white font-bold"><h2>Sorry but the service is close right now </h2></div>
        <div className="text-center text-white font-bold "><h3>The service work between: 9:00 - 19:00 UTC</h3></div>
        </>
      )}
    </>
  );
};

export default App;
