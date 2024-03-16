import React, { useState, useEffect } from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CarouselItem from "./CarouselItem";
import "./ImageSlider.css";

const ImageSlider = ({ items }) => {
  const [numItems, setNumItems] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 800) {
        setNumItems(1); // Mobile screens show 1 item
      } else if (width >= 800 && width < 1100) {
        setNumItems(2); // Small screens show 2 items
      } else if (width >= 1100 && width < 1400) {
        setNumItems(3); // Medium screens show 3 items
      } else {
        setNumItems(4); // Large screens show 4 items
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial number of items

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevClick = () => {
    if (index - numItems < 0) {
      setIndex(0);
    } else {
      setIndex((index - numItems + items.length) % items.length);
    }
  };
  
  const handleNextClick = () => {
    if (index + numItems >= items.length) {
      setIndex(items.length - numItems);
    } else {
      setIndex((index + numItems) % items.length);
    }
  };

  function numCheck() {
    if (items.length < 4 && numItems >= items.length) {
      return (
      <div className="slider">
        <div className="carousel-wrapper">
          {[...Array(Math.min(numItems, items.length))].map((_, itemIndex) => (
            <CarouselItem 
            key={index + itemIndex} 
            item={items[(index + itemIndex) % items.length]}
            />
          ))}
        </div>
      </div>
      );
    } else {
      return (
      <div className="slider">
        <button className="button" onClick={handlePrevClick}><KeyboardDoubleArrowLeftIcon/></button>
          <div className="carousel-wrapper">
            {[...Array(Math.min(numItems, items.length))].map((_, itemIndex) => (
              <CarouselItem 
              key={index + itemIndex} 
              item={items[(index + itemIndex) % items.length]}
              />
            ))}
          </div>
        <button className="button" onClick={handleNextClick}><KeyboardDoubleArrowRightIcon/></button>
      </div>      
      );
    }
  }

  return (
    <div>
      {numCheck()}
    </div>
  )
};

export default ImageSlider;
