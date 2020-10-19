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
    const [isHide, setIsHide] = useState(true);
    const [pinInput, setPinInput] = useState("");
    let prev;
    useEffect(() => {
        window.addEventListener('scroll', () => hideBar());
        return () => {
            window.removeEventListener('scroll', () => hideBar());
        }
    }, []);
    const hideBar = () => {
        window.scrollY > prev ? setIsHide(true) : setIsHide(false)

        prev = window.scrollY;
    };
    const isPinUnValid = (PIN) => {
        let tempPinArr = PIN.split("-");
        if (tempPinArr.length === 0)
            return true;
        if (tempPinArr[0] !== "JN")
            return true;
        let FirstLeter = getCalculationForASCII(ConvertToArray(tempPinArr[1]), 1);
        let SecondLetter = getCalculationForASCII(ConvertToArray(tempPinArr[2]), 1);
        if (PIN !== `JN-${tempPinArr[1]}-${tempPinArr[2]}-${FirstLeter + SecondLetter}`)
            return true;
        return false;
    };

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
            <input placeholder="PIN" className="input-height" value={pinInput} onChange={(e) => pinInputHandler(e)} maxLength={15} onKeyUp={(e) => HandleDelete(e)} />
            {IsMobile() ? <MobileSubmit/> : <PCSubmit/>}
        </div>
    )
}
export default SubmitRide;