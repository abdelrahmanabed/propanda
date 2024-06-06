'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { BsBookmark, BsBookmarkCheck } from "react-icons/bs";
import axios from 'axios';
import Loading from "./loading";
import { useUser } from './UserContext';

const Bookmarkicon = ({ courseId, className }) => {
  const { userId } = useUser();
  const [state, setState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const favCourses = JSON.parse(localStorage.getItem('favcourses') || '[]');
    if (favCourses.includes(courseId)) {
      setState(true);
    }
  }, [courseId]);

  const handleBookmarkClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const favCourses = JSON.parse(localStorage.getItem('favcourses') || '[]');
      if (userId) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses`);
        const favoriteCourses = response.data.favoriteCourses;

        if (favoriteCourses.includes(courseId)) {
          await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses/${courseId}`);
          const newFavCourses = favCourses.filter(course => course !== courseId);
          localStorage.setItem('favcourses', JSON.stringify(newFavCourses));
          setState(false);
        } else {
          await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userId}/favoriteCourses`, { courseId });
          favCourses.push(courseId);
          localStorage.setItem('favcourses', JSON.stringify(favCourses));
          setState(true);
        }
      } else {
        if (favCourses.includes(courseId)) {
          const newFavCourses = favCourses.filter(course => course !== courseId);
          localStorage.setItem('favcourses', JSON.stringify(newFavCourses));
          setState(false);
        } else {
          favCourses.push(courseId);
          localStorage.setItem('favcourses', JSON.stringify(favCourses));
          setState(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, courseId]);

  return (
    <div id='lordidiv' onClick={handleBookmarkClick} className={`backdrop-blur-md ${state ? 'clicked' : ''} duration-300 flex justify-center items-center top-7 left-7 ${className}`}>
      {isLoading ? <Loading /> : (
        <>
          <BsBookmark className={`${state ? 'absolute opacity-0 text-4xl' : 'static opacity-100 text-2xl'} duration-300`} />
          <BsBookmarkCheck className={`${!state ? 'absolute opacity-0' : 'static opacity-100 text-4xl'} duration-300`} />
        </>
      )}
    </div>
  );
};

export default React.memo(Bookmarkicon);
