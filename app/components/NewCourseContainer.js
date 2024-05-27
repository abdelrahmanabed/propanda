import "keen-slider/keen-slider.min.css"

const Course = dynamic(() => import("./course"), { ssr: false });
const Keenslider = dynamic(() => import("./Keenslider"), { ssr: false });
import dynamic from 'next/dynamic';


const NewCourseContainer = async () => {
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
        const newCourses = await response.json()
     
    return (
        <div className=" mx-3  mb-3 flex flex-col gap-3  overflow-hidden ">
          <span className=" text-lg">احدث الدورات التعليمية</span>
          { newCourses&& newCourses.length > 0 &&  
       <Keenslider>
        { newCourses.map((course) => (
          <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
          className="keen-slider__slide min-w-fit">
            <Course
              href={`/courses/${course._id}`}
              photo={course.photo}
              title={course.title}
              price={course.price}
              courseId={course._id}
              instructor={course.author}
            />
          </div>
        ))}
     </Keenslider> }
       

      </div>
    );
};

export default NewCourseContainer;



