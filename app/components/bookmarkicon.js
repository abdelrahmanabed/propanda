'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Player } from '@lordicon/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
const Bookmarkicon = (props) => {
    const playerRef = useRef(null);
    const [ state, setState] = useState("in-reveal")
    const [ added, setAdded] = useState("./wired-outline-400-bookmark")
  
    
    useEffect(() => {
      if (!localStorage.getItem('favcourses')) {
          localStorage.setItem('favcourses', JSON.stringify([]));
      }
      handlePFB();

      const favCourses = JSON.parse(localStorage.getItem('favcourses'));
      if (favCourses.includes(props.courseId)) {
          setState('morph-checked');
          handlePFB();
      }
  }, []);
    
    const handlePFB = () => {
        playerRef.current?.playFromBeginning();
      };
      const handleGTLF = () => {
        playerRef.current?.goToLastFrame()


    };
 
      const ICON = require(`${added}`); // Replace with your actual icon data
      
      const handleBookmarkClick = async () => {
        try {
          const token = Cookies.get('token');
          if (token) {
            const encryptedUserId = Cookies.get('encryptedUserId');
            if (encryptedUserId) {
              const bytes = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.JWT_SECRET}`);
              const userId = bytes.toString(CryptoJS.enc.Utf8);
    
              const response = await axios.get(`${process.env.PORT}/api/users/${userId}/favoriteCourses`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              const favoriteCourses = response.data.favoriteCourses;
              if (Array.isArray(favoriteCourses) && favoriteCourses.includes(props.courseId)) {
                await axios.delete(`${process.env.PORT}/api/users/${userId}/favoriteCourses/${props.courseId}`, {
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
                setState('in-reveal');
                handlePFB();
              } else {
                await axios.put(`${process.env.PORT}/api/users/${userId}/favoriteCourses`, { courseId: props.courseId }, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                const favCourses = JSON.parse(localStorage.getItem('favcourses'));

                const updatedFavCourses = [...favCourses, props.courseId];
              localStorage.setItem('favcourses', JSON.stringify(updatedFavCourses));
                console.log('Course added to favoriteCourses array');
                setState('morph-checked');
                handlePFB();
              }
            }
          } else {
            // No token, manage courses in localStorage
            const favCourses = JSON.parse(localStorage.getItem('favcourses'));
            if (favCourses.includes(props.courseId)) {
              const newFavCourses = favCourses.filter(course => course !== props.courseId);
              localStorage.setItem('favcourses', JSON.stringify(newFavCourses));
              setState('in-reveal');
              handlePFB();
            } else {
              const updatedFavCourses = [...favCourses, props.courseId];
              localStorage.setItem('favcourses', JSON.stringify(updatedFavCourses));
              setState('morph-checked');
              handlePFB();
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
         
         ${state === 'in-reveal' ? '' : 'clicked'}
         duration-300 flex justify-center  items-center  top-7 left-7 ${ props.className}  `}
        

        >

          <Player   state={state}  onComplete={ handleGTLF} 
            size={state === 'morph-checked' ? 40 : 25}
          ref={playerRef} icon={ICON}  colorize={"#000"} currentState={props.currentState}/>
        </div>
      );
    };
export default Bookmarkicon