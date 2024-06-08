import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { decryptUserId } from '../../helpers/api';
import Keenslider from '../../components/Keenslider';
import Coursebanner from '../../components/coursebaner';
import NewCourseContainer from '../../components/NewCourseContainer';
import KeenSwiper from '../../components/KeenSwiper';
import InstructorCard from '../../components/instructorCard';
import Link from 'next/link';
import { MdArrowBackIosNew } from "react-icons/md";

const fetchInstructors = async (category) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/category/${category}`, { next: { revalidate: 1 } });
  return await response.json();
};

const fetchCourses = async (category, userId) => {
  const url = userId
    ? `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?userId=${userId}&limit=7`
    : `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?limit=7`;
  const response = await fetch(url, { next: { revalidate: 1 } });
  const data = await response.json();
  return data.courses || [];
};

const Page = async ({ params }) => {
  const encryptedID = cookies().get('encryptedUserId')?.value;
  const userId = decryptUserId(encryptedID);
  const instructors = await fetchInstructors(params.paths);
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
    <div className="flex flex-col min-h-96 backdrop-blur-xl gap-7">
      <div className='categoryheader w-full h-96'>
        <KeenSwiper>
          {courses && courses.map((course) => (
            <div key={course._id}>
              <Coursebanner 
      img={`${process.env.NEXT_PUBLIC_PORT}/${course.author.photo.replace(/\\/g, '/').replace(/\webp/g, 'png')}`}
      label={course.title}
                href={`/courses/${course._id}`}
                className={`keen-slider__slide`}
              />
            </div>
          ))}
        </KeenSwiper>
      </div>
      <div className="coursesrelatedtosomcategories flex flex-col gap-7">
        {Object.entries(categoriesKeywordsMap).map(([category, { title }]) => {
          if (category === params.paths) {
            return (
              <>
                <div key={category} className="flex flex-col gap-3">
                  <NewCourseContainer api={`courses/category/${category}`} sort={'purchasedUsers.length'} label={`اشهر دورات ${title}`} />
                </div>
                <Link href={`/category/${params.paths}/courses` } className={`toallcourses text-m sm:text-2xl font-extrabold gap-3`}>عرض جميع دورات <span className=' '>{title}</span><MdArrowBackIosNew className=' font-black'/> </Link>

                <div id='mostrecent' key={category} className="flex flex-col gap-3">
                  <NewCourseContainer api={`courses/category/${category}`} label={`احدث دورات ${title}`} />
                </div>
              </>
            );
          }
          return null;
        })}
      </div>
      <div>
        <div className='Irelatedtosomcategories p-3 flex flex-col gap-3'>
          <Suspense fallback={<div>..loading</div>}>
            {instructors.length > 0 && (
              <Keenslider label={`محاضرين القسم`}>
                {instructors.map((instructor) => (
                  <div key={instructor._id} style={{ maxWidth: 'fit-content', minWidth: 'fit-content' }} className="keen-slider__slide min-w-fit">
                    <InstructorCard
                      image={instructor.photo}
                      name={instructor.name}
                      des={instructor.bio}
                      href={`/instructors/${instructor._id}`}
                    />
                  </div>
                ))}
              </Keenslider>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
