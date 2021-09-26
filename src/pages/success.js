import React from 'react'
import "../stylesheets/success.css"
import Success from "../assets/success.png"

function SuccessOrder() {
    return (
        <div className="success-order">
            <div className="icon-container">
                <img className="success-icon" src={Success} alt="success"/>
            </div>
            <div className="details-container">
                Your Order has been successfully placed successfully!
            </div>
        </div>
    )
}

export default SuccessOrder
