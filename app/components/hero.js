import Link from 'next/link'
import Particlesjs from './paeticles'

const Hero = () => {
  return (
<div id='herodiv' className={` relative  mt-0 pb-3    overflow-hidden flex flex-col justify-end gap-16 md:gap-4 items-center md:items-start md:justify-end`} >
    <Particlesjs/>

    <div className=' content w-full flex gap-1 md:gap-5  md:flex-col items-center bg-white md:items-start justify-between lg:items-start lg:justify-start backdrop-blur-md md:p-12 z-10'>
    <h1 className=' text-4xl md:text-6xl lg:text-8xl font-extrabold text-black drop-shadow-xl'>تعلّم اونلاين</h1>
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