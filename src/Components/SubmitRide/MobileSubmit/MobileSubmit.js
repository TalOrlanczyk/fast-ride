import React, { useContext, useEffect, useState } from 'react';
import { PINandRideContext } from '../../../contextAPI/PinAndRideContext';
import { ConvertToArray } from '../../../utils/numberUtils';
import { getCalculationForASCII } from '../../../utils/stringUtils';
import Tooltip from '../../Tooltip/Tooltip';

const MobileSubmit = () => {
    const { PIN,ownTickects } = useContext(PINandRideContext);
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


    const TooltipSubmit = () => {
        if (ownTickects > 0) {
            return "can't have more then one tickte in a given time";
        } else if (isPinUnValid(pinInput)){
            return "Invalid input insert";
        } else{
            return;
        }
    }
    return (
        <>
            {!isHide && (
                    <Tooltip title={TooltipSubmit()}>
                        <button  className="Submit-mobile" onClick={() => { console.log("rin") }} disabled={isPinUnValid(pinInput) || ownTickects > 0}>
                            Submit
                        </button>
                    </Tooltip>
            )}
        </>
    )
}
export default MobileSubmit;