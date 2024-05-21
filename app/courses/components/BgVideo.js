'use client'
import React from 'react'
import { useVideo } from './VideoContext'; 
import { FaPlay     } from 'react-icons/fa';
import Image from 'next/image';

const Buttonmobvid = (props) => {
    const { togglePreview } = useVideo();

  return (
    <button onClick={togglePreview} className='  sm:absolute bottom-1/2 sm:translate-y-1/2 sm:w-52 w-full h-52 md:hidden left-3 '>
           <div className='w-full h-full relative '>
            <span className=' absolute bottom-8 z-30 left-1/2 -translate-x-1/2'> الفيديو العام </span>
            <FaPlay className=' faplay absolute top-1/2  left-1/2 -translate-y-1/2 -translate-x-1/2 z-20  rounded-2xl'/> 
           {props.coursephoto &&<Image width={500} height={500}  src={props.coursephoto`${process.env.PORT}/${course.photo.replace(/\\/g, '/')}`}/>}
           </div></button>  )
}

export default Buttonmobvid