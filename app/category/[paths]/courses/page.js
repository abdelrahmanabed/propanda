import { Suspense } from 'react';
import CourseClient from '../../../components/courseClient';
import InstructorCard from '../../../components/instructorCard';
import { cookies } from 'next/headers';
import { decryptUserId } from '../../../helpers/api';
import LoadMoreButton from './_SeeMoreButton';

const fetchInstructors = async (category) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/category/${category}`, { next: { revalidate:26000 } });
  return await response.json();
};

const fetchCourses = async (category,page=1, userId, limit = 9) => {
    const url = userId
    ? `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}/courses?userId=${userId}&limit=${limit}&page=${page}`
    : `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}/courses?&limit=${limit}&page=${page}`;
    const response = await fetch(url, { next: { revalidate: 26000 } });
    const data = await response.json();

    return {
    courses: data.courses||[],
    totalPages: data.totalPages||1,  // Ensure your API returns this value
      };  };
const Page = async ({ params,searchParams }) => {
  const encryptedID = cookies().get('encryptedUserId')?.value;
  const userId = decryptUserId(encryptedID);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const I = await fetchInstructors(params.paths);
  const { courses, totalPages } = await fetchCourses(params.paths, page, userId);

   

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
    <div  className=" p-3 flex flex-col items-center min-h-96 backdrop-blur-xl gap-7">
     <div className="allcourses  flex justify-center ">
        
        {/* Filter courses by categories */}
        {Object.entries(categoriesKeywordsMap).map(([category, { title }]) => {
          if (params.paths.includes(category)) {
            return (
              <div key={category} className=" ">
                <label className=''>دورات {title}</label>
                <div className='gap-3 md:gap-7 allcoursescontainer mt-5 inline-flex justify-center md:justify-start  md:grid-cols-2 md:grid flex-wrap w-fit'>
                
        {(
        courses.map((course) => (
              <CourseClient
                 href={`/courses/${course._id}`}
                 photo={course.photo}
                 title={course.title}
                 price={course.price}
                 courseId={course._id}key={course._id}
                 instructor={course.author.name}
                 hasPurchased={course.hasPurchased}
              />
      )))}
                        </div>
                        <LoadMoreButton  totalPages={totalPages} category={params.paths} userId={userId} currentPage={page}/>

              </div>
                  
            );
          } else
          {
            <div key={category} className="flex flex-col gap-3">
            <label>الدورات التعليمية</label>
           <div className='  flex gap-3 flex-wrap justify-center'>
            
    {courses.map((course) => (
          <CourseClient
             href={`/courses/${course._id}`}
             photo={course.photo}
             title={course.title}
             price={course.price}
             courseId={course._id}key={course._id}
             instructor={course.author.name}
             hasPurchased={course.hasPurchased}
          />
  ))}</div>
          </div>
          }
        })}
      </div>
     
    {params.paths.includes('programming')&& <div className='Irelatedtosomcategories flex flex-col gap-3'>
     
        <Suspense fallback={<div>..loading</div>}>
          {I.length > 0  &&
          
          <div >
            <label>
                محاضرين القسم
            </label>
                <div className='gap-3 md:gap-7 allcoursescontainer mt-5 inline-flex justify-center md:justify-start  md:grid-cols-2 md:grid flex-wrap w-fit'>
                { I.map((i) => (
                <div key={i._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
      className="keen-slider__slide min-w-fit">
        <InstructorCard
        image={i.photo}
        name={i.name}
        des={i.bio}
        href={"/instructors/"+i._id}
        />    </div>


              ))}</div>  </div>}

</Suspense>
    </div>} 

    </div>
  );
};

export default Page;