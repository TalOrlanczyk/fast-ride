import React, { useContext, useEffect, useState } from 'react';
import { getAllRides } from '../../api/FastRider';
import { ConvertToArray } from '../../utils/numberUtils';
import { getCalculationForASCII } from '../../utils/stringUtils';
import ticket_g from '../../images/ticket_g.png';
import clock_g from '../../images/clock_g.png';
import Tooltip from '../Tooltip/Tooltip';
import { PINandRideContext } from '../../contextAPI/PinAndRideContext';
import RideCards from '../RidesCard/RidesCard';
import SubmitRide from '../SubmitRide/SubmitRide';


const HomePage = () => {
    const { PIN } = useContext(PINandRideContext);
    return (
        <div className="App">
           <SubmitRide/>
            <RideCards />
        </div>
    );
}

export default HomePage;
