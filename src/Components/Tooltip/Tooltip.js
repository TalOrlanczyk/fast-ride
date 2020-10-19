import React from 'react'
import styles from './Tooltip.module.css'
const Tooltip = ({ title,children }) => {
    return (
        <div className={styles.tooltip}>
            {children}
            {title && <span className={styles.tooltiptext}>{title}</span>}
        </div>
    )
}
export default Tooltip
