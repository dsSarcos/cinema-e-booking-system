import { React, useEffect, useState } from "react";
import "./DisplayTrailer.css";

const DisplayTrailer = ({ name, link}) => {

  const [trailer, setTrailer] = useState(null);
  const [videoID, setVideoID] = useState('');
  const [title, setTitle] = useState('');

  useEffect (() => {
    setTitle(name);
    setVideoID(getYoutubeId(link));
    setTrailer('https://www.youtube.com/embed/' + videoID + '?autoplay=0');
  });

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

    return (
        <div id="trailer-container">
          <div id="movie-title">
            <h2>{title}</h2>
          </div>
          <div id="trailer">
            <iframe id='movie-trailer' src={trailer} frameborder="0" allowfullscreen/>
          </div>
        </div>
    );
}

export default DisplayTrailer;