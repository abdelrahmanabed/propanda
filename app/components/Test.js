"use client";
import "keen-slider/keen-slider.min.css";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import Loading from "./loading";
const Course = dynamic(() => import("./course"), { ssr: false });
import Keenslider from "./Keenslider";
import axios from "axios";

const Test = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PORT}/api/popularCourses?limit=14`
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
      <div className="mt-10 mx-3 min-h-96 mb-3 flex flex-col gap-3 overflow-hidden">
        <span className="text-lg">اكثر الدورات شعبية</span>
       
          <div >
            {displayedCourses.map((course) => (
              <div
                key={course._id}
                style={{ maxWidth: "fit-content", minWidth: "fit-content" }}
                className="keen-slider__slide min-w-fit"
              >
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
          </div>
        
      </div>
  );
};

export default Test;