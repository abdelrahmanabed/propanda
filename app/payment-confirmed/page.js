import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { MdDoneOutline } from "react-icons/md";

function page() {
  return (
    <div className=' flex-col flex md:flex-row gap-7 p-10 justify-center items-center'>
      <Image src='/imgs/confirmed.png' className=' h-52 md:h-96 w-auto confirmedphoto' width={500} height={500} />
    <div  className=' flex justify-center items-center flex-col gap-5'>    <span className=' text-2xl'>تمت عماية الشراء بنجاح</span>
     <div className='coursatypay flex gap-3'>

        <Link href='/profile/my-courses'>كورساتي </Link>
        <Link className='homepay' href={'/'}>الى الصفحة الرئيسية</Link>

        </div>   </div> 

    </div>
  )
}

export default page