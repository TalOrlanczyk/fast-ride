import React, { useContext, useEffect, useState } from 'react';
import { PINandRideContext } from '../../contextAPI/PinAndRideContext';
import Spiner from '../Spiner/Spiner';
import ticket_g from '../../images/ticket_g.png';
import clock_g from '../../images/clock_g.png';
import { getAllRides } from '../../api/FastRider';
import Tooltip from '../Tooltip/Tooltip';

const RideCards = () => {
    const { RideID, HandleIdUpdater, HandleOwnTicets } = useContext(PINandRideContext);
    const [rides, setRides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllRides()
            .then(response => {
                setRides(response.data);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    const FormateDateTime = (date) => {
        return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    }
    if (isLoading) return <Spiner />
    return (
        <div className="cards-grid-template">
            {
                rides.map(ride => (
                   
                        <div key={ride.id} className="card card-bg" onClick={ride.remaining_tickets !== 0 ? () => HandleIdUpdater(ride.id): null} style={RideID === ride.id ? { backgroundColor: `${ride.zone.color}` } : null}>
                            <div style={ride.remaining_tickets !== 0 ? { borderTop: `5px solid ${ride.zone.color}` } : { borderTop: `5px solid #555858` }}>
                                <span className="float-right text-grayish">{ride.zone.name}</span>
                            </div>
                            <div className="card-title">
                                <h1 className="text-white text-center">{ride.name}</h1>
                            </div>
                            {ride.remaining_tickets === 0 ? (
                                <div>
                                    <span className="text-grayish text-center">Out of tickets</span>
                                </div>
                            ): null}
                            <div className="flex-row ps-button max-prec-width text-center pb-1">
                                <div className="ticket-contatiner half-width">
                                    <img className="image-small" src={ticket_g} alt="number of ticket left" />
                                    <span className="text-grayish va-middle">{ride.remaining_tickets}</span>
                                </div>
                                <div className="clock-contatiner  half-width ">
                                    <img className="image-small" src={clock_g} alt="next ride in" />
                                    <span className="text-grayish va-middle">{FormateDateTime(ride.return_time)}</span>
                                </div>
                            </div>
                        </div>
                    
                ))
            }
        </div>
    )
}
export default RideCards;