import React, {useState, user} from "react";
import {Link} from "react-router-dom";
import "./ImageSlider.css";
import DisplayTrailer from "../../shared/components/DisplayTrailer/DisplayTrailer";

const CarouselItem = ({item, index, active}) => {

    const [displayTrailer, setDisplayTrailer] = useState(false);

    const trailerHandler = () => {
        if (displayTrailer === true) {
            setDisplayTrailer(false);
            document.body.classList.remove('no-scroll');
        } else {
            setDisplayTrailer(true);
            document.body.classList.add('no-scroll');
        }
    }

    return (
        <><div key={index} className={`slider-item ${active ? 'active' : ''}`}>
            <div className="item-button-container">
                <Link onClick={trailerHandler}>
                    <button className="item-button">Trailer</button>
                </Link>
                <Link to={"/browse/movie/" + item.Title}>
                    <button className="item-button">Details</button>
                </Link>
            </div>
            <img
                className="slider-img"
                src={item.MoviePoster}
                alt="Image Unavailable">
            </img>
            <div>
                <p>{item.Title}</p>
                <p>{item.RatingCode}</p>
            </div>
        </div>
        <div>
            {displayTrailer && (
                <div id="overlay">
                    <button id="close-trailer" onClick={trailerHandler}><p>&#10006;</p></button>
                    <div id="popup">
                        <DisplayTrailer name={item.Title} link={item.Trailer} />
                    </div>
                </div>

            )}
            </div></>
    );
}

export default CarouselItem;