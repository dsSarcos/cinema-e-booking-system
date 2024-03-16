import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { Link , useLocation } from 'react-router-dom';

import "./Showings.css";

const Showings = () => {

  const { id } = useParams();
  const { user } = useGlobalContext();
  const [shows, setShows] = useState([]);
  const location = useLocation();
  const { movie } = location.state;

  const sortedShows = [...shows].sort((a, b) => new Date(a.ShowDate) - new Date(b.ShowDate));

  useEffect(() => {
    fetch('http://localhost:3000/api/shows')
    .then(response => response.json())
    .then(shows => setShows(shows.filter(movie => movie.Title.includes(id))))
    .catch(error => console.error(error));
  }, []);

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

  function isAdmin() {
    if (user && user.IsAdmin === 1) {
        return (admin); 
    } else {
      return (customer);
    }
  }

  const admin = (
    <div className="home-container">
      <div className="panel-container">
        <h1 id="warning">You are not permitted to view this page.</h1>
      </div>
    </div>
  );

  const customer = (
    <div  id='showtime-container'>
      <div className='panel-container'>
        <div id="showtimes">
          <h1>Showtimes</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedShows.map(showtime => (
                <tr key={showtime.id}>
                  <td>{convertDate(showtime.ShowDate)}</td>
                  <td><Link to={'tickets'} state={{ movie, showtime }}>
                    <button id="showtime-button">{convertTimeTo12HrFormat(showtime.ShowTime)}</button>
                    </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return(
    <div>
      {isAdmin()}
    </div>
  );
}

export default Showings;