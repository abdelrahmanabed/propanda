import React from 'react'
import { BiCodeCurly } from "react-icons/bi";
import { IoIosBrush } from "react-icons/io"
import {  FaLanguage } from 'react-icons/fa';
import Link from 'next/link';
import CartBtn from './cartbutton';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { TbSitemap } from "react-icons/tb";
import MobileSearch from './MobileSearch';

const MobileNav = (props) => {
  return (
<div id='mobnav' className={` ${props.className}  p-2 w-full duration-500 z-30  bg-white     flex flex-col gap-3 top-full  h-screen  rounded-2xl absolute`}>
<MobileSearch/>
<nav id='navdivmobile' className="flex flex-col gap-2 relative  z-40">
  <div className=' flex gap-2 items-center'><Link href="/courses" className=' navmlink rounded-2xl flex flex-col items-center gap-3 w-1/3 ' ><BiSolidCategoryAlt  className='text-4xl '/><span className=' '>الاقسام</span> </Link>
<Link href="/instructors" className='navmlink rounded-2xl flex flex-col items-center gap-3 w-1/3  '> <GiTeacher  className=' text-4xl'/> <span className=' '>المحاضرين</span></Link>
<Link href="/pathways" className='navmlink rounded-2xl flex flex-col items-center gap-3 w-1/3  '> <TbSitemap  className=' text-4xl'/> <span className=' '>مسارات التعلم</span></Link></div>
<div className=' flex gap-2 items-center'>
  <Link href="/category/programming" className=' navmlink2 rounded-3xl flex flex-col items-center gap-3 w-1/3 ' ><BiCodeCurly className=' text-4xl'/><span className=' '>البرمجة</span> </Link>
<Link href="/category/designing" className='navmlink2 rounded-2xl flex flex-col items-center gap-3 w-1/3  '> <IoIosBrush className=' text-4xl'/> <span className=' '>التصميم</span></Link>
<Link href="/category/languages" className='navmlink2 rounded-2xl flex flex-col items-center gap-3 w-1/3  '> <FaLanguage  className=' text-4xl'/> <span className=' '>اللغات</span></Link></div>

 
</nav><div className=' flex gap-2'> 
  <Link   href={'/cart'}  className={`   rounded-2xl p-2 gap-2 w-full navmlink4 duration-300  items-center justify-center flex-col-reverse relative flex`}> سلة المشتريات
    <CartBtn color="#fff" />
  </Link></div>
   
</div>  )
}

export default MobileNav