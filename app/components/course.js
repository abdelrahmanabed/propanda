import Image from 'next/image';
import Link from 'next/link';
import Bookmarkicon from './bookmarkicon';
import CartIcon from './carticon';
import { Suspense } from 'react';
import CourseLoading from './courseLoading';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { MdDone } from "react-icons/md";
import axios from 'axios';
 
    
const Course = async(props) => {

 const fetchUserId = async () =>{
     const encryptedUserId = await Cookies.get('encryptedUserId');
    if (encryptedUserId) {
      const decryptedId = await CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
      return decryptedId
    }
 }
 const decryptedId = await fetchUserId()

    const fetchPurchaseStatus = async () => {
    if( decryptedId !==null && props.courseId !== null){   try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/checkPurchaseStatus`, {
          userId: decryptedId,
          courseId : props.courseId,
        });
       const hasPurchased =  response.data.hasPurchased
        return hasPurchased
      } catch (error) {
        console.error('Error checking purchase status', error);
      }}
   
    };
      const hasPurchased = await  fetchPurchaseStatus();

const getInstructorInfoForCard = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${props.instructor}`);
        const info = response.data;
        return info.name
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error here
      }
    };

  const authorName = await getInstructorInfoForCard() 

  

  return (
    <Suspense fallback={<CourseLoading/>}>
    <div className='relative group w-fit flex flex-col gap-2'>
    <Link id='coursecomdiv' href={props.href} className='  flex-col h-96 w-72 flex  items-center backdrop-blur-md    ' >
      <div className='imgdiv' >
      <Image src={`${process.env.NEXT_PUBLIC_PORT}/${props.photo.replace(/\\/g, '/')}`} width={500} height={500} className=' rounded-2xl    '/>    

      </div>
        
        
        
        <div id='cct' className={` h-36  absolute  bottom-0 text-white  right-0  flex p-3  rounded-2xl flex-col justify-between`}>
          <h1 className='  w-fit text-base  '>{props.title}</h1>
          <div id='cctt' className={` justify-between flex items-center text-md`}>
            <span className='  rounded-2xl  '>{authorName}</span>              <span id='coursecdp' className='p-3  flex justify-center items-center text-center text-lg  rounded-2xl '> <span className=' text-xs self-end font-bold'>EGP</span> {props.price - 1}</span>            
            
            </div> 
      
        </div>
    </Link> 
 
           <div className='absolute w-full cxdiv px-3 flex gap-3'> 
{ hasPurchased?
 <MdDone className=' MdDone text-7xl h-16 rounded-full w-20 p-3 drop-shadow-lg bg-black  font-black '/>
 : <CartIcon courseId={props.courseId} className=" cbtn justify-center items-center  bottom-6 left-6 p-2 h-16 w-full "/>
   
}  <Bookmarkicon courseId={props.courseId}  className=" cbtn  h-16 w-full p-2 "/>
            
</div>     
  </div></Suspense>
  )
}

export default Course