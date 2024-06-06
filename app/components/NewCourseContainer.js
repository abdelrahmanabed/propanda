"use client";
import "keen-slider/keen-slider.min.css";
import { Suspense, useState, useEffect } from "react";
import Loading from "./loading";
import axios from "axios";
import CourseClient from "./courseClient";
import { useCart } from "./CartContext";
import Slider from "./Slider";
import Keenslider from "./Keenslider";
const NewCourseContainer = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useCart()
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PORT}/api/courses?userId=${userId}`
        );
        const data = await response.data;
        setPopularCourses(data);
        setDisplayedCourses(data.slice(0, 7));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to ensure this runs only once

  const handleSeeMore = () => {
    const newCoursesToDisplay = popularCourses.slice(
      displayedCourses.length,
      displayedCourses.length + 7
    );
    setDisplayedCourses((prevCourses) => [
      ...prevCourses,
      ...newCoursesToDisplay,
    ]);
  };

  return (
    <Suspense fallback={<div className="h-96 bg-white"><Loading /></div>}>
      <div className="mt-10 mx-3 min-h-96 mb-3 flex flex-col gap-3">
        {loading ? (
          <Loading />
        ) : (
          <Keenslider label={"الدورات الاكثر شهرة"}>
            {displayedCourses.map((course) => (
              <div
                key={course._id}
                style={{ maxWidth: "fit-content", minWidth: "fit-content" }}
                className="keen-slider__slide min-w-fit"
              >
                <CourseClient
                  href={`/courses/${course._id}`}
                  photo={course.photo}
                  title={course.title}
                  price={course.price}
                  courseId={course._id}
                  instructor={course.author.name}
                  hasPurchased={course.hasPurchased} // Include the hasPurchased status

                />
              </div>
            ))}
            {displayedCourses.length < popularCourses.length && (
              <div
                style={{ maxWidth: "fit-content", minWidth: "fit-content" }}
                className="keen-slider__slide min-w-fit"
              >
                <button onClick={handleSeeMore} className="see-more-button">
                  See More
                </button>
              </div>
            )}
          </Keenslider>
        )}
      </div>
    </Suspense>
  );
};

export default NewCourseContainer;
