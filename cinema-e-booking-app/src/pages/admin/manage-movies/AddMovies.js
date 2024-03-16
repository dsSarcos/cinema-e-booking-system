import {useState} from "react";
import React from "react";
import './AddMovies.css';

export const AddMovies = () => {
    const [MovieErrorMsg, setMovieErrorMsg] = useState(null);
    const [MovieConfirmationMsg, setMovieConfirmationMsg] = useState(false);
    const [movieInfo, setMovieInfo] = useState({
        Title: "",
        Category: "",
        Cast: "",
        Director: "",
        Producer: "",
        Synopsis: "",
        Runtime: "",
        Reviews: "",
        MoviePoster: "",
        Trailer: "",
        RatingCode: "G",
        MovieState: "CURRENT",
        MoviePrice: "10.95"
    });


    const handleChange = (event) => {
        setMovieInfo({...movieInfo, [event.target.name]: event.target.value});
    };

    const fillCheck = () => {
        if (movieInfo.Title === ""
            || movieInfo.Category === ""
            || movieInfo.Cast === ""
            || movieInfo.Director === ""
            || movieInfo.Producer === ""
            || movieInfo.Synopsis === ""
            || movieInfo.Runtime === ""
            || movieInfo.Reviews === ""
            || movieInfo.MoviePoster === ""
            || movieInfo.Trailer === ""
            || movieInfo.RatingCode === ""
            || movieInfo.MovieState === "")
            {
                return false;
            }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fillCheck() == true) {
            setMovieErrorMsg(null);

            const formData = new FormData();
            formData.append('file', movieInfo.MoviePoster);
            formData.append('fileName', movieInfo.MoviePoster.name);
            //console.log(movieInfo);

            fetch('http://localhost:3000/api/movies/add', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(movieInfo)
            })
                .then(data => data.json())
                .then((movie) => {
                    console.log(JSON.stringify(movie))
                    // upload file
                    fetch(`http://localhost:3000/api/movies/add/file/${movie.ID}`, {
                        method: "POST",
                        body: formData
                    }).then(()=> {
                        movieConfirmationHandler();
                    })
                })
        } else {
            setMovieErrorMsg("Please fill all fields in the form.");
        }
    };

    const movieConfirmationHandler = () => {
        if (MovieConfirmationMsg === true) {
            setMovieConfirmationMsg(false);
        } else {
            setMovieConfirmationMsg(true);
        }
    }

    return (
        <><div className="AddMovies">
            <h1>ADD MOVIE</h1>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>
                    <p>Title:</p>
                    <input type="text" name="Title" value={movieInfo.Title} onChange={handleChange} id="text-field"/>
                </label>
                <label>
                    <p>Category:</p>
                    <input type="text" name="Category" value={movieInfo.Category} onChange={handleChange}
                           id="text-field"/>
                </label>
                <label>
                    <p>Cast:</p>
                    <textarea name="Cast" value={movieInfo.Cast} onChange={handleChange} id="text-field"/>
                </label>
                <label>
                    <p>Director:</p>
                    <input type="text" name="Director" value={movieInfo.Director} onChange={handleChange}
                           id="text-field"/>
                </label>
                <label>
                    <p>Producer:</p>
                    <input type="text" name="Producer" value={movieInfo.Producer} onChange={handleChange}
                           id="text-field"/>
                </label>
                <label>
                    <p>Synopsis:</p>
                    <textarea name="Synopsis" value={movieInfo.Synopsis} onChange={handleChange} id="synopsis"/>
                </label>
                <label>
                    <p>Runtime:</p>
                    <textarea name="Runtime" value={movieInfo.Runtime} onChange={handleChange} id="runtime"/>
                </label>
                <label>
                    <p>Reviews:</p>
                    <input type="text" name="Reviews" value={movieInfo.Reviews} onChange={handleChange}
                           id="text-field"/>
                </label>
                <label>
                    <p>Movie Poster:</p>
                    <input type="file" name="MoviePoster"
                           onChange={(e) => setMovieInfo({...movieInfo, MoviePoster: e.target.files[0]})}
                           id="text-field"/>
                </label>
                <label>
                    <p>Trailer:</p>
                    <input type="text" name="Trailer" value={movieInfo.Trailer} onChange={handleChange}
                           id="text-field"/>
                </label>
                <label>
                    <p>Rating:</p>
                    <select name="RatingCode" id="select-field" value={movieInfo.RatingCode} onChange={handleChange}>
                        <option value='G'>G</option>
                        <option value='PG'>PG</option>
                        <option value='PG-13'>PG-13</option>
                        <option value='R'>R</option>
                        <option value='NR'>NR</option>
                    </select>
                </label>
                <label>
                    <p>Time Frame:</p>
                    <select name="MovieState" id="select-field" value={movieInfo.MovieState} onChange={handleChange}>
                        <option value='CURRENT'>Currently Showing</option>
                        <option value='UPCOMING'>Upcoming</option>
                        <option value='NA'>N/A</option>
                    </select>
                </label>
                <label>
                    <p>Price:</p>
                    <input type = "text" name="MoviePrice" value={movieInfo.MoviePrice} onChange={handleChange}
                            id="text-field"/>
                </label>
                {MovieErrorMsg && <p style={{ color: "red" }}>{MovieErrorMsg}</p>}
                <hr />
                <button type="submit" id="add-movie-button">Submit</button>
            </form>
        </div>
        <div>
        {MovieConfirmationMsg && (
            <div id="prompt">
                <div className="panel-container" id="add-movie-confirmation">
                    <h2>Confirmation</h2>
                    <hr/>
                    <p>Movie has been successfully added to the database.</p>
                    <button id="add-movie-button" onClick={movieConfirmationHandler}>OK</button>
                </div>
            </div>
        )}
        </div></>
    )
}