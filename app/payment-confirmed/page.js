import Link from 'next/link';
import React from 'react'
import { MdDoneOutline } from "react-icons/md";

function page() {
  return (
    <div className=' flex gap-7 p-10  flex-col items-center'>
      
        <MdDoneOutline className=' Donepay' />
         <span>تمت عماية الشراء بنجاح</span>
     <div className='coursatypay flex gap-3'>
        <Link href='/profile/my-courses'>كورساتي </Link>
        <Link className='homepay' href={'/'}>الى الصفحة الرئيسية</Link>

        </div>   

    </div>
  )
}

export default page