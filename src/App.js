import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllRides } from './api/FastRider';
import { ConvertToArray } from './utils/numberUtils';
import { getCalculationForASCII } from './utils/stringUtils';
import ticket_g from './images/ticket_g.png';
import clock_g from './images/clock_g.png';
import Tooltip from './Components/Tooltip/Tooltip';
import { PINandRideContext } from './contextAPI/PinAndRideContext';
import HomePage from './Components/HomePage/HomePage';

const { Provider } = PINandRideContext;
const App = () => {
  const [rideID, setRideID] = useState(0);
  const PinGenerator = () => {
    let tempFirst4digit = Math.floor(1000 + Math.random() * 9000);
    let tempSecond4digit = Math.floor(1000 + Math.random() * 9000);
    let FirstLeter = getCalculationForASCII(ConvertToArray(tempFirst4digit), 1);
    let SecondLetter = getCalculationForASCII(ConvertToArray(tempSecond4digit), 1);
    return `JN-${tempFirst4digit}-${tempSecond4digit}-${FirstLeter + SecondLetter}`
  };

  return (
    <Provider value={{PIN:PinGenerator(),RideID:rideID,HandleIdUpdater: (id)=>setRideID(id)}}>
        <HomePage/>
    </Provider>
  );
}

export default App;
