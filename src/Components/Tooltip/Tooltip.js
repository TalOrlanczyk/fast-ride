import React from "react";
import styles from "./Tooltip.module.css";
const Tooltip = ({ title, position, children }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      {title && (
        <span
          className={
            position === "right" ? styles.tooltiptext_right : styles.tooltiptext
          }
        >
          {title}
        </span>
      )}
    </div>
  );
};
export default Tooltip;
