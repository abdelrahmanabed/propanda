import { Suspense } from 'react';
import CourseClient from '../../components/courseClient';
import InstructorCard from '../../components/instructorCard';
import Slider from '../../components/Slider';

const Page = async ({params}) => {

 
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/category/${params.paths}`,{ next: { revalidate: 21600 } });
      const I = await response.json();
   


      const cresponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${params.paths}`,{ next: { revalidate: 21600} });
      const courses = await cresponse.json();
    



   

  const categoriesKeywordsMap = {
    programming: { title: 'البرمجة و التكنولوجيا', keywords: ['code', 'js', 'software', 'لغة'] },
    languages: { title: 'اللغات', keywords: ['french', 'english', 'lang', 'لغة'] },
    designing: { title: 'التصميم', keywords: ['code', 'js', 'software', 'لغة'] },
    learning: { title: 'التعلم', keywords: ['french', 'english', 'lang', 'لغة'] }, 
    skills: { title: 'المهارات', keywords: ['code', 'js', 'software', 'لغة'] },
    healthandsafety: { title: 'السلامة والصحة المهنية', keywords: ['french', 'english', 'lang', 'لغة'] },
    marketing: { title: 'التسويق', keywords: ['french', 'english', 'lang', 'لغة'] },
  };

  return (
    <div  className=" p-3 flex flex-col min-h-96 backdrop-blur-xl gap-7">
     <div className="coursesrelatedtosomcategories  flex flex-col gap-7">
        
        {/* Filter courses by categories */}
        {Object.entries(categoriesKeywordsMap).map(([category, { title }]) => {
          if (category === params.paths) {
            return (<>
              <div key={category} className="flex flex-col gap-3">
                <h2 className='text-xs md:text-base'>  الدورات الاشهر <span className="font-extrabold">{title}</span> </h2>
               {courses.length > 0 && 
               <Suspense fallback={<div></div>}>
               <Slider>
                  {courses.map(course => (
                      <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                      className="keen-slider__slide min-w-fit">
                        <CourseClient
                          href={`/courses/${course._id}`}
                          photo={course.photo}
                          title={course.title}
                          price={course.price}
                          courseId={course._id}
                          instructor={course.author}

                        />
                      </div>    

                    ))}
                </Slider></Suspense>}
              </div>
                   <div id='mostrecent' key={category} className="flex flex-col gap-3">
                   <h2 className='text-xs md:text-base' >احدث دورات في <span className="font-extrabold">{title}</span> </h2>
                  {courses.length > 0 && 
                          <Slider>
                        {courses.map(course => (
                         <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                         className="keen-slider__slide min-w-fit">
                           <CourseClient
                             href={`/courses/${course._id}`}
                             photo={course.photo}
                             title={course.title}
                             price={course.price}
                             courseId={course._id}
                             instructor={course.author}
   
                           />
                         </div>
                       ))}
                  </Slider> }
                 </div></>
            );
          }
          return null;
        })}
      </div>
      <div>
     
      <div className='Irelatedtosomcategories p-3 flex flex-col gap-3'>
      <h2>محاضرين في القسم     
        </h2>
<Suspense fallback={<div>..loading</div>}>
          {I.length > 0  &&
          
          <Slider>
              { I.map((i) => (
                <div key={i._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
      className="keen-slider__slide min-w-fit">
        <InstructorCard
        image={i.photo}
        name={i.name}
        des={i.bio}
        href={"/instructors/"+i._id}
        />    </div>


              ))}  </Slider>}

</Suspense>
    </div>

      </div>
    </div>
  );
};

export default Page;