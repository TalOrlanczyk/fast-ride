import { createContext } from "react";
export const PINandRideContext = createContext({
    PIN: "",
    RideID: 0,
    ownTickects: 1,
    HandleOwnTicets: () => {},
    HandleIdUpdater: () => {}
});
