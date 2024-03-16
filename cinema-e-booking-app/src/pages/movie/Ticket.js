import React, { useState, useEffect } from 'react';
import { Link, useLocation}  from 'react-router-dom';
import "./Ticket.css";

// Movie Order Info Object
/*
{
    movieId: 1,
    movieTime:
    movieDate: 
    numTicket: 2
}
*/

export const Ticket = () => {

    const location = useLocation();
    const {movie, showtime} = location.state;

    const [adultNum, setAdultNum] = useState(0);
    const [childNum, setChildNum] = useState(0);
    const [seniorNum, setSeniorNum] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [childPrice, setChildPrice] = useState(0);
    const [seniorPrice, setSeniorPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [promotionalCode, setPromotionalCode] = useState("");
    const [promotionID, setPromotionID] = useState("N/A");
    const [discount, setDiscount] = useState(0);
    const [promotionConfirmationMsg, setPromotionConfirmationMsg] = useState(false);
    const [promotionMsg, setPromotionMsg] = useState('');


    function calculateSubtotal() {
        const subtotal = (adultNum * adultPrice) + (childNum * childPrice) + (seniorNum * seniorPrice);
        setSubtotal(subtotal);
        setTotalPrice(((subtotal*(1 - discount / 100))));
    }

    useEffect(() => {
        setAdultPrice(10.95);
        setChildPrice(8.95);
        setSeniorPrice(8.95);
        calculateSubtotal();
    }, []);

    useEffect(() => {
        calculateSubtotal();
    }, [adultNum, childNum, seniorNum, promotionalCode, discount]);

    function addAdultTicket() {
        setAdultNum(prev => {
            return prev + 1;
        })
    }

    function removeAdultTicket() {
        if (adultNum === 0) {

        } else {
            setAdultNum(prev => {
                return prev - 1;
            });
        }
    }

    function addChildTicket() {
        setChildNum(prev => {
            return prev + 1;
        });
    }

    function removeChildTicket() {
        if (childNum === 0) {

        } else {
            setChildNum(prev => {
                return prev - 1;
            });
        }
    }

    function addSeniorTicket() {
        setSeniorNum(prev => {
            return prev + 1;
        });
    }

    function removeSeniorTicket() {
        if (seniorNum === 0) {

        } else {
            setSeniorNum(prev => {
                return prev - 1;
            });
        }
    }

    function convertTimeTo12HrFormat(time) {
        let timeArr = time.split(':');
        let hours = parseInt(timeArr[0]);
        let minutes = timeArr[1];
        let meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${meridiem}`;
    }

    function convertDate(date) {
        const newDate = date.substr(5);
        return newDate
    }

    const selectTickets = () => {
        return (
            <>
            <div className="select-tickets-table">
                <table>
                    <thead>
                        <tr>
                            <th>Age Group</th>
                            <th>Ticket Price</th>
                            <th/>
                            <th>Quantity</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Adult</td>
                            <td>${adultPrice.toFixed(2)}</td>
                            <td><button className="increment-tickets-button" onClick={removeAdultTicket}>-</button></td>
                            <td><a id="adultTickets">{adultNum}</a></td>
                            <td><button className="increment-tickets-button" onClick={addAdultTicket}>+</button></td>
                        </tr>
                        <tr>
                            <td>Child</td>
                            <td>${childPrice.toFixed(2)}</td>
                            <td><button className="increment-tickets-button" onClick={removeChildTicket}>-</button></td>
                            <td><a id="childTickets">{childNum}</a></td>
                            <td><button className="increment-tickets-button" onClick={addChildTicket}>+</button></td>
                        </tr>
                        <tr>
                            <td>Senior</td>
                            <td>${seniorPrice.toFixed(2)}</td>
                            <td><button className="increment-tickets-button" onClick={removeSeniorTicket}>-</button></td>
                            <td><a id="seniorTickets">{seniorNum}</a></td>
                            <td><button className="increment-tickets-button" onClick={addSeniorTicket}>+</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
        )
    }

    const promotionForm = () => {
        return (
                <label>
                    <p>Promotion:
                    <input id="text-field" type="text" name="promo" placeholder='Enter code here...' value={promotionalCode} onChange={(e) => setPromotionalCode(e.target.value)}/>
                    <button id="apply-promotion-button" onClick={applyPromotionHandler}>Apply</button>
                    </p>
                </label>
        )
    }

    const applyPromotionHandler = () => {
        fetch('http://localhost:3000/api/promotions')
        .then(response => response.json())
        .then(data => {
            const validPromotion = data.find(promo => promo.Code === promotionalCode.toLowerCase());
            if (!validPromotion) {
                setPromotionMsg("Promotion does not exist.");
                promotionConfirmationHandler();
            } else {
                const currentDate = new Date();
                const promotionStartDate = new Date(validPromotion.StartDate);
                const promotionEndDate = new Date(validPromotion.EndDate);
            if (promotionEndDate.getTime() < currentDate.getTime()) {
                setPromotionMsg("This promotion has expired.");
                promotionConfirmationHandler();
            } else if (currentDate.getTime() < promotionStartDate.getTime()) {
                setPromotionMsg("This promotion has not started.");
                promotionConfirmationHandler();
            } else {
                setPromotionMsg("Promotion applied!");
                setDiscount(()=> {return validPromotion.Discount});
                setTotalPrice(((subtotal*(1 - discount / 100))));
                setPromotionID(()=> {return validPromotion.Code});
                promotionConfirmationHandler();
            }
            setPromotionalCode('');
        }})
        .catch(error => console.error(error));
    }

    const promotionConfirmationHandler = (msg) => {
        if (promotionConfirmationMsg === true) {
            setPromotionConfirmationMsg(false);
        } else {
            setPromotionConfirmationMsg(true);
        }
    }

    const displayTotalPrice = () => {
        return(
            <div className="total-price-section">
                <h5>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h5>
            </div>
        )
    }

    return (
        <div id="tickets-and-pricing-container">
            <div className="panel-container">
            <h1 className="panel-title">Tickets & Pricing</h1>
            <hr/>
            <div className="tickets-and-pricing-movie-info">
                <h3>{movie.Title}</h3>
                <p>Seating
                    for <strong>{convertDate(showtime.ShowDate)}</strong> at <strong>{convertTimeTo12HrFormat(showtime.ShowTime)}</strong>
                </p>
                <p>Showing in <strong>Room {showtime.RoomNumber}</strong></p>
            </div>
            <hr/>
            {selectTickets()}
            {promotionForm()}
            {displayTotalPrice()}
            <Link to={'select-seat'} state={{
                movie,
                showtime,
                adultNum,
                childNum,
                seniorNum,
                totalNumTickets: adultNum + childNum + seniorNum,
                totalPrice: totalPrice.toFixed(2),
                discount: discount,
                promotionalCode: promotionID
            }}>
                <button id="confirm-ticket-button">Confirm</button>
            </Link>
            </div>
            {promotionConfirmationMsg && (
            <div id="prompt">
                <div className="panel-container" id="add-movie-confirmation">
                    <p>{promotionMsg}</p>
                    <button id="add-movie-button" onClick={promotionConfirmationHandler}>OK</button>
                </div>
            </div>
        )}
        </div>
    );
}

