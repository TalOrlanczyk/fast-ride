import axios from "axios";

export const getAllRides = async () => {
    return await axios.get(`http://fast-rider.herokuapp.com/api/v1/rides?token=${process.env.REACT_APP_FASTRIDER_API_KEY}`);
}