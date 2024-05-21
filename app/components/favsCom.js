'use client'
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import 'react-phone-input-2/lib/style.css'
import Course from './course';
import Keenslider from './Keenslider';
const FavsCom = () => {
    const [courses, setCourses] = useState([]);
    const [favCourses, setFavCourses] = useState([]);


    useEffect(() => {
      // Fetch favorite courses from internal storage or API
      const fetchFavCourses = async () => {
          try {
              // Assuming you have stored fav courses IDs in localStorage or fetched from an API
              const favCourseIds = JSON.parse(localStorage.getItem('favcourses')) || [];
              setFavCourses(favCourseIds);
              console.log({"setFavCourses": favCourses})
          } catch (error) {
              console.error('Error fetching favorite courses:', error);
          }
      };
      fetchFavCourses();
  }, []);

  useEffect(() => {
    // Fetch courses from the server
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${process.env.PORT}/api/courses`);
            console.log("Favorite Courses:", favCourses);
            console.log("Courses from Server:", response.data);
            
            const filteredCourses = response.data.filter(course => favCourses.includes(course._id));
            console.log("Filtered Courses:", filteredCourses);

            setCourses(filteredCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    fetchCourses();
}, [favCourses]);
  

    return (
      <div id='favscomp' className='infocomp w-full backdrop-blur-xl p-3 flex flex-col gap-3 rounded-2xl overflow-hidden min-h-96'> 

      <h1 className='text-2xl'>
        المفضلة 
      </h1>
      {courses.length > 0 &&       <Keenslider>

      {courses.map((course) => (
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
      </Keenslider>}
      
  </div>
);
};

export default FavsCom;