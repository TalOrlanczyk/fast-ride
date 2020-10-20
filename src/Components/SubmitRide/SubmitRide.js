import React, { useContext, useEffect, useState } from 'react';
import { PINandRideContext } from '../../contextAPI/PinAndRideContext';
import { IsMobile } from '../../utils/gadgetUtils';
import { ConvertToArray } from '../../utils/numberUtils';
import { getCalculationForASCII } from '../../utils/stringUtils';
import Tooltip from '../Tooltip/Tooltip';
import MobileSubmit from './MobileSubmit/MobileSubmit';
import PCSubmit from './PCSubmit/PCSubmit.js';

const SubmitRide = () => {
    const { PIN } = useContext(PINandRideContext);
    const [pinInput, setPinInput] = useState("");
  
    const pinInputHandler = (e) => {
        if ((e.currentTarget.value).length === 2 || (e.currentTarget.value).length === 7 || (e.currentTarget.value).length === 12)
            setPinInput(e.currentTarget.value + '-');
        else
            setPinInput(e.currentTarget.value);
    };
    const HandleDelete = (e) => {
        if (e.key === "Backspace")
            if ((e.currentTarget.value).length === 3 || (e.currentTarget.value).length === 8 || (e.currentTarget.value).length === 13) {

                setPinInput(pinInput.substring(0, pinInput.length - 2));
            }
    };

    return (
        <div>
            <input placeholder="PIN" className={IsMobile() ?"input-height-mobile":"input-height" } value={pinInput} onChange={(e) => pinInputHandler(e)} maxLength={15} onKeyUp={(e) => HandleDelete(e)} />
            {IsMobile() ? <MobileSubmit pinInput={pinInput}/> : <PCSubmit pinInput={pinInput}/>}
            {/* <MobileSubmit/> */}
        </div>
    )
}
export default SubmitRide;