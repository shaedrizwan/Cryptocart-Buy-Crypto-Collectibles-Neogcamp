import React from 'react'
import Failed from "../assets/failed.png"
import "../stylesheets/failure.css"

function FailedOrder() {
    return (
        <div className="failed-order">
            <div className="icon-container">
                <img className="failed-icon" src={Failed} alt="failed"/>
            </div>
            <div className="failed-details-container">
                Failed to place your order! Please recheck your payment details.
            </div>
        </div>
    )
}

export default FailedOrder
