import React, { useContext, useEffect, useState } from "react";
import approval from "../../images/approval.png";
import { postGetRideTicket } from "../../api/FastRider";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import ExplainCard from "../ExplainCard/ExplainCard";

const OrderTransaction = () => {
  const { PIN, RideID, HandleOwnTickets, HandleIdUpdater } = useContext(
    PINandRideContext
  );
  const [RideOrder, setRideOrder] = useState({});
  useEffect(() => {
    postGetRideTicket(PIN, RideID).then((response) => {
      HandleOwnTickets(response.data.return_time);
      HandleIdUpdater(0);
      setRideOrder(response);
    });
  }, []);
  return (
    <div className="flex-center">
      <ExplainCard
        cardClassName="half-width"
        img={approval}
        imgAlt="approval"
        content="Thanks you for using the Jungle™ FastRider Service ticket system -
        your access code is now ready!"
      />
    </div>
  );
};

export default OrderTransaction;
