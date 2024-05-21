'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaPlay , FaTimes,    } from 'react-icons/fa'; 
import { useVideo } from './VideoContext'; 

const PriceDiv = (props) => {
  const { children } = props; 
   const priceDivRef = useRef(null); 
  const coursePageRef = useRef(null);
  const coursePromo = useRef(null);  
   const { viewPreview, togglePreview, setViewPreview } = useVideo();
  
  useEffect(() => {
    const handleScroll = () => {
    const header = document.getElementById('header');
    
    const headerHeight = header.clientHeight;
    const scrollPosition = window.scrollY;
    
    
    if (scrollPosition > headerHeight) {
      setViewPreview( false)
        } 
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
    }, []);
  const handleClickOutsideUN = (event) => {
    if (coursePromo.current && !coursePromo.current.contains(event.target)) {
      togglePreview( )
            }
  };

  useEffect(() => {
    if (viewPreview) {
        document.addEventListener('mousedown', handleClickOutsideUN);
    } else {
        document.removeEventListener('mousedown', handleClickOutsideUN);
    }
  
    return () => {
        document.removeEventListener('mousedown', handleClickOutsideUN);
    };
  
  }, [viewPreview]);
  useEffect(() => {
  
    const handleScroll = async () => {
      if (!coursePageRef.current || !priceDivRef.current || !coursePromo.current ) return;
  
      const rect = coursePageRef.current.getBoundingClientRect();
      const leftPosition = rect.left + 40;
      const leftPositionp = rect.left + 0; 
  
      priceDivRef.current.style.left = `${leftPosition}px`;
      coursePromo.current.style.left = `${leftPositionp}px`;

    };
  
    const handleResize = () => {
      handleScroll(); 
    };
  
    window.addEventListener('resize', handleResize);
    handleScroll();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  return (<>
    <div ref={coursePageRef} className=' w-full left-0 absolute bg-black '></div>
<div id='priceDiv' 
ref={priceDivRef}
 className=' md:fixed md:left-10 flex flex-col md:flex-col md:p-3 md:top-32 md:items-center  md:w-72 xl:w-96 left-10 justify-between md:backdrop-blur-xl gap-3'>
         <button className='   w-full h-44 hidden md:block right-1/2 overflow-hidden rounded-2xl ' onClick={togglePreview}>
           <div className='w-full h-full relative  '>
            <FaPlay className=' faplay absolute top-1/2  left-1/2 -translate-y-1/2 -translate-x-1/2 z-20  rounded-2xl'/> 
        <Image className='h-full'  width={720} height={500} src={props.coursephoto}/>
                  <span className='  z-50 '> الفيديو العام </span>

</div></button>     
      {children}
      </div> 
      
       <div id='videobg' ref={coursePromo}  className={`fixed ${ viewPreview? "flex" : "hidden"} backdrop-blur-lg  top-5  w-full mx-3  pb-8 rounded-2xl  px-3 pt-16  items-center p-2   drop-shadow-2xl `}>
       <span className=' text-white font-black text-2xl absolute top-5 right-5'>في هذه الدورة</span>

       <button onClick={togglePreview} className=' text-white font-black text-2xl absolute top-5 left-5'><FaTimes/></button>
       <video on id='videoPreview'       
            src={props.video}
 className={` z-50   `} controls /> </div> </> )
}

export default PriceDiv