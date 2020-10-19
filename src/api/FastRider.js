import axios from "axios";
const HOST_NAME = 'http://fast-rider.herokuapp.com/api';
const HOST_VERSION = 'v1'
export const getAllRides = async () => {
    return await axios.get(`${HOST_NAME}/${HOST_VERSION}/rides?token=${process.env.REACT_APP_FASTRIDER_API_KEY}`);
}

export const postGetRideTicket = async (pin,ride_id) =>{
    return await axios.post(`http://fast-rider.herokuapp.com/api/v1/tickets?token=${process.env.REACT_APP_FASTRIDER_API_KEY}`,{
        pin,
        ride_id
    })
}