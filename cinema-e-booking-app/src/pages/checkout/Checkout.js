import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./Checkout.css";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { getPaymentInfo } from "../api/api";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Checkout = () => {

  const { user } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cardNotSelectedMsg, setCardNotSelectedMsg] = useState(false);
  const {movie, showtime, selectedSeats, totalPrice, adultNum, childNum, seniorNum, totalNumTickets, discount, promotionalCode} = location.state;
  const processingFee = 1.95;
  const adultPrice = adultNum * 10.95;
  const childPrice = childNum * 8.95;
  const seniorPrice = seniorNum * 8.95;
  const subtotal = adultPrice + childPrice + seniorPrice;
  const finalPrice = parseFloat(((subtotal * (1 - discount / 100)) + processingFee).toFixed(2));
  const [paymentInfo, setPaymentInfo]= useState({
    HomeAddr: "",
    HomeCity: "",
    HomeState: "",
    HomeZip: "",
    BillingAddr1: "",
    BillingCity1: "",
    BillingState1: "",
    BillingZip1: "",
    BillingAddr2: "",
    BillingCity2: "",
    BillingState2: "",
    BillingZip2: "",
    BillingAddr3: "",
    BillingCity3: "",
    BillingState3: "",
    BillingZip3: "",
    CardNumber1: "",
    ExpMonth1: "",
    ExpYear1: "",
    CardNumber2: "",
    ExpMonth2: "",
    ExpYear2: "",
    CardNumber3: "",
    ExpMonth3: "",
    ExpYear3: ""
  });

  const [card1, setCard1] = useState({
    cardNumber: "",
    lastDigits: "",
    maskedCardNumber: ""
  })

  const [card2, setCard2] = useState({
    cardNumber: "",
    lastDigits: "",
    maskedCardNumber: ""
  })

  const [booking, setBooking] = useState({
    MovieTitle: movie.Title,
    NumberOfTickets: totalNumTickets,
    ShowDate: showtime.ShowDate,
    ShowTime: showtime.ShowTime,
    TotalPrice: finalPrice,
    CardNumber: "",
    Seats: selectedSeats.join(','),
    Email: user.Email,
    PromotionID: promotionalCode,
  });

  const [card3, setCard3] = useState({
    cardNumber: "",
    lastDigits: "",
    maskedCardNumber: ""
  })

  const [selectedCard, setSelectedCard] = useState('');

  const message = "You have not selected a card for payment.";

  const cardNotSelectedHandler = (msg) => {
    if (cardNotSelectedMsg === true) {
      setCardNotSelectedMsg(false);
    } else {
      setCardNotSelectedMsg(true);
    }
}

  const handleCardSelection = (event) => {
    setSelectedCard(event.target.value);
    const cardName = event.target.value;
  
    const cardMapping = {
      card1: card1,
      card2: card2,
      card3: card3,
    };

    const selectedCardInfo = cardMapping[cardName];
    setBooking(prevBooking => ({
      ...prevBooking,
      CardNumber: selectedCardInfo.maskedCardNumber
    }));
  };

  useEffect(() => {
    getPaymentInfo(user.ID).then((paymentInfo) => {
      setPaymentInfo(paymentInfo);
      if (paymentInfo.CardNumber1 !== null) {
        setCard1({
          cardNumber: paymentInfo.CardNumber1,
          lastDigits: paymentInfo.CardNumber1.slice(-4),
          maskedCardNumber: `****${paymentInfo.CardNumber1.slice(-4)}`,
        });
      }
      if (paymentInfo.CardNumber2 !== null) {
        setCard2({
          cardNumber: paymentInfo.CardNumber2,
          lastDigits: paymentInfo.CardNumber2.slice(-4),
          maskedCardNumber: `****${paymentInfo.CardNumber2.slice(-4)}`,
        });
      }
      if (paymentInfo.CardNumber3 !== null) {
        setCard3({
          cardNumber: paymentInfo.CardNumber3,
          lastDigits: paymentInfo.CardNumber3.slice(-4),
          maskedCardNumber: `****${paymentInfo.CardNumber3.slice(-4)}`,
        });
      }
    })
  }, [user]);
  

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

  //const form = useRef();
  /*
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_kdgdjjf', 'template_6c2oo33', form.current, '7E9K7TZjbQ4Pa2R3T')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    };
    */
  
  const orderSummary = () => {
    return (
      <div>
        <div className="checkout-info">
          <h3>Tickets</h3>
          <table>
            <thead>
              <tr>
                <th>Age Group</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Adult</th>
                <th>{adultNum}</th>
                <th>${adultPrice.toFixed(2)}</th>
              </tr>
              <tr>
                <th>Child</th>
                <th>{childNum}</th>
                <th>${childPrice.toFixed(2)}</th>
              </tr>
              <tr>
                <th>Senior</th>
                <th>{seniorNum}</th>
                <th>${seniorPrice.toFixed(2)}</th>
              </tr>
            </tbody>
          </table>
          <br/>
          <div id="subtotal">
            <h3>Subtotal</h3>
            <strong><p>${subtotal.toFixed(2)}</p></strong>
          </div>
          {hasDiscount()}
          <div id="subtotal">
            <h3>Processing Fee</h3>
            <strong><p>${processingFee}</p></strong>
          </div>
          <div id="subtotal">
            <h3>Total</h3>
            <strong><p>${finalPrice}</p></strong>
          </div>
        </div>
      </div>
      )
  }

  const hasDiscount = () => {
    if (discount !== 0) {
      return (
        <div id="subtotal">
            <h3>Discount</h3>
            <strong><p>{discount}%</p></strong>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  const selectCard = () => {
    return (
      <div>
        <h3>Select Card for Payment:</h3>
        {displayCards()}
        <hr/>
      </div>
    )
  }

  const displayCards = () => {
    if (card1.cardNumber !== "" && card2.cardNumber === "" && card3.cardNumber === "") {
      return (
        <div>
          <label className={selectedCard === 'card1' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card1" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 1</p>
                <p>{card1.maskedCardNumber}</p>
              </div>
          </label>
        </div>
      )
    } else if (card1.cardNumber !== "" && card2.cardNumber !== "" && card3.cardNumber === "") {
      return (
        <div>
          <label className={selectedCard === 'card1' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card1" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 1</p>
                <p>{card1.maskedCardNumber}</p>
              </div>
          </label>
          <label className={selectedCard === 'card2' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card2" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 2</p>
                <p>{card2.maskedCardNumber}</p>
              </div>
          </label>
        </div>
      )
    } else if (card1.cardNumber !== "" && card2.cardNumber !== "" && card3.cardNumber !== "") {
      return (
        <div>
          <label className={selectedCard === 'card1' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card1" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 1</p>
                <p>{card1.maskedCardNumber}</p>
              </div>
          </label>
          <label className={selectedCard === 'card2' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card2" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 2</p>
                <p>{card2.maskedCardNumber}</p>
              </div>
          </label>
          <label className={selectedCard === 'card3' ? 'card-selector-selected' : 'card-selector'}>
            <input type="radio" name="selectedCard" value="card3" onChange={handleCardSelection}/>
              <div id="card-selector-content">
                <p>Card 3</p>
                <p>{card3.maskedCardNumber}</p>
              </div>
          </label>
        </div>
      )
    }
  }

  const handleCompleteOrder = async () => {
    if (selectedCard === '') {
      setCardNotSelectedMsg(true);
      return false;
    } else {
    
      fetch('http://localhost:3000/api/bookings/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      })
      return true;
    }
  }

  const handleClick = async () => {
    const success = await handleCompleteOrder();
    if (success) {
      navigate(`/browse/movie/${id}/order/tickets/select-seat/checkout/order-confirmation`);
    }
  };

  return(
    <div className="checkout">
      <div className='panel-container'>
      <h1 className='panel-title'>CHECKOUT</h1>
      <hr/>
      <div className="checkout-movie-info">
        <h3>{movie.Title}</h3>
        <p>Seating for <strong>{convertDate(showtime.ShowDate)}</strong> at <strong>{convertTimeTo12HrFormat(showtime.ShowTime)}</strong></p>
        <p>Showing in <strong>Room {showtime.RoomNumber}</strong></p>
        <p>Selected Seats: <strong>{selectedSeats.join(', ')}</strong></p>
      </div>
        <hr/>
        {orderSummary()}
        {selectCard()}
        <div className="order-buttons">
          <button id="order-button" onClick={handleClick}>Complete Order</button>
          <Link to="home"><button id="order-button">Cancel Order</button></Link>
        </div>
      </div>
      {cardNotSelectedMsg && (
            <div id="prompt">
                <div className="panel-container" id="add-movie-confirmation">
                    <p>{message}</p>
                    <button id="add-movie-button" onClick={cardNotSelectedHandler}>OK</button>
                </div>
            </div>
      )}
    </div>
  );
}

export default Checkout;