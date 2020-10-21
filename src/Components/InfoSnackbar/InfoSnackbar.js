import React from "react";
import "./InfoSnackbar.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoSnackbar = ({ content }) => {
  return (
    <div className="info text-white m-auto text-center br-4">
      {content}
      <FontAwesomeIcon
        className="float-left"
        icon={faInfoCircle}
        color="#99bfda"
      />
    </div>
  );
};
export default InfoSnackbar;
