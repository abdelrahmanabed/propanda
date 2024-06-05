'use client'
import React, { useState, useRef, useEffect } from 'react';
function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow z-10 ${props.className} ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}


const Slider = ({ children }) => {
  const sliderWrapperRef = useRef(null);
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const slideWidth = 72; // Fixed slide width in Tailwind units (e.g., 96px)
  const [disableLeftArrow, setDisableLeftArrow] = useState(true);
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPosition(e.touches[0].clientX);
  };

  const handleMouseStart = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    const movement = startPosition - currentPosition; // Reverse direction for RTL
    const newTranslate = prevTranslate + movement;
    
    setCurrentTranslate(newTranslate);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const movement = startPosition - currentPosition; // Reverse direction for RTL
    const newTranslate = prevTranslate + movement;
    
    setCurrentTranslate(newTranslate);
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    // Calculate the closest slide index
    const closestSlideIndex = Math.round(currentTranslate / 300);

    // Ensure the closest slide index is within the valid range
    const sliderWrapper = sliderWrapperRef.current;
    const sliderContainer = containerRef.current;
    const sliderWrapperWidth = sliderWrapper.clientWidth;

    const containerWidth = sliderContainer.clientWidth;
    const maxTranslate = sliderWrapperWidth - containerWidth;
    const newTranslate = Math.max(-maxTranslate - 24 , Math.min(0, closestSlideIndex * 300));
    console.log('first', maxTranslate)
    console.log('three', containerWidth );
    console.log('three', sliderWrapperWidth );
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
    
    setDisableLeftArrow(newTranslate === 0);
    setDisableRightArrow(newTranslate === -maxTranslate - 24);
  };

  useEffect(() => {
    const sliderWrapper = sliderWrapperRef.current;

    sliderWrapper.addEventListener('touchstart', handleTouchStart);
    sliderWrapper.addEventListener('mousedown', handleMouseStart);
    sliderWrapper.addEventListener('touchmove', handleTouchMove);
    sliderWrapper.addEventListener('mousemove', handleMouseMove);
    sliderWrapper.addEventListener('touchend', handleEnd);
    sliderWrapper.addEventListener('mouseup', handleEnd);
    sliderWrapper.addEventListener('mouseleave', handleEnd);

    return () => {
      sliderWrapper.removeEventListener('touchstart', handleTouchStart);
      sliderWrapper.removeEventListener('mousedown', handleMouseStart);
      sliderWrapper.removeEventListener('touchmove', handleTouchMove);
      sliderWrapper.removeEventListener('mousemove', handleMouseMove);
      sliderWrapper.removeEventListener('touchend', handleEnd);
      sliderWrapper.removeEventListener('mouseup', handleEnd);
      sliderWrapper.removeEventListener('mouseleave', handleEnd);
    };
  }, [isDragging, startPosition, currentTranslate, prevTranslate]);
  const handleLeftClick = () => {
    const newTranslate = Math.min(0, currentTranslate + 300);
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);

    setDisableLeftArrow(newTranslate === 0);
    setDisableRightArrow(false);
  };
  const handleRightClick = () => {
    const sliderWrapper = sliderWrapperRef.current;
    const sliderWrapperWidth = sliderWrapper.clientWidth;

    const sliderContainer = containerRef.current;
    const containerWidth = sliderContainer.clientWidth;
    const totalSlidesWidth = children.length * slideWidth;
    const maxTranslate = sliderWrapperWidth - containerWidth;
    const newTranslate = Math.max(-maxTranslate - 24, currentTranslate - 300);
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);

    setDisableLeftArrow(false);
    setDisableRightArrow(newTranslate === -maxTranslate - 24);
  };

  return (<><div className='pt-7 relative pb-4 flex flex-col '>
    <span className='mr-3  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl '>الكورسات الاكثر شعبية </span>
       <Arrow
            left onClick={handleRightClick} disabled={disableRightArrow} 
              />

            <Arrow
onClick={handleLeftClick} disabled={disableLeftArrow}
            /></div>
    <div ref={containerRef} id="sliderContainer" className=" h-96 rounded-xl md:mx-16 mx-3 relative max-w-screen  overflow-hidden">
    
      <div
        id="sliderWrapper"
        ref={sliderWrapperRef}
        className="flex absolute w-fit overflow-hidden rounded-xl h-fit gap-3"
        style={{ transform: `translateX(${-currentTranslate}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
      >
        {children}
      </div>
    </div>    

</>
  );
};

export default Slider;
