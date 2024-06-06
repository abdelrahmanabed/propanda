'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css'
import dynamic from 'next/dynamic';
const Course = dynamic(() => import("./course"), { ssr: false });
import Loading from './loading';
import { useUser } from './UserContext';
import CourseClient from './courseClient';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userId} = useUser()


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/courses`);
        const myCoursesData = response.data.courses; // Accessing the 'courses' property
        console.log('myCoursesData:', myCoursesData);
        
        if (Array.isArray(myCoursesData)) {
          setMyCourses(myCoursesData);
        } else {
          console.error('Expected myCoursesData to be an array, but got:', myCoursesData);
          return;
        }
        
        const responseC = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
        const filteredCourses = responseC.data.filter(course => myCoursesData.includes(course._id));
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchData();
    }
  }, [userId]);


  

    return (
      <div id='mycoursescomp' className='infocomp w-full backdrop-blur-xl p-3 flex flex-col gap-3 rounded-2xl overflow-hidden min-h-96 '> 
{ loading ?<div className=' h-96 my-12 flex justify-center items-center'><Loading/> </div>: <>  <h1 className='text-2xl'>
        الدورات التعليمية التي تمتلكها 
      </h1>
    { courses && courses.length > 0  ?    
<div className=' flex gap-2 flex-wrap justify-center'>
      <div className=' flex gap-2 flex-wrap justify-center'>
        {courses.map((course) => (
          <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
           className="keen-slider__slide min-w-fit">
              <CourseClient
                 href={`/courses/${course._id}`}
                 photo={course.photo}
                 title={course.title}
                 price={course.price}
                 courseId={course._id}
                 instructor={course.author.name}
                 hasPurchased={course.hasPurchased}
              />
          </div>
      ))}</div>
      </div>: <div className=' h-96 flex justify-center items-center'>لا توجد دورات تعليمية </div>}</>}
    
      
  </div>
);
};

export default MyCourses;