'use client'
import React, { useEffect, useState } from 'react';
import { BsBookmark } from "react-icons/bs";
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { BsBookmarkCheck } from "react-icons/bs";

const Bookmarkicon = (props) => {

    const [ state, setState] = useState(false)
  
    
    useEffect(() => {
      if (!localStorage.getItem('favcourses')) {
          localStorage.setItem('favcourses', JSON.stringify([]));
      }

      const favCourses = JSON.parse(localStorage.getItem('favcourses'));
      if (favCourses.includes(props.courseId)) {
          setState(true);
      }
  }, []);
    
 
      
      const handleBookmarkClick = async () => {
        try {
          const token = Cookies.get('token');
          if (token) {
            const encryptedUserId = Cookies.get('encryptedUserId');
            if (encryptedUserId) {
              const bytes = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
              const userId = bytes.toString(CryptoJS.enc.Utf8);
    
              const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              const favoriteCourses = response.data.favoriteCourses;
              if (Array.isArray(favoriteCourses) && favoriteCourses.includes(props.courseId)) {
                await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses/${props.courseId}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const favCourses = JSON.parse(localStorage.getItem('favcourses'));
                if (favCourses.includes(props.courseId)) {
                  const newFavCourses = favCourses.filter(course => course !== props.courseId);
                  localStorage.setItem('favcourses', JSON.stringify(newFavCourses));
                 
                }
                console.log('Course removed from favoriteCourses array');
                setState(false);
              } else {
                await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses`, { courseId: props.courseId }, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                const favCourses = JSON.parse(localStorage.getItem('favcourses'));

                const updatedFavCourses = [...favCourses, props.courseId];
              localStorage.setItem('favcourses', JSON.stringify(updatedFavCourses));
                console.log('Course added to favoriteCourses array');
                setState(true);
              }
            }
          } else {
            // No token, manage courses in localStorage
            const favCourses = JSON.parse(localStorage.getItem('favcourses'));
            if (favCourses.includes(props.courseId)) {
              const newFavCourses = favCourses.filter(course => course !== props.courseId);
              localStorage.setItem('favcourses', JSON.stringify(newFavCourses));
              setState(false);
            } else {
              const updatedFavCourses = [...favCourses, props.courseId];
              localStorage.setItem('favcourses', JSON.stringify(updatedFavCourses));
              setState(true);
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      return (
        <div id='lordidiv' 
        onClick={handleBookmarkClick}
         className={` backdrop-blur-md
         
         ${!state ? '' : 'clicked'}
         duration-300 flex justify-center  items-center  top-7 left-7 ${ props.className}  `}
        

        >
         <BsBookmark currentState={props.currentState} className={`${ state ? " absolute opacity-0 text-4xl" : " static opacity-100 text-2xl "} duration-300`}/>
           
           <BsBookmarkCheck className={`${ !state ? " absolute opacity-0" : " static opacity-100 text-4xl"} duration-300`}/>
           
          
        </div>
      );
    };
export default Bookmarkicon