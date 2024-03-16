import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";

import "./Home.css";
import {getMovies, getMoviesWithPoster} from "../api/api";
import {DisplayMovies} from "../../shared/components/displayMovies/DisplayMovies";

const Home = () => {

    const [currentlyShowing, setCurrentlyShowing] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);

    useEffect(() => {
        fetchMovies();
      }, []);

    async function fetchMovies() {
        try {
          const data = await getMoviesWithPoster();
          setCurrentlyShowing(data.filter(movie => movie.MovieState === "CURRENT"));
          setComingSoon(data.filter(movie => movie.MovieState === "UPCOMING"));
        } catch (error) {
          console.error(error);
        }
      }

    return <DisplayMovies comingSoon={comingSoon} currentlyShowing={currentlyShowing}/>
}

export default Home;