import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PINandRideContext } from '../../../contextAPI/PinAndRideContext';
import { ConvertToArray } from '../../../utils/numberUtils';
import { getCalculationForASCII } from '../../../utils/stringUtils';
import Tooltip from '../../Tooltip/Tooltip';
import './MobileSubmit.css'

const MobileSubmit = ({pinInput}) => {
    const { RideID, ownTickects } = useContext(PINandRideContext);
    const [isHide, setIsHide] = useState(true);
    let history = useHistory();
    let prev = 0;
    useEffect(() => {
        window.addEventListener('scroll', ()=>hideBar());
        return () => {
            window.removeEventListener('scroll',() =>hideBar());
        }
    }, []);
    const hideBar = () => {
        if (window.scrollY > prev) {
            setIsHide(true)
        }
        else {

             setIsHide(false)
        }


        prev = window.scrollY;
    };
    const isPinUnValid = (PIN) => {
        let tempPinArr = PIN.split("-");
        if (tempPinArr.length !== 4)
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
    }
    return (
        <>
            
                <Tooltip title={TooltipSubmit()}>
                    <button className={`Submit-mobile ${isHide ? "hide" : "active"}`} onClick={() => { handleSubmit() }} disabled={isPinUnValid(pinInput) || ownTickects > 0}>
                        Submit
                        </button>
                </Tooltip>
            
        </>
    )
}
export default MobileSubmit;