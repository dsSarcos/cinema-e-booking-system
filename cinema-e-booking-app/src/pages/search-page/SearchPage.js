import {React, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {getMovies, setMoviePoster, getMoviesWithShows} from "../api/api";
import {DisplayMovies} from "../../shared/components/displayMovies/DisplayMovies";
import "./SearchPage.css";

export const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const [currentlyShowing, setCurrentlyShowing] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);

    //These are the query parameter values.
    console.log('searchText ' + searchParams.get('searchText'));
    console.log('category ' + searchParams.get('category'));

    // useEffect(() => {
    //     fetch('http://localhost:3000/api/movies-shows')
    //         .then(response => response.json())
    //         .then(shows => setShowDate(shows))
    //         .catch(error => console.error(error));
    // }, []);



    const setMovies = async (movies) => {
        const moviesWithPoster = await setMoviePoster(movies);

        const currentlyShowingByCategory = "CURRENT";
        const currentlyShowingMovies = moviesWithPoster.filter(movie => movie.MovieState.includes(currentlyShowingByCategory));

        setCurrentlyShowing(currentlyShowingMovies);
        console.log(JSON.stringify(currentlyShowingMovies));

        const upcomingMoviesByCategory = "UPCOMING";
        const upcomingMovies = moviesWithPoster.filter(movie => movie.MovieState.includes(upcomingMoviesByCategory));
        setComingSoon(upcomingMovies);
        console.log(JSON.stringify(upcomingMovies));

    }


    //useEffect is used when you want to make an api call when you load SearchPage
    //,[] this is for only one time when it is loaded
    useEffect(() => {
        const searchText = searchParams.get('searchText').toLowerCase();
        const category = searchParams.get('category').toLowerCase();

        getMoviesWithShows().then((movies) => {
            let filteredMovies = [];
            //console.log('movies ' + JSON.stringify(movies));

            if (category === "title") {
                // Filter by title
                filteredMovies = movies.filter(movie =>
                    movie.Title.toLowerCase().includes(searchText)
                );
            } else if (category === "category") {
                //Filter by category
                filteredMovies = movies.filter(
                    movie => movie.Category.toLowerCase().includes(searchText)
                );
            } else if (category === "date") {
                //Filter by category
                filteredMovies = movies.filter(
                    movie => (movie.ShowDate && movie.ShowDate.includes(searchText))
                );
            }
            //console.log('filteredMovies' + JSON.stringify(filteredMovies));
            setMovies(filteredMovies);
        })

    }, [searchParams])

    return (
        <div id="Search-Page-Container">
            <h1>SEARCH RESULTS</h1>
            {currentlyShowing.length === 0 && comingSoon.length === 0 && <div><hr/><h1>No Movies Available</h1></div> }
            <DisplayMovies comingSoon={comingSoon} currentlyShowing={currentlyShowing}/>
        </div>
    );
}