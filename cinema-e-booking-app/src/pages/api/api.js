/*
    This file has the api calls.
    Use this to talk to the python flask backend.
 */

export const getAllUsers = async () => {
    //send request
    const response = await fetch('http://localhost:3000/api/users');
    //return response
    return response.json();
}

// If email + password is valid, will return full user object
// If invalid, returns {}
export const authenticateUser = async (email, password) => {
    const response = await fetch(`http://localhost:3000/api/users/authenticate/${email}/${password}`);
    return response.json();
}

// Returns payment info by user id.
export const getPaymentInfo = async (user_id) => {
    const response = await fetch(`http://localhost:3000/api/paymentInfo/${user_id}`);
    return response.json();
}

// Return promotions
export const getPromotions = async () => {
    const response = await fetch('http://localhost:3000/api/promotions');
    return response.json();
}

// Return movie titles
export const getMovies = async () => {
    const response = await fetch('http://localhost:3000/api/movies');
    return response.json();
}

// Returns movie
export const getMovie = async (id) => {
    const response = await fetch(`http://localhost:3000/api/movies/${id}`);
    const movie = await response.json();
    return await getMoviePoster(movie);
}

//Only returns movie poster
export const getMoviePoster = async (movie) => {
    const response = await fetch(`http://localhost:3000/api/movies/get/file/${movie.ID}`);
    const blobData = await response.blob();
    movie.MoviePoster = URL.createObjectURL(blobData);
    return movie;
}

// Async function to go through each of currentlyShowingMovies and add a MoviePoster to it
// async function takes in a list movies.
export const setMoviePoster = async (movies) => {
    // await
    // updatedValue = { ...movie, MoviePoster: "IMAGE_URL" }
    for(const m of movies)
    {
        const response = await fetch(`http://localhost:3000/api/movies/get/file/${m.ID}`);
        const blobData = await response.blob();
        m.MoviePoster = URL.createObjectURL(blobData);
    }
    return movies;
}

export const getMoviesWithPoster = async () => {
    const movies = await getMovies();
    return await setMoviePoster(movies);
}

// Returns Movie information with Shows information joined by Title
export const getMoviesWithShows = async () => {
    const response = await fetch('http://localhost:3000/api/movies-shows');
    return response.json();
}

