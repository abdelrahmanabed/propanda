import Image from 'next/image';
import Link from 'next/link';
import Bookmarkicon from './bookmarkicon';
import CartIcon from './carticon';
import { MdDone } from "react-icons/md";
import { memo } from 'react';

const CourseClient = (props) => {
  return (
    <div className='relative group w-fit flex flex-col gap-2'>
      <Link id='coursecomdiv' href={props.href} className='flex-col h-96 w-72 flex items-center backdrop-blur-md'>
        <div className='imgdiv'>
          {props.photo && <Image alt='' src={`${process.env.NEXT_PUBLIC_PORT}/${props.photo.replace(/\\/g, '/')}`} width={500} height={500} quality={50} className='rounded-2xl' loading="lazy"	placeholder="blur"	 blurDataURL="data:/imgs/OIG1.jpeg"	  />}
        </div>
        <div id='cct' className='h-36 absolute bottom-0 text-white right-0 flex p-3 rounded-2xl flex-col justify-between'>
          {props.title && <h1 className='w-fit text-base'>{props.title}</h1>}
          <div id='cctt' className='justify-between flex items-center text-md'>
            <span className='rounded-2xl'>{props.instructor}</span>
            <span id='coursecdp' className='p-3 flex justify-center items-center text-center text-lg rounded-2xl'>
              <span className='text-xs self-end font-bold'>EGP</span> {props.price - 1}
            </span>
          </div>
        </div>
      </Link>
      <div className='absolute w-full cxdiv px-3 flex gap-3'>
        {props.hasPurchased ? (
          <MdDone className='MdDone text-7xl h-16 rounded-full w-20 p-3 drop-shadow-lg bg-black font-black' />
        ) : (
          <CartIcon courseId={props.courseId} className={`${props.CartIcon} cbtn justify-center items-center bottom-6 left-6 p-2 h-16 w-full`} />
        )}
        <Bookmarkicon courseId={props.courseId} className={`${props.Bookmarkicon} cbtn h-16 w-full p-2 `}/>
      </div>
    </div>
  );
};

export default memo(CourseClient);
