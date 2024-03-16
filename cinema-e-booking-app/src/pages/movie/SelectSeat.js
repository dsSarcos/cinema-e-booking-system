import React, {useState, useEffect} from 'react';
import "./SelectSeat.css";
import {Ticket} from './Ticket';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

export const SelectSeat = () => {

    const {id} = useParams();
    const location = useLocation();
    const {movie, showtime, adultNum, childNum, seniorNum, totalNumTickets, totalPrice, discount, promotionalCode} = location.state;
    const [remainingNum, setRemainingNum] = useState(totalNumTickets);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const [takenSeats, setTakenSeats] = useState([]);

    useEffect(() => {
        setupInitialData();
    }, []);

    const setupInitialData = async () => {
        const bookings = await (await fetch('http://localhost:3000/api/bookings')).json()
        const filteredBookings = bookings.filter(booking => booking.MovieTitle.includes(id) && booking.ShowDate === showtime.ShowDate && booking.ShowTime === showtime.ShowTime);


        const seatsTaken = filteredBookings.reduce((seats, booking) => {
            const seatsArray = booking.Seats.split(",");
            return [...seats, ...seatsArray];
        }, []);

        setTakenSeats(seatsTaken);

        console.log(seatsTaken);

    }

    const selectSeat = (e) => {
        e.preventDefault();
        let copyOfSelectedSeats = [...selectedSeats];
        // add seat
        if (!copyOfSelectedSeats.includes(e.target.value)) {
            if (copyOfSelectedSeats.length >= totalNumTickets) {
                return;
            }
            copyOfSelectedSeats.push(e.target.value);
            setRemainingNum(prev => {
                return prev - 1;
            })
        } else { // remove seat
            copyOfSelectedSeats = copyOfSelectedSeats.filter(seat => seat !== e.target.value)
            setRemainingNum(prev => {
                return prev + 1;
            })
        }

        const seat = e.target.value;
        const isSelected = e.target.isSelected;
        if (!isSelected) {
            setSelectedSeats([...selectedSeats, seat]);
            e.target.isSelected = true;
        } else {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            e.target.isSelected = false;
        }
        setSelectedSeats(copyOfSelectedSeats);
    }

    const legend = () => {
        return (
            <div className="seat-selection-legend">
                <div className="seat-selection-legend-entry">
                    <h5>Available: <button id="green-entry" disabled={true}>___</button></h5>
                </div>
                <div className="seat-selection-legend-entry">
                    <h5>Selected: <button id="red-entry" disabled={true}>___</button></h5>
                </div>
                <div className="seat-selection-legend-entry">
                    <h5>Unavailable: <button id="gray-entry" disabled={true}>___</button></h5>
                </div>
            </div>
        );
    }

    return (
        <div className="select-seat">
            <div className='panel-container'>
                <h3 className="panel-title">Seats</h3>
                <hr/>
                {legend()}
                <hr/>
                <table>
                    <tbody>
                    <tr>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("A1") ? "gray" : selectedSeats.includes("A1") ? "red" : "green"}`}} disabled={takenSeats.includes("A1")} onClick={selectSeat} value="A1" id="seat">A1</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("A2") ? "gray" : selectedSeats.includes("A2") ? "red" : "green"}`}} disabled={takenSeats.includes("A2")} onClick={selectSeat} value="A2" id="seat">A2</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("A3") ? "gray" : selectedSeats.includes("A3") ? "red" : "green"}`}} disabled={takenSeats.includes("A3")} onClick={selectSeat} value="A3" id="seat">A3</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("A4") ? "gray" : selectedSeats.includes("A4") ? "red" : "green"}`}} disabled={takenSeats.includes("A4")} onClick={selectSeat} value="A4" id="seat">A4</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("A5") ? "gray" : selectedSeats.includes("A5") ? "red" : "green"}`}} disabled={takenSeats.includes("A5")} onClick={selectSeat} value="A5" id="seat">A5</Button></td>
                    </tr>

                    <tr>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("B1") ? "gray" : selectedSeats.includes("B1") ? "red" : "green"}`}} disabled={takenSeats.includes("B1")} onClick={selectSeat} value="B1" id="seat">B1</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("B2") ? "gray" : selectedSeats.includes("B2") ? "red" : "green"}`}} disabled={takenSeats.includes("B2")} onClick={selectSeat} value="B2" id="seat">B2</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("B3") ? "gray" : selectedSeats.includes("B3") ? "red" : "green"}`}} disabled={takenSeats.includes("B3")} onClick={selectSeat} value="B3" id="seat">B3</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("B4") ? "gray" : selectedSeats.includes("B4") ? "red" : "green"}`}} disabled={takenSeats.includes("B4")} onClick={selectSeat} value="B4" id="seat">B4</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("B5") ? "gray" : selectedSeats.includes("B5") ? "red" : "green"}`}} disabled={takenSeats.includes("B5")} onClick={selectSeat} value="B5" id="seat">B5</Button></td>
                    </tr>
                    <tr>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("C1") ? "gray" : selectedSeats.includes("C1") ? "red" : "green"}`}} disabled={takenSeats.includes("C1")} onClick={selectSeat} value="C1" id="seat">C1</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("C2") ? "gray" : selectedSeats.includes("C2") ? "red" : "green"}`}} disabled={takenSeats.includes("C2")} onClick={selectSeat} value="C2" id="seat">C2</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("C3") ? "gray" : selectedSeats.includes("C3") ? "red" : "green"}`}} disabled={takenSeats.includes("C3")} onClick={selectSeat} value="C3" id="seat">C3</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("C4") ? "gray" : selectedSeats.includes("C4") ? "red" : "green"}`}} disabled={takenSeats.includes("C4")} onClick={selectSeat} value="C4" id="seat">C4</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("C5") ? "gray" : selectedSeats.includes("C5") ? "red" : "green"}`}} disabled={takenSeats.includes("C5")} onClick={selectSeat} value="C5" id="seat">C5</Button></td>
                    </tr>
                    <tr>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("D1") ? "gray" : selectedSeats.includes("D1") ? "red" : "green"}`}} disabled={takenSeats.includes("D1")} onClick={selectSeat} value="D1" id="seat">D1</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("D2") ? "gray" : selectedSeats.includes("D2") ? "red" : "green"}`}} disabled={takenSeats.includes("D2")} onClick={selectSeat} value="D2" id="seat">D2</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("D3") ? "gray" : selectedSeats.includes("D3") ? "red" : "green"}`}} disabled={takenSeats.includes("D3")} onClick={selectSeat} value="D3" id="seat">D3</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("D4") ? "gray" : selectedSeats.includes("D4") ? "red" : "green"}`}} disabled={takenSeats.includes("D4")} onClick={selectSeat} value="D4" id="seat">D4</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("D5") ? "gray" : selectedSeats.includes("D5") ? "red" : "green"}`}} disabled={takenSeats.includes("D5")} onClick={selectSeat} value="D5" id="seat">D5</Button></td>
                    </tr>
                    <tr>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("E1") ? "gray" : selectedSeats.includes("E1") ? "red" : "green"}`}} disabled={takenSeats.includes("E1")} onClick={selectSeat} value="E1" id="seat">E1</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("E2") ? "gray" : selectedSeats.includes("E2") ? "red" : "green"}`}} disabled={takenSeats.includes("E2")} onClick={selectSeat} value="E2" id="seat">E2</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("E3") ? "gray" : selectedSeats.includes("E3") ? "red" : "green"}`}} disabled={takenSeats.includes("E3")} onClick={selectSeat} value="E3" id="seat">E3</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("E4") ? "gray" : selectedSeats.includes("E4") ? "red" : "green"}`}} disabled={takenSeats.includes("E4")} onClick={selectSeat} value="E4" id="seat">E4</Button></td>
                        <td><Button sx={{color: "white", backgroundColor: `${takenSeats.includes("E5") ? "gray" : selectedSeats.includes("E5") ? "red" : "green"}`}} disabled={takenSeats.includes("E5")} onClick={selectSeat} value="E5" id="seat">E5</Button></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <div id="selected-seats">
                    <h5>Seats Remaining: <strong>{remainingNum}</strong></h5>
                    <h5>Selected Seats: <strong>{selectedSeats.join(', ')}</strong></h5>
                    {selectedSeats.length === totalNumTickets ?
                        <Link to="checkout" state={{movie, showtime, selectedSeats, totalPrice, adultNum, childNum, seniorNum, totalNumTickets, discount, promotionalCode}}>
                            <button id="confirm-seats-button">Confirm</button>
                        </Link> : <button id="not-selected-seats-button" disabled={true}>Confirm</button>
                    }
                </div>
            </div>
        </div>
    );
}

