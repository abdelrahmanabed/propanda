import InstructorCard from '../components/instructorCard'
import axios from 'axios';
import Keenslider from '../components/Keenslider';
import Buttonforchange from './components/Buttonforchange';


const instructors = async ({searchParams} ) => {

    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/instructors${searchParams.category ? `/category/${searchParams.category}` : ''}`);
        const I = response.data;
        return I
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error here
      }
    };
const I = await fetchInstructors()


  return (

       
<div>
  <Buttonforchange value={searchParams.category}/>
    <div className=' m-3 flex flex-col gap-3'>
      المحاضرين
          {I.length > 0  &&
<Keenslider>
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

export default instructors