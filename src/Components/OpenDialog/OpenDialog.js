import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { IsMobile } from "../../utils/gadgetUtils";
import OverlayDialog from "../OverlayDialog/OverlayDialog";
import Tooltip from "../Tooltip/Tooltip";
import './OpenDialog.css'

const OpenDialog = ({ PIN }) => {
  const [open, setOpen] = useState(true);
  const CopyToClipboard = (containerid) => {
    let r = document.createRange();
    r.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    if (!document.getElementById("Copied")) {
      let div = document.createElement("div");
      div.innerHTML = "Copied to clipboard";
      div.id = "Copied";
      document.getElementById("PIN-Contanier").appendChild(div);
      setTimeout(() => {
        if (document.getElementById("PIN-Contanier"))
          document.getElementById("PIN-Contanier").removeChild(div);
      }, 2500);
    }
  };
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
            <Tooltip title={!IsMobile() && "click to copy to clipboard"}>
              <div id="PIN-Contanier" className="card-title float-left" onClick={()=>CopyToClipboard('PIN')}>
                <h1 id="PIN" className=" text-center">
                  {PIN}
                </h1>
              </div>
            </Tooltip>
            <div className="card-title float-left ">
              <span>
                <strong>Remember</strong> you need to keep this PIN code to
                order the ticket (the PIN code inserted already and can change in any time)
              </span>
            </div>
          </div>
        </OverlayDialog>
      )}
    </>
  );
};

export default OpenDialog;
