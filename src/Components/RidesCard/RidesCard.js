import React, { useContext, useEffect, useState } from "react";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import Spiner from "../Spiner/Spiner";
import ticket_g from "../../images/ticket_g.png";
import clock_g from "../../images/clock_g.png";
import { getAllRides } from "../../api/FastRider";
import Card from "../Card/Card";
import { FormateDateTime, setTimeOutHandler, SortByDate } from "../../utils/dateUtils";
import "./RideCards.css";

const RideCards = () => {
  const { RideID, HandleIdUpdater } = useContext(PINandRideContext);
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let tempData = [];
    const getRides = () => {
      getAllRides()
        .then((response) => {
          response.data.sort(function (a, b) {
            return a.id - b.id;
          });
          tempData = [...response.data];
          setRides(response.data);
        })
        .finally(() => {
          setIsLoading(false);
          let mostEarlyRide = tempData.sort((a, b) => {
            return SortByDate(a.return_time, b.return_time);
          });
          setTimeOutHandler(mostEarlyRide[0].return_time, ()=> {
            getRides();
          }, 60000)
        });
    };
    getRides();
  }, []);

  if (isLoading) return <Spiner />;
  return (
    <div className="cards-grid-template">
      {rides.map((ride) => (
        <Card
          key={ride.id}
          handleOnClick={
            ride.remaining_tickets !== 0
              ? RideID === 0
                ? () => HandleIdUpdater(ride.id)
                : () => HandleIdUpdater(0)
              : null
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
            <div className="text-center font-bold">
              <h3 className="text-light-gray">Out of tickets</h3>
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
