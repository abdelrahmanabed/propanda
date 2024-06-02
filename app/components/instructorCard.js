'use client'
import Image from 'next/image';
import Link from 'next/link';
const InstructorCard = (props) => {
  return (
    <div className=''>
        <Link href={props.href} className=' insCard gap-3 items-center  w-72 h-96 flex flex-col   rounded-2xl overflow-hidden'>
    <div className=' w-full h-72 rounded-2xl flex justify-center items-center overflow-hidden'>
    <Image src={`${process.env.NEXT_PUBLIC_PORT}/${props.image.replace(/\\/g, '/')}`} width={500} height={500} className='  min-h-full  min-w-full  '/>
    </div>
    <div className=' flex flex-col gap-3 items-center '>
            <span className=' font-bold'>{props.name}</span>
            <span className=' font-light text-sm'>{props.des}</span>

    </div></Link>
    </div>
  )
}

export default InstructorCard