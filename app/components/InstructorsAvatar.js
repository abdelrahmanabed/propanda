import Image from 'next/image'
import React from 'react'

const InstructorsAvatar = () => {
  return (
    <div className='InstructorsAvatar hidden md:flex h-72 '>
    <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/insp.png`}height={500}        alt=''
        className='h-72 -bottom-4 -z-10 absolute w-auto'
        width={500}
    />

        <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/design3.png`}height={500}        alt=''
        className='h-72 -bottom-4 right-60 -z-10 absolute w-auto left-28'
        width={500}
    />

        <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/market.png`}height={500}        alt=''
        className='h-72 -bottom-4 ri -z-10 absolute left-24 w-auto'
        width={500}
    />
         <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/programming3.png`}height={500}        alt=''
        className='h-72 -bottom-4 ri -z-10 absolute left-24 w-auto'
        width={500}
    />   
            <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/English.png`}height={500}        alt=''
        className='h-72 -bottom-4 ri -z-10 absolute left-24 w-auto'
        width={500}
    />
     
       <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/marketing.png`}height={500}        alt=''
        className='h-72 -bottom-4 right-20 -z-10 absolute w-auto'
        width={500}
    />      
      <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/Hse.png`}height={500}        alt=''
        className='h-72 -bottom-4 ri -z-10 absolute left-24 w-auto'
        width={500}
    />
               <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/design4.png`}height={500}        alt=''
        className='h-72 -bottom-4 ri -z-10 absolute left-24 w-auto'
        width={500}
    />
        <Image
        src={`${process.env.NEXT_PUBLIC_PORT}/insPhotos/Design.png`}height={500}        alt=''
        className='h-72 -bottom-4 -z-10 absolute left-0 w-auto'
        width={500}
    />  
    </div>
  )
}

export default InstructorsAvatar