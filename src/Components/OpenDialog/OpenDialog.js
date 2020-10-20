import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import OverlayDialog from "../OverlayDialog/OverlayDialog";
import Tooltip from "../Tooltip/Tooltip";
import './OpenDialog.css'

const OpenDialog = ({ open, setOpen, PIN }) => {
  return (
    <>
      {open && (
        <OverlayDialog onClose={() => setOpen(false)}>
          <div className="Dialog-Container text-white">
            <div className="float-right full-width">
              <button className="dialog-button-close" onClick={() => setOpen(false)} >
                <FontAwesomeIcon
                  icon={faTimes}
                  color="white"
                />
              </button>
            </div>
            <div className="Dialog-expanin">
              <span className="float-left ">Your Pin Code is:</span>
            </div>
            <Tooltip title="click to copy to clipboard">
              <div className="card-title float-left">
                <h1 id="PIN" className=" text-center">
                  {PIN}
                </h1>
              </div>
            </Tooltip>
            <div className="card-title float-left ">
              <span>
                <strong>Remember</strong> you need to keep this PIN code to
                order the ticket
              </span>
            </div>
          </div>
        </OverlayDialog>
      )}
    </>
  );
};

export default OpenDialog;
