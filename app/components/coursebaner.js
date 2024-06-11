import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";

const Coursebanner = (props) => {
  return (
    <div className={`${props.className} cbanner p-2 flex-col flex items-center gap-3 h-96 relative`}>
    <div class="center">
    </div>
<Image loading='lazy'	 width={500} height={500} src={props.img} alt={props.alt} className=' absolute sm:right-0 bottom-0  h-96 w-auto' />
    <label className=' sm:bottom-40 roounded-3xl sm:rounded-tr-3xl sm:p-5 text-center sm:left-0 sm:justify-start sm:w-1/2 xl:w-2/3 absolute bottom-14 bg-grren-500 bg-opacity-20 w-full flex justify-center  -translate-y-2 text-lg sm:text-xl md:text-2xl  xl:text-3xl  font-black backdrop-blur-lg p-2 text-white'>{props.label}</label>
    <Link className=' absolute bottom-0 sm:bottom-28 shadow-2xl  sm:justify-start sm:p-5 shadow-black sm:rounded-r-3xl sm:w-1/3 md:w-2/3  xl:w-3/4 sm:left-0  bg-black bg-opacity-30 text-white font-black sm:text-base md:text-2xl  xl:text-3xl h-16 flex justify-center w-full drop-shadow-2xl items-center gap-3  hover:bg-transparent backdrop-blur-lg ' href={props.href}>الى الدورة التعليمية <MdArrowBackIosNew/></Link>
    </div>
  )
}

export default Coursebanner