import React, { useContext, useEffect, useState } from "react";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import Spiner from "../Spiner/Spiner";
import ticket_g from "../../images/ticket_g.png";
import clock_g from "../../images/clock_g.png";
import { getAllRides } from "../../api/FastRider";
import Tooltip from "../Tooltip/Tooltip";
import Card from "../Card/Card";
import { FormateDateTime } from "../../utils/dateUtils";

const RideCards = () => {
  const { RideID, HandleIdUpdater, HandleOwnTicets } = useContext(
    PINandRideContext
  );
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllRides()
      .then((response) => {
        setRides(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spiner />;
  return (
    <div className="cards-grid-template">
      {rides.map((ride) => (
        <Card
          key={ride.id}
          handleOnClick={
            ride.remaining_tickets !== 0 ? () => HandleIdUpdater(ride.id) : null
          }
          style={
            RideID === ride.id
              ? { backgroundColor: `${ride.zone.color}` }
              : null
          }
        >
          <Card.SubTitle
            title={ride.zone.name}
            style={
              ride.remaining_tickets !== 0
                ? { borderTop: `5px solid ${ride.zone.color}` }
                : { borderTop: `5px solid #555858` }
            }
          />
          <Card.Title title={ride.name} />
          {ride.remaining_tickets === 0 ? (
            <div>
              <span className="text-grayish text-center">Out of tickets</span>
            </div>
          ) : null}
          <div className="flex-row ps-button max-prec-width text-center pb-1">
            <div className="icon-contatiner half-width">
              <img
                className="image-small"
                src={ticket_g}
                alt="number of ticket left"
              />
              <span className="text-grayish va-middle">
                {ride.remaining_tickets}
              </span>
            </div>
            <div className="icon-contatiner  half-width ">
              <img className="image-small" src={clock_g} alt="next ride in" />
              <span className="text-grayish va-middle">
                {FormateDateTime(ride.return_time)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RideCards;
