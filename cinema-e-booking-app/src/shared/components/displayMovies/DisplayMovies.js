// Home has currentlyShowing, comingSoon
// Search has currentlyShowing, comingSoon

// Pass in here. Show Home Page stuffs

import ImageSlider from "../../../pages/home/ImageSlider";
import React from "react";

export const DisplayMovies = ({ currentlyShowing, comingSoon }) => {
    return (
        <div className="home-container">
            {currentlyShowing.length > 0 && (
                <div className="now-playing-container">
                    <div id="now-playing-text"><h2>Now Playing</h2></div>
                    <ImageSlider items={currentlyShowing} />
                </div>
            )}
            {comingSoon.length > 0 && (
                <div className="now-playing-container">
                    <div id="now-playing-text"><h2>Coming Soon</h2></div>
                    <ImageSlider items={comingSoon} />
                </div>
            )}
        </div>
    );
}