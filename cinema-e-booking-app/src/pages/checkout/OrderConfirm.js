import React from "react";
import './Checkout.css';

const OrderConfirm = () => {
    return (
        <div className="order-confirmation">
            <div className="panel-container">
                <h1>ORDER CONFIRMATION</h1>
                <hr/>
                <p>Thank you for purchasing your ticket!</p>
                <p>You should receive a confirmation email in regards to your purchase.</p>
            </div>
        </div>
    );
}

export default OrderConfirm;