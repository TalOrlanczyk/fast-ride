import React, { useContext, useEffect, useState } from "react";
import ticket from "../../images/ticket.png";
import clock from "../../images/clock.png";
import submit from "../../images/submit.png";
import { PINandRideContext } from "../../contextAPI/PinAndRideContext";
import RideCards from "../RidesCard/RidesCard";
import SubmitRide from "../SubmitRide/SubmitRide";
import ExplainCard from "../ExplainCard/ExplainCard";

const HomePage = () => {
  return (
    <div className="App">
      <div className="App-header p1 App-header-grid">
        <ExplainCard
          img={ticket}
          imgAlt="ticket"
          content="Enter you park ticket #PIN number, then select the desired ride
        while noting the started return time"
        />

        <ExplainCard
          img={submit}
          imgAlt="submit"
          content=" Press 'submit' to confirm and retrieve your access code"
        />

        <ExplainCard
          img={clock}
          imgAlt="clock"
          content="When the time comes comes use the special FastRider line to cut out
          a considerable wait time"
        />
        
      </div>
      <SubmitRide/>
      <RideCards />
    </div>
  );
};

export default HomePage;
