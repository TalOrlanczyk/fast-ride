import React, { useContext, useEffect, useState } from "react";
import approval from "../../images/approval.png";
import { postGetRideTicket } from "../../api/FastRider";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import ExplainCard from "../ExplainCard/ExplainCard";
import Card from "../Card/Card";
import Spiner from "../Spiner/Spiner";
import { useHistory } from "react-router-dom";
import { FormateDateTime } from "../../utils/dateUtils";
import './OrderTransaction.css'

const OrderTransaction = () => {
  const {
    PIN,
    RideID,
    ownTickects,
    HandleOwnTickets,
    HandleIdUpdater,
  } = useContext(PINandRideContext);
  const [RideOrder, setRideOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (RideID !== 0 && ownTickects === 0) {
      postGetRideTicket(PIN, RideID)
        .then((response) => {
          HandleOwnTickets(response.data.return_time);
          HandleIdUpdater(0);
          setRideOrder(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      history.push("/");
    }
  }, []);
  if (isLoading) return <Spiner />;
  return (
    <div className="div">
      <div className="flex-center">
        <ExplainCard
          cardClassName="width-for-containers"
          img={approval}
          imgAlt="approval"
          content="Thanks you for using the Jungle™ FastRider Service ticket system -
        your access code is now ready!"
        />
      </div>
      <div className="flex-center">
        <Card cardSizeClass="width-for-containers">
            <Card.SubTitle
              title={RideOrder.ride.zone.name}
              style={{ borderTop: `5px solid ${RideOrder.ride.zone.color}` }}
            />
            <Card.SubTitle
              title={RideOrder.ride.name}
              titleFloatSideClass="none"
              titleColorClass="text-white"
            />
          <div className="p1 text-center">
            <span className="text-grayish">Returm At</span>
            <h1 className="text-white font-bold no-margin">
              {FormateDateTime(RideOrder.return_time)}
            </h1>
          </div>
          <div className="p1 text-center">
            <span className="text-grayish">Use Access Code</span>
            <h1 className="text-white font-bold no-margin">
              {RideOrder.access_code}
            </h1>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderTransaction;
