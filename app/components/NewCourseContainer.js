"use client";
import "keen-slider/keen-slider.min.css";
import { Suspense, useState, useEffect, lazy } from "react";
import Loading from "./loading";
import axios from "axios";
const CourseClient =lazy(()=> import("./courseClient")) ;
const Keenslider =lazy(() =>import("./Keenslider"));
import { useUser } from "./UserContext";
import { MdArrowBackIosNew } from "react-icons/md";
import SliderLoad from "./SliderLoad";
import CourseLoad from "./SliderLoad";

const NewCourseContainer = (props) => {
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page
  const { userId } = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PORT}/api/${props.api}?userId=${userId}&limit=7&page=${page}&sort=${props.sort}`
        );
        const data = await response.data.courses;
        if (page === 1) {
          setDisplayedCourses(data);
        } else {
          setDisplayedCourses(prevCourses => [...prevCourses, ...data]);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page]); // Added userId and page as dependencies

  const handleSeeMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page number to fetch next set of courses
  };

  return (
      <div className="mt-10 mx-3 min-h-96 mb-3 flex flex-col gap-3">
        {loading && page === 1 ? (
        <SliderLoad/>
        ) : (
          displayedCourses.length > 0 && (
            <Keenslider label={props.label}>
              {displayedCourses.map((course) => (
                <div
                  key={course._id}
                  style={{ maxWidth: "fit-content", minWidth: "fit-content" }}
                  className="keen-slider__slide min-w-fit"
                >
                  <Suspense fallback={<CourseLoad/>}>
                  <CourseClient
                    href={`/courses/${course._id}`}
                    photo={course.photo}
                    title={course.title}
                    price={course.price}
                    courseId={course._id}
                    instructor={course.author.name}
                    hasPurchased={course.hasPurchased}
                  /></Suspense>
                </div>
              ))}
              {displayedCourses.length < 14&& (
                <div
                  style={{ maxWidth: "fit-content", minWidth: "fit-content" }}
                  className="keen-slider__slide min-w-fit h-96 items-center flex"
                >
                 <button onClick={handleSeeMore} className="see-more-button">
               <button className="seemore  p-3 rounded-xl w-28 flex justify-center flex-row-reverse gap-2 self-center h-14 items-center"><MdArrowBackIosNew />{loading ? (<Loading/>) :  (<span>المزيد</span>) }</button> 
                  </button>
                </div>
              )}
            </Keenslider>
          )
        )}
      </div>
  );
};

export default NewCourseContainer;
