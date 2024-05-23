
import { IoMdCheckmark } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import Image from 'next/image';
import Bookmarkicon from '../../components/bookmarkicon';
import CartIcon from '../../components/carticon';
import PriceDiv from '../components/PriceDiv';
import Ccontainer from '../components/Ccontainer';
import Buttonmobvid from '../components/BgVideo';
import { Suspense } from "react";

export default async function Page({params}) {
// Reference to the parent element you want to calculate the position against
const CourseDuration = ({ duration }) => {
  // Check if duration is available
  if (duration === undefined) {
    return null; // or you can return a placeholder, or an error message
  }

  // Calculate hours and minutes
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  // Construct the string based on hours and minutes
  let durationString = '';
  if (hours > 0) {
    durationString += hours + ' ساعة';
    if (hours > 2 && hours < 11) durationString = hours + ' ساعات'; // Pluralize 'hour' if needed
    if (minutes > 0) durationString += ' ';
  }
  if (minutes > 0) {
    durationString += minutes + ' دقيقة';
    if (minutes > 2 && minutes < 11) durationString = minutes + ' دقائق'; // Pluralize 'minute' if needed
  }

  return (
    <label className=' flex flex-col items-center justify-center font-semibold text-xs'> <span className=' text-xs font-normal '> مدة الكورس</span>  {durationString}</label>
  );
};




        const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses/${params._id}`);
        const course = await courseResponse.json();
    

  const fetchAuthorData = async () => {
    try {
        // Fetch author data
        if (course.author) {
          const authorResponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${course.author}`);
          const authorData = authorResponse.json();
          return authorData
        }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  

  const author = await fetchAuthorData()


     
    return (
    
   <>
   { course&& <div id='coursePage'  className='relative  w-full overflow-hidden'  >

      <div id='coursePreview' className=' flex flex-col gap-3 p-3 sm:p-5 md:p-3'>
     <div id='vdiv' className='h-fit md:h-fit flex-col gap-5 p-3'>
           <h1 id="cdt" className=" text-lg md:text-xl lg:text-2xl  sm:w-2/3 md:w-1/2 lg:w-2/3 w-full xl:w-full overflow-hidden  xl:text-3xl md:relative relative top-5 right-3 z-10 font-black">{course.title}</h1>
           <p id="cddes" className=" w-full text-sm right-0 sm:w-2/3 md:w-1/2 lg:w-2/3 md:relative top-0 sm:text-base p-8 md:p-12">{course.description}</p>
           <Suspense fallback={<div>...loading</div>}>
       <Buttonmobvid/></Suspense>
      </div> 

      <div id='cauthordiv' className=' gap-4 mt-3 back flex items-center '>
      {author.photo &&  (
 <div className='w-14 h-14 overflow-hidden rounded-2xl flex items-center '> <Image src={`${process.env.NEXT_PUBLIC_PORT}/${author.photo.replace(/\\/g, '/')}`} width={1024} height={1024} className=' rounded-2xl    w-full'/></div> 
)}        <span id='cda' className=' text-lg'> {author.name}</span>
      </div>      
      <Suspense fallback={<div>...loading</div>}>
    <PriceDiv video={`${process.env.NEXT_PUBLIC_PORT}/${course.parts[0].videos[0].videoPath.replace(/\\/g, '/')}`} coursephoto={`${process.env.NEXT_PUBLIC_PORT}/${course.photo.replace(/\\/g, '/')}`}>
 

       <div className=' w-full gap-3 flex'>
        <span id='cdp' className='w-32 flex justify-center font-medium text-2xl'><span className=' text-sm flex items-end font-normal'>EGP</span> {course.price} </span>
       <Bookmarkicon className="courseDet" courseId={course._id}/>
       </div> 
        <button id='cdadd' className='  relative w-full flex overflow-hidden' >
          
          <CartIcon className='flex  courseDet bg-opacity-0 justify-center items-start md:p-6 pt-6 h-28  w-full' courseId={course._id}/>
          <span  className=' absolute right-1/2 translate-x-1/2  bottom-6   ' >اضف الى السلة</span>
        
        
        </button>  
       
       
        <div id='courseContent' className='hidden  md:w-full md:grid md:grid-cols-2 rounded-2xl gap-4'>
      {course.content && course.content.courseDuration && (
  <CourseDuration duration={course.content.courseDuration} />
)}  
      {course.content && course.content.numberOfArticles && (
<label className=' flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد المقالات</span> {course.content.numberOfArticles} </label>
)}  
     {course.content && course.content.numberOfVideos && (
<label className='flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد الدروس</span> {course.content.numberOfVideos} </label>
)}  
     {course.content && course.content.numberOfParts && (
<label className='flex flex-col items-center justify-center  font-semibold text-sm'><span className=' text-xs font-normal'>عدد الاقسام</span> {course.content.numberOfParts} </label>
)}  

    </div></PriceDiv> </Suspense>
      


      <div id='courseContent' className='flex justify-center md:w-fit   md:hidden rounded-2xl gap-4'>
        <Suspense fallback={<div>...load</div>}>
      {course.content && course.content.courseDuration && (
  <CourseDuration duration={course.content.courseDuration} />
)}  </Suspense>
      {course.content && course.content.numberOfArticles && (
<label className=' flex flex-col items-center justify-center  font-semibold text-xs'><span className=' text-xs font-normal'>عدد المقالات</span> {course.content.numberOfArticles} </label>
)}  
     {course.content && course.content.numberOfVideos && (
<label className='flex flex-col items-center justify-center  font-semibold text-xs'><span className=' text-xs font-normal'>عدد الدروس</span> {course.content.numberOfVideos} </label>
)}  
     {course.content && course.content.numberOfParts && (
<label className='flex flex-col items-center justify-center  font-semibold text-xs'><span className=' text-xs font-normal'>عدد الاقسام</span> {course.content.numberOfParts} </label>
)}  

    </div>
      </div>
<div id='courseReq' className='flex flex-col lg:flex-row gap-3 m-3 '>
      <div id="courseRequirements" className=" flex-col  lg:w-full  flex gap-5  p-3 py-5   mt-0">
        <span className=' font-black'> المتطلبات لبدأ الدورة
        </span>
        
        {course.requirements && course.requirements.map((requirement, index) => (
          <span className='flex  gap-1 items-start' key={index}>        <Suspense fallback={<div>...load</div>}><FaCircle className=' FaCircle'/></Suspense>
           {requirement}</span>
        ))}
      </div>

      <div id="targetC" className="    lg:w-full   flex-col flex gap-5  p-3 py-5 mt-0">
      <span className='font-black'> ماذا سوف تتعلم
        </span>
        {course.whatWillLearn && course.whatWillLearn.map((item, index) => (
          <span className='flex gap-1 items-start' key={index}>        <Suspense fallback={<div>...load</div>}><IoMdCheckmark className=' text-xl w-12'/> </Suspense>
          {item}</span>
        ))}

        
      </div>
</div>
<Suspense fallback={<div>...load</div>}>

<Ccontainer/></Suspense>

    </div>}</>
    )
            
  }