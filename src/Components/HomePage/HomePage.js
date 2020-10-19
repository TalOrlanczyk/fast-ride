import React, { useContext, useEffect, useState } from 'react';
import { getAllRides } from '../../api/FastRider';
import { ConvertToArray } from '../../utils/numberUtils';
import { getCalculationForASCII } from '../../utils/stringUtils';
import ticket_g from '../../images/ticket_g.png';
import clock_g from '../../images/clock_g.png';
import Tooltip from '../Tooltip/Tooltip';
import { PINandRideContext } from '../../contextAPI/PinAndRideContext';


const HomePage = () => {
    const { PIN } = useContext(PINandRideContext);
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pinInput, setPinInput] = useState("");
    useEffect(() => {
        getAllRides()
            .then(response => {
                setRides(response.data);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

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
    }
    const test = (e) => {
        if (e.key === "Backspace")
            if ((e.currentTarget.value).length === 3 || (e.currentTarget.value).length === 8 || (e.currentTarget.value).length === 13) {

                setPinInput(pinInput.substring(0, pinInput.length - 2));
            }
    }
    if (isLoading) return <h1>d</h1>
    return (
        <div className="App">
            <div>
                <input placeholder="PIN" className="input-height" value={pinInput} onChange={(e) => pinInputHandler(e)} maxLength={15} onKeyUp={(e) => test(e)} />
                <Tooltip title={isPinUnValid(pinInput) ? "Invalid input insert" : null}>
                    <button onClick={() => { console.log("rin") }} disabled={isPinUnValid(pinInput)}>
                        Submit
          </button>
                </Tooltip>
            </div>
            <div className="cards-grid-template">

                {
                    rides.map(ride => (
                        <div key={ride.id} className="card card-bg">
                            <div style={{ borderTop: `5px solid ${ride.zone.color}` }}>
                                <span className="float-right text-grayish">{ride.zone.name}</span>
                            </div>
                            <div className="card-title">
                                <h1 className="text-white text-center">{ride.name}</h1>
                            </div>
                            <div className="flex-row ps-button max-prec-width text-center pb-1">
                                <div className="ticket-contatiner half-width">
                                    <img className="image-small" src={ticket_g} alt="number of ticket left" />
                                    <span className="text-grayish va-middle">{ride.remaining_tickets}</span>
                                </div>
                                <div className="clock-contatiner  half-width ">
                                    <img className="image-small" src={clock_g} alt="next ride in" />
                                    <span className="text-grayish va-middle">{ride.remaining_tickets}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HomePage;
