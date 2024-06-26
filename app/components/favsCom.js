'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css'
import dynamic from 'next/dynamic';
const Course = dynamic(() => import("./course"), { ssr: false });
import Loading from './loading';
import CourseClient from './courseClient';
import { useUser } from './UserContext';
const FavsCom = () => {
    const [courses, setCourses] = useState([]);
    const [favCourses, setFavCourses] = useState([]);
    const [loading, setLoading] = useState(false)
    const {loggedIn} = useUser

    useEffect(() => {
        const fetchFavCoursesAndCourses = async () => {
          setLoading(true);
          try {
            // Fetch favorite courses
            const favCourseIds = JSON.parse(localStorage.getItem('favcourses')) || [];
            setFavCourses(favCourseIds);
    
            // Fetch all courses
            const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
            const filteredCourses = response.data.filter(course => favCourseIds.includes(course._id));
            setCourses(filteredCourses);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFavCoursesAndCourses();
      }, [loggedIn]); 
  

    return (
      <div id='favscomp' className='infocomp w-full backdrop-blur-xl p-3 flex flex-col gap-3 rounded-2xl overflow-hidden min-h-96 '> 
{ loading ?<div className=' h-96 my-12 flex justify-center items-center'><Loading/> </div>: <>  <h1 className='text-2xl'>
        المفضلة 
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
      </div>: <div className=' h-96 flex justify-center items-center'>لا توجد دورات تعليمية في المفضلة</div>}</>}
    
      
  </div>
);
};

export default FavsCom;