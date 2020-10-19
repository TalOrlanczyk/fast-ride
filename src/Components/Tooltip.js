import React from 'react'

const Tooltip = ({ title,children }) => {
    return (
        <div className="tooltip">
            {children}
            {title && <span className="tooltiptext">{title}</span>}
        </div>
    )
}
export default Tooltip
