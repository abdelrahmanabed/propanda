import { Suspense } from 'react';
import CourseClient from '../../components/courseClient';
import InstructorCard from '../../components/instructorCard';
import { cookies } from 'next/headers';
import { decryptUserId } from '../../helpers/api';
import Keenslider from '../../components/Keenslider';
import CourseLoading from '../../components/courseLoading';

const fetchInstructors = async (category) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/category/${category}`, { next: { revalidate:26000 } });
  return await response.json();
};

const fetchCourses = async (category, userId) => {
  const url = userId
    ? `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?userId=${userId}`
    : `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}`;
  const response = await fetch(url, { next: { revalidate: 26000} });
  return await response.json();
};

const Page = async ({ params }) => {
  const encryptedID = cookies().get('encryptedUserId')?.value;
  const userId = decryptUserId(encryptedID);
  const I = await fetchInstructors(params.paths);
  const courses = await fetchCourses(params.paths, userId);


   

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
               {courses.length > 0 && 
               
               <Keenslider label={`الدورات الاكثر شهرة  `+ title}>
                  {courses.map(course => (
                      <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                      className="keen-slider__slide min-w-fit">
                     <Suspense fallback={<CourseLoading/>}>   <CourseClient
                          href={`/courses/${course._id}`}
                          photo={course.photo}
                          title={course.title}
                          price={course.price}
                          courseId={course._id}
                          instructor={course.author.name} // Use the instructor's name directly
                          hasPurchased={course.hasPurchased} // Include the hasPurchased status
                          /></Suspense>
                      </div>    

                    ))}
                </Keenslider>}
              </div>
                   <div id='mostrecent' key={category} className="flex flex-col gap-3">
                  {courses.length >= 1 && 
               <Keenslider label={`احدث دورات `+ title}>
               {courses.map(course => (
                         <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                         className="keen-slider__slide min-w-fit">
                           <CourseClient
                             href={`/courses/${course._id}`}
                             photo={course.photo}
                             title={course.title}
                             price={course.price}
                             courseId={course._id}
                             instructor={course.author.name} // Use the instructor's name directly
                             hasPurchased={course.hasPurchased} // Include the hasPurchased status

                           />
                         </div>
                       ))}
                  </Keenslider> }
                 </div></>
            );
          }
          return null;
        })}
      </div>
      <div>
     
      <div className='Irelatedtosomcategories flex flex-col gap-3'>
     
<Suspense fallback={<div>..loading</div>}>
          {I.length > 0  &&
          
          <Keenslider label={`محاضرين القسم`}>
          { I.map((i) => (
                <div key={i._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
      className="keen-slider__slide min-w-fit">
        <InstructorCard
        image={i.photo}
        name={i.name}
        des={i.bio}
        href={"/instructors/"+i._id}
        />    </div>


              ))}  </Keenslider>}

</Suspense>
    </div>

      </div>
    </div>
  );
};

export default Page;