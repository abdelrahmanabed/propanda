import { Suspense } from 'react';
import CourseClient from '../../../components/courseClient';
import InstructorCard from '../../../components/instructorCard';
import { cookies } from 'next/headers';
import { decryptUserId } from '../../../helpers/api';
import LoadMoreButton from './_SeeMoreButton';
import FilterC from './_Flter';




const Page = async ({ params,searchParams }) => {

  const encryptedID = cookies().get('encryptedUserId')?.value;
  const userId = decryptUserId(encryptedID);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sort = searchParams.sort ;
  
  const data =  userId
  ? await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${params.paths}/courses?userId=${userId}&limit=9&page=${page}&sort=${sort}`,{ next: { revalidate: 1 } })
  : await fetch (`${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${params.paths}/courses?&limit=9&page=${page}&sort=${sort}`,{ next: { revalidate: 1 } });
  const response =  data
  const resdata = await response.json();
      const courses = await resdata.courses
      const totalPages = await resdata.totalPages


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
             <div className=' flex items-center justify-between'> 
               <label className=''>دورات {title}</label>
               <FilterC value={sort} />
                </div> 
                
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
                        <LoadMoreButton  totalPages={totalPages} category={params.paths} userId={userId} currentPage={page} sort={sort}/>

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
  

    </div>
  );
};

export default Page;