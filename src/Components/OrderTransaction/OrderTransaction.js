import React, { useContext, useEffect } from 'react';
import { postGetRideTicket } from '../../api/FastRider';
import { PINandRideContext } from '../../contextAPI/PinAndRideContext';

const OrderTransaction = () => {
    const { PIN,RideID,HandleOwnTickets,HandleIdUpdater } = useContext(PINandRideContext);
    useEffect(()=>{
        postGetRideTicket(PIN,RideID)
        .then(response => {
            HandleOwnTickets(response.data.return_time);
            HandleIdUpdater(0)
        })
    },[])
    return <h1>d</h1>
}

export default OrderTransaction;