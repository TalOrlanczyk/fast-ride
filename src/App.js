import React, { useEffect, useState } from 'react';
import './App.css';
import { ConvertToArray } from './utils/numberUtils';
import { getCalculationForASCII } from './utils/stringUtils';
import { PINandRideContext } from './contextAPI/PinAndRideContext';
import HomePage from './Components/HomePage/HomePage';
import OverlayDialog from './Components/OverlayDialog/OverlayDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Components/Tooltip/Tooltip';

const { Provider } = PINandRideContext;
const App = () => {
  const [rideID, setRideID] = useState(0);
  const [PIN, setPIN] = useState("");
  const [ownTicktes, setOwnTickets] = useState(0);
  const [open, setOpen] = useState(true);
  const PinGenerator = () => {
    let tempFirst4digit = Math.floor(1000 + Math.random() * 9000);
    let tempSecond4digit = Math.floor(1000 + Math.random() * 9000);
    let FirstLeter = getCalculationForASCII(ConvertToArray(tempFirst4digit), 1);
    let SecondLetter = getCalculationForASCII(ConvertToArray(tempSecond4digit), 1);
    return `JN-${tempFirst4digit}-${tempSecond4digit}-${FirstLeter + SecondLetter}`
  };
  const HandleSubmitedTickes = (returnTime) => {
    setOwnTickets(1);
    let dateWaited = new Date(returnTime);
    let milisecondToWait = dateWaited.getTime() - Date.now();
    setTimeout(() => console.log("rin"), milisecondToWait)
  };

  const copyToClipboard = () => {
    // let pin = document.getElementById("PIN");
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById("PIN"));
      range.select().createTextRange();
      document.execCommand("copy");
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById("PIN"));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      alert("Text has been copied, now paste in the text-area")
    }
    document.execCommand("copy");
  }
  useEffect(() => {
    setPIN(PinGenerator());
  }, [])
  return (
    <>
      {open && (

        <OverlayDialog onClose={() => setOpen(false)}>
          <div className="Dialog-Container text-white">
              <div className="float-right full-width">
                <FontAwesomeIcon icon={faTimes} color="white" onClick={() => setOpen(false)} />
              </div>
            <div className="Dialog-expanin">
              <span className="float-left ">Your Pin Code is:</span>
            </div>
            <Tooltip title="click to copy to clipboard">
              <div className="card-title float-left" onClick={()=>copyToClipboard()}>
                <h1 id="PIN" className=" text-center">{PIN}</h1>
              </div>
            </Tooltip>
            <div className="card-title float-left ">
              <span><strong>Remember</strong> you need to keep this PIN code to order the ticket</span>
            </div>
          </div>

        </OverlayDialog>
      )}
      <Provider value={{
        PIN: PIN,
        RideID: rideID,
        ownTickects: ownTicktes,
        HandleOwnTicets: (date) => HandleSubmitedTickes(date),
        HandleIdUpdater: (id) => setRideID(id)
      }}>
        <HomePage />
      </Provider>
    </>
  );
}

export default App;
