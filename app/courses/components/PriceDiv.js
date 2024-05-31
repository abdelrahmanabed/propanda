'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaPlay , FaTimes,    } from 'react-icons/fa'; 
import { useVideo } from './VideoContext'; 
import Bookmarkicon from '../../components/bookmarkicon';
import CartIcon from '../../components/carticon';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { MdDone } from "react-icons/md";

const PriceDiv = (props) => {
  
  const  {_id} = useParams()
  const [hasPurchased, setHasPurchased] = useState(false);
   const priceDivRef = useRef(null); 
  const coursePageRef = useRef(null);
  const coursePromo = useRef(null);  
   const { viewPreview, togglePreview, setViewPreview } = useVideo();
   const [decryptedUserId, setDecryptedUserId] = useState(null);

   const CourseDuration = ({ duration }) => {
    // Check if duration is available
    if (duration === undefined) {
      return null; // or you can return a placeholder, or an error message
    }
    useEffect(() => {
      const encryptedUserId = Cookies.get('encryptedUserId');
      if (encryptedUserId) {
        const decryptedId = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
        setDecryptedUserId(decryptedId);
      }
    }, []);
    useEffect(() => {
      const fetchPurchaseStatus = async () => {
      if( decryptedUserId !==null && _id !== null){   try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/checkPurchaseStatus`, {
            userId: decryptedUserId,
            courseId : _id,
          });
          setHasPurchased(response.data.hasPurchased);

        } catch (error) {
          console.error('Error checking purchase status', error);
        }}
     
      };
          fetchPurchaseStatus();

    }, [_id, decryptedUserId]);
    // Calculate hours and minutes
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
  
    // Construct the string based on hours and minutes
    let durationString = '';
    if (hours > 0) {
      durationString += hours + ' ساعة';
      if (hours > 2 && hours < 11) durationString = hours + ' ساعات'; // Pluralize 'hour' if needed
      if (minutes > 0) durationString += ' ';
    }
    if (minutes > 0) {
      durationString += minutes + ' دقيقة';
      if (minutes > 2 && minutes < 11) durationString = minutes + ' دقائق'; // Pluralize 'minute' if needed
    }
  
    return (
      <label className=' flex flex-col items-center justify-center font-semibold text-xs'> <span className=' text-xs font-normal '> مدة الكورس</span>  {durationString}</label>
    );
  };
  
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
           <div className='w-full h-full relative  flex justify-center items-center '>
            <FaPlay className=' faplay absolute top-1/2  left-1/2 -translate-y-1/2 -translate-x-1/2 z-20  rounded-2xl'/> 
        <Image className='w-full  min-h-full'  width={500} height={500} src={props.coursephoto}/>
                  <span className='  z-50 md:hidden'> الفيديو العام </span>

</div></button>     

 

<div className=' w-full gap-3 flex'>
{    hasPurchased? <MdDone className=' text-7xl' />
:   <span id='cdp' className='w-32 flex justify-center font-medium text-2xl'><span className=' text-sm flex items-end font-normal'>EGP</span> {props.course.price} </span>
}       <Bookmarkicon className="courseDet" courseId={props.course._id}/>
       </div> 
    {  !hasPurchased && <button id='cdadd' className='  relative w-full flex overflow-hidden' >
          
          <CartIcon className='flex  courseDet bg-opacity-0 justify-center items-start md:p-6 pt-6 h-28  w-full' courseId={props.course._id}/>
          <span  className=' absolute right-1/2 translate-x-1/2  bottom-6   ' >اضف الى السلة</span>
        
        
        </button>  }
       
       
        <div id='courseContent' className='hidden  md:w-full md:grid md:grid-cols-2 rounded-2xl gap-4'>
      {props.course.content && props.course.content.courseDuration && (
  <CourseDuration duration={props.course.content.courseDuration} />
)}  
      {props.course.content && props.course.content.numberOfArticles && (
<label className=' flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد المقالات</span> {props.course.content.numberOfArticles} </label>
)}  
     {props.course.content && props.course.content.numberOfVideos && (
<label className='flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد الدروس</span> {props.course.content.numberOfVideos} </label>
)}  
     {props.course.content && props.course.content.numberOfParts && (
<label className='flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد الاقسام</span> {props.course.content.numberOfParts} </label>
)}  

    </div>      </div> 
      
       <div id='videobg' ref={coursePromo}  className={`fixed ${ viewPreview? "flex" : "hidden"} backdrop-blur-lg  top-5  w-full mx-3  pb-8 rounded-2xl  px-3 pt-16  items-center p-2   drop-shadow-2xl `}>
       <span className=' text-white font-black text-2xl absolute top-5 right-5'>في هذه الدورة</span>

       <button onClick={togglePreview} className=' text-white font-black text-2xl absolute top-5 left-5'><FaTimes/></button>
       <video on id='videoPreview'       
            src={props.video}
 className={` z-50   `} controls /> </div> </> )
}

export default PriceDiv