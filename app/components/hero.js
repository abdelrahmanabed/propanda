'use client'
import Link from 'next/link'
import Particlesjs from './paeticles'
import { Suspense } from 'react'
import InstructorsAvatar from './InstructorsAvatar'

const Hero = () => {
  return (
<div id='herodiv' className={` relative  mt-0 pb-3    overflow-hidden flex flex-col justify-end gap-16 md:gap-4 items-center md:items-start md:justify-end`} >
    <Particlesjs/>
    <img src='/imgs/pandahero.png' className=' pandahero absolute md:left-10 w-72 top-5 xl:h-full xl:left-32 md:h-3/4 md:w-auto lg:left-8 lg:h-5/6 md:top-32 lg:top-28 xl:top-1'/>
    <div className=' content w-full flex gap-1 md:gap-5  md:flex-col items-center bg-white md:items-start justify-between lg:items-start lg:justify-start backdrop-blur-md md:p-12 z-10'>
    <h1 className=' text-xl sm:text-4xl md:text-6xl lg:text-8xl  font-extrabold text-black drop-shadow-xl'>تعلّم اونلاين</h1>
    <div className=' hidden md:inline-block'>  <span className=' text-white text-xl drop-shadow-xl'>مع</span> <span className=' text-white text-xl drop-shadow-xl'>بروباندا</span></div>
      <div className='z-10' >
        <div className='  flex flex-col items-center justify-center gap-3   '>
           <Link href={"/courses"}><button id='herobtn' className='  '>تصفح الكورسات</button></Link> 
        </div>
    </div></div>
</div>
  )
}

export default Hero