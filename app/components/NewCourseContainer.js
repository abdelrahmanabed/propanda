'use client'
import "keen-slider/keen-slider.min.css"
import Course from "./course";
import Keenslider from "./Keenslider";
import { useEffect, useState } from "react";
import axios from "axios";


const NewCourseContainer =  () => {
  const [newCourses, setnewCourses] = useState([])
  useEffect(()=>{
    const fetchNewCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
        const newCourses = response.data
        setnewCourses(newCourses) 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchNewCourses()
  },[])
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



