import { React, useEffect, useState } from "react";
import "./OrderOverlay.css";

const OrderOverlay = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/bookings");
        const allBookings = await response.json();
        setBookings(allBookings.filter((booking) => booking.Email === userEmail));
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, [userEmail]);

  const addOrder = () => {
    const reversedBookings = [...bookings].reverse(); // Reverse the bookings array
    return reversedBookings.map((booking) => (
      <div key={booking.ID} id="order">
        <hr></hr>
        <h3 id="text-label">{booking.MovieTitle}</h3>
        <div id="text-label">Number of Tickets: {booking.NumberOfTickets}</div>
        <div id="text-label">Date: {booking.ShowDate}</div>
        <div id="text-label">Showtime: {booking.ShowTime} PM</div>
        <div id="text-label">Total Price: ${booking.TotalPrice.toFixed(2)}</div>
      </div>
    ));
  };

  return <div id="order-container"><h1>Order History: </h1>{addOrder()}</div>;
};

export default OrderOverlay;
