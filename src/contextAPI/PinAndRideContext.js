import { createContext } from "react";
export const PINandRideContext = createContext({
    PIN: "",
    RideID: 0,
    ownTickects: 0,
    HandleOwnTickets: () => {},
    HandleIdUpdater: () => {}
});
