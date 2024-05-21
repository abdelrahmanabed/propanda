import Link from 'next/link'
import React from 'react'
import { SiFoodpanda } from "react-icons/si";
import { IoSettings } from "react-icons/io5";

import { FaBookmark,FaSignOutAlt  } from "react-icons/fa";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import Cookies from 'js-cookie';


const Usernav = (props) => {

    const handleLogout = () => {
        const cookieKeys = Object.keys(Cookies.get());
        cookieKeys.forEach((key) => {
          Cookies.remove(key);
          localStorage.clear();

        });


      
        
         window.location.reload()
      };

  return (
    <div  id='userNav' className={` ${props.className} backdrop-blur-xl absolute flex  gap-3 flex-col overflow-hidden duration-300 top-full   md:w-fit left-3 `}>
        <div className='flex gap-3'>
        <Link href={"/profile/info"} className=' usernavlink flex flex-col w-full h-32 md:w-28 md:h-28 justify-center items-center gap-3 p-3'>
        <SiFoodpanda  className='text-3xl'/>

           <span className='text-xs'>الملف الشخصي</span> 
        </Link>
        <Link href={"/profile/info"} className=' usernavlink flex flex-col w-full h-32 md:w-28 md:h-28 justify-center items-center gap-3 p-3'>
        <BsFillCollectionPlayFill   className='text-3xl'/>

           <span className='text-xs'>كورساتي</span> 
        </Link></div>
        <div className='flex gap-3'>
        <Link href={"/profile/favourites"} className=' usernavlink flex flex-col w-full h-32 md:w-28 md:h-28 justify-center items-center gap-3 p-3'>
        <FaBookmark FaBookmark   className='text-3xl'/>

           <span className='text-xs'> التفضيلات</span> 
        </Link>
        <Link href={"/profile/info"} className=' usernavlink flex flex-col w-full h-32 md:w-28 md:h-28 justify-center items-center gap-3 p-3'>
        <IoSettings   className='text-3xl'/>

           <span className='text-xs'> اعدادات الحساب</span> 
        </Link></div>
        <button  onClick={handleLogout}  href={"/"} className=' usernavlink flex  h-16 justify-center items-center gap-3 p-3'>

           <span className='text-xs'> تسحيل الخروج</span>         <FaSignOutAlt  className=' rotate-180 text-3xl'/>

        </button>
    </div>
  )
}

export default Usernav