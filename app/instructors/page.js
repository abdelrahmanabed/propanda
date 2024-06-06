import { Suspense } from 'react';
import InstructorCard from '../components/instructorCard'
import Keenslider from '../components/Keenslider';
import Buttonforchange from './components/Buttonforchange';
import CourseLoading from '../components/courseLoading'
import Slider from '../components/Slider';

const Page = async ({searchParams} ) => {

   
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors${searchParams.category ? `/category/${searchParams.category}` : ''}`,{ next: { revalidate: 21600 } });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const I = await response.json();
      


  return (

       
<div>
  <Buttonforchange value={searchParams.category}/>
    <div className=' m-3 flex flex-col gap-3'>
      
          {I.length > 0  &&
<Keenslider label={"المحاضرين"}>
              { I.map((i) => (
                <div key={i._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
      className="keen-slider__slide min-w-fit">
        <InstructorCard
        image={i.photo}
        name={i.name}
        des={i.bio}
        href={`/instructors/${i._id}`}
        />    </div>

              ))}  </Keenslider>}


    </div>
    </div>
  )
}

export default Page