import {useEffect, useState} from "react";
import React from "react";
import './SchedMovies.css';

export const SchedMovies = () => {
    const [ConflictErrorMsg, setConflictErrorMsg] = useState(null);
    const [scheduleConfirmationMsg, setScheduleConfirmationMsg] = useState(false);
    const [RoomErrorMsg, setRoomErrorMsg] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [showInfo, setShowInfo] = useState({
        ShowDate: "",
        ShowTime: "",
        ShowDuration: "",
        Title: "",
        RoomNumber: ""
    });

    useEffect(() => {
        getShows();
        getMovies();
    }, []);

    const getShows = () => {
        fetch('http://localhost:3000/api/shows')
        .then(response => response.json())
        .then(shows => setShows(shows))
        .catch(error => console.error(error));
    };

    const getMovies = () => {
        fetch('http://localhost:3000/api/movies')
        .then(response => response.json())
        .then(movies => setMovies(movies))
        .catch(error => console.error(error));
    };

    const handleMovieChange = (event) => {
        const movie = movies.find(movie => movie.Title === event.target.value);
        setSelectedMovie(movie);
        setShowInfo({...showInfo, Title: movie.Title, ShowDuration: movie.Runtime})
    };

    const handleChange = (event) => {
        setShowInfo({...showInfo, [event.target.name]: event.target.value});
    };

    const roomCheck = (num) => {
        if ((num < 1 || num > 4)) {
            return false;
        } else {
            return true;
        }
    }
    
    const conflictCheck = (date, time, room) => {
        for (let i of shows) {
            // may need to add if showtime is within the duration as well
            if (date == i.ShowDate && time == i.ShowTime && room == i.RoomNumber) {
                return false;
            } // if
        } // for
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (roomCheck(showInfo.RoomNumber) == true) {
            setRoomErrorMsg(null);
            if (conflictCheck(showInfo.ShowDate, showInfo.ShowTime, showInfo.RoomNumber) == true) {
                setConflictErrorMsg(null);
                console.log(JSON.stringify(showInfo))
                fetch('http://localhost:3000/api/shows/add', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(showInfo)
                })
                .then(data => data.json())
                .then((show) => {
                    console.log('New showing was added.');
                    console.log(JSON.stringify(show));
                    setShowInfo({
                        ShowDate: "",
                        ShowTime: "",
                        ShowDuration: "",
                        Title: "",
                        RoomNumber: ""
                    })
                setSelectedMovie(null)
                getShows();
                })
                .then(()=> {
                    scheduleConfirmationHandler();
                })
            } else {
                setConflictErrorMsg("This showing conlficts with another. Change at least either the show date, time, or room.");
            }
        } else {
            setRoomErrorMsg("Please enter a room number between 1 and 4.");
        }
    }

    const scheduleConfirmationHandler = () => {
        if (scheduleConfirmationMsg === true) {
            setScheduleConfirmationMsg(false);
        } else {
            setScheduleConfirmationMsg(true);
        }
    }


    return (
        <><div className="SchedMovies">
            <h1>SCHEDULE MOVIE</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Select a movie:</p>
                    <br />
                    <input
                        list = "options"
                        value = {selectedMovie?.Title}
                        onChange = {handleMovieChange}
                        id= "title-field"
                    />
                    <datalist id = "options">
                        {movies.map((movie) => (
                            <option key ={movie.id} value = {movie.Title}/>
                        ))}
                    </datalist>
                </label>
                <label>
                    <p>Enter a date and time:</p>
                    <input type = "date" name = "ShowDate" value = {showInfo.ShowDate} onChange = {handleChange} id = "date-field"/>
                    <input type = "time" name = "ShowTime" value = {showInfo.ShowTime} onChange= {handleChange} id = "time-field"/>
                </label>
                <label>
                    <p>Confirm the duration time:</p>  
                    <input type = "text" name = "ShowDuration" value = {selectedMovie ? selectedMovie.Runtime: ""} onChange = {handleChange} id = "duration-field"/> 
                </label>
                <label>
                    <p>Enter the room number (1 - 4):</p>
                    {RoomErrorMsg && <p style={{ color: "red" }}>{RoomErrorMsg}</p>}
                    <input type = "number" name = "RoomNumber" value = {showInfo.RoomNumber} onChange = {handleChange} id = "room-field"/>
                </label>
                {ConflictErrorMsg && <p style={{ color: "red" }}>{ConflictErrorMsg}</p>}
                <hr />
                <button type="submit" id="sched-movie-button">Submit</button>
            </form>
        </div>
        <div>
        {scheduleConfirmationMsg && (
            <div id="prompt">
                <div className="panel-container" id="add-movie-confirmation">
                    <h2>Confirmation</h2>
                    <hr/>
                    <p>Showing has been successfully scheduled.</p>
                    <button id="add-movie-button" onClick={scheduleConfirmationHandler}>OK</button>
                </div>
            </div>
        )}
        </div></>
    )
}