import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";
import Course from '../../components/course';


const Page = async ({params}) => {

        const iResponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${params.id}`);
        if (!iResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const I = await iResponse.json();

      
   const fetchIC = async ()=> {
    if (I) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
      const coursesData =await response.json();
             

      // Filter courses based on 'I'
      const filteredCourses = coursesData.filter(course => {
        return I.courses.some(courseString => course._id.toLowerCase() === courseString.toLowerCase());
      });

      return filteredCourses
      
    }
   };
  const Icourses = await fetchIC()
  return (<>
    { I &&   
<div className='m-3'>
    <div className=' bg-white w-full h-64 rounded-2xl relative '>
       <div className=' h-44  flex flex-col gap-3 items-center justify-center p-3'> 
       <span className=' font-bold text-xl lg:text-3xl xl:text-4xl  top-5 '>{I.bio}</span>
        <div className='social   top flex  gap-3'>

        { I.facebook&& <a className=' bg-zinc-200 p-2    rounded-2xl   lg:p-3 flex items-center gap-3' target='_blank' href={`https://www.facebook.com/${I.facebook}`}><FaFacebook className=' text-2xl ' /> <span className='hidden lg:flex'>  فيسبوك</span></a>}
       { I.instagram&& <a className='  bg-zinc-200 p-2 rounded-2xl    lg:p-3 flex items-center gap-3' target='_blank' href={`https://www.instagram.com/${I.instagram}`}><GrInstagram  className=' text-2xl ' /> <span className='hidden lg:flex'> انستجرام</span></a>}
        {I.youtube&&<a>يوتيوب</a>}
        { I.whatsapp&& <a className='bg-zinc-200 p-2  rounded-2xl lg:p-3 flex items-center gap-3' target='_blank' href={`https://wa.me/${I.whatsapp}`}><RiWhatsappFill   className=' text-2xl' /> <span className='hidden lg:flex'> واتساب</span></a>}
</div>
        </div>

        <div className=' rounded-3xl h-36 w-36 overflow-hidden absolute -bottom-16 left-1/2 -translate-x-1/2'>
       {I.photo&& <Image src={`${process.env.NEXT_PUBLIC_PORT}/${I.photo.replace(/\\/g, '/')}`} width={1024} height={1024} className=' rounded-2xl    w-full'/>}

        </div>   
        <span className='-bottom-24 absolute left-1/2 -translate-x-1/2'> {I && I.name}</span>

    </div>

    <div className=' mt-28 flex flex-col gap-3 '>
   <span>الكورسات </span> <span className=' font-bold'>{`(${Icourses.length})`}</span>
    {Icourses.length > 0 &&<div className=' self-center flex gap-3 flex-wrap justify-center coursesIc '>
        {Icourses.map(course => (
  <Course
  key={course._id}
  href={`/courses/${course._id}`}
  photo={course.photo}
  title={course.title}
  price={course.price}
  courseId={course._id}

/>
        ))}

    </div>}
    </div>

    </div>}</>
  )
}

export default Page