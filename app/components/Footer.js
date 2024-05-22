'use client'

import Link from 'next/link'
import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import Image from 'next/image'; 
const Footer = () => {
  return (

    <div className='footer  self-end  '>
        <div className='footercon'>
         <div id='logodiv' className="logo h-12 rounded-2xl py-2">
       <Link href={"/"}> <Image src="/imgs/prologo1.svg" className='h-8 ' alt="Logo" width={90} height={100} /></Link>
      </div>
        <div className='we flex gap-3 justify-center items-center'>
            <Link href='/contact' className='welink'>اتصل بنا</Link>
            <Link href='/terms' className='welink'>شروط الاستخدام </Link>
            <Link href='/beacoach' className='welink'>انضم كمحاضر</Link>
            <Link href='/courses' className='welink'> دوراتنا التدريبية </Link>
            <Link href='/instructors' className='welink'> محاضرينا </Link>
        </div>
        <div className=' social flex gap-3 justify-center items-center'>
        <a href='https://www.facebook.com/propanda' className=''><FaFacebook/></a>
        <a href='https://www.instagram.com/propanda' className=''><GrInstagram/></a>
        <a href='https://wa.me' className=''><RiWhatsappFill/></a>
        <a href='https://www.youtube.com/propanda' className=''><FaYoutube /></a>
        </div>
        <span>تطوير عبدالرحمن عابد</span> 
 </div>  

</div>
  )
}

export default Footer