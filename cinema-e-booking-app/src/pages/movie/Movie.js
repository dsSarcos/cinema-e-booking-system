import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Movie.css";
import { getMovie, getMoviesWithPoster } from "../api/api";
import { SelectSeat } from './SelectSeat';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../../shared/context/GlobalContext";


const Movie = () => {
  const { user } = useGlobalContext();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  async function fetchMovie() {
    const data = await getMovie(id);
    setMovie(data);
    const videoID = getYoutubeId(data.Trailer)
    setTrailer('https://www.youtube.com/embed/' + videoID + '?autoplay=0')
  }

  function getYoutubeId(url) {
    const regex = /v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
      const videoId = match[1];
      return videoId
    } else {
      console.error("Invalid YouTube video URL");
    }
  }

  const admin = (
    <div></div>
  );

  const customer = (
        <Link to={'order'} state={ { movie } }>
          <button className="button" id="book-tickets-button">Book Tickets</button>
        </Link> 
  );
    
  const upcomingMovie = (
    <div id="upcoming-movie"><h2>Tickets will be available for purchase soon.</h2></div>
  )  
  

  const notLoggedIn = (
    <div id="login-message"><h3>Please log in to book tickets.</h3></div>
  )

  function isAdmin() {
    if (user && user.IsAdmin === 1) {
        return (admin); 
    } else if (user === null) {
        return (notLoggedIn)
    } else {
      return (isCurrent());
    }
  }

  function isCurrent() {
    if (movie.MovieState === "CURRENT") {
      return (customer);
    } else {
      return (upcomingMovie);
    }
  }
  
  return(
    <div id="movie-container">
      <div className='movie-title'>
          <h2>{movie.Title}</h2>
      </div>
      <div id="trailer">
            <iframe id='movie-trailer' src={trailer} allowFullScreen/>
      </div>
      <div id="details">
        <div className='panel-container' id='movie-information'>
          <div className='movie-info'>
            <h3>About:</h3> <p>{movie.Synopsis}</p>
            <h3>Movie genre:</h3> <p>{movie.Category}</p>
            <h3>Cast:</h3> <p>{movie.Cast}</p>
            <h3>Director:</h3> <p>{movie.Director}</p>
            <h3>Age restriction:</h3> <p>{movie.RatingCode}</p>
          </div>
          {isAdmin()}  
        </div> 
        <div className='panel-container' id='poster'>
            <img 
              id="movie-img" 
              src={movie.MoviePoster}
              alt="Image Unavailable">
            </img>
        </div>
      </div>
    </div> 
  );
}

export default Movie;